# Python 安全规范

## 原则

编写安全的 Python 代码，防止常见漏洞和攻击。

## 输入验证

### ✅ 使用 Pydantic 验证

```python
from pydantic import BaseModel, EmailStr, Field, validator

class User(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    age: int = Field(..., ge=0, le=150)
    
    @validator('name')
    def name_must_not_contain_special_chars(cls, v):
        if not v.replace(' ', '').isalnum():
            raise ValueError('Name must be alphanumeric')
        return v

# 使用
try:
    user = User(
        name='Alice',
        email='alice@example.com',
        age=30
    )
except ValidationError as e:
    print(e.errors())
```

### ✅ 验证文件上传

```python
from werkzeug.utils import secure_filename
import os

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def allowed_file(filename: str) -> bool:
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_upload(file):
    # 验证文件名
    if not file or not allowed_file(file.filename):
        raise ValueError('Invalid file type')
    
    # 清理文件名
    filename = secure_filename(file.filename)
    
    # 验证文件大小
    file.seek(0, os.SEEK_END)
    size = file.tell()
    if size > MAX_FILE_SIZE:
        raise ValueError('File too large')
    file.seek(0)
    
    # 保存到安全目录
    filepath = os.path.join('/uploads', filename)
    file.save(filepath)
    return filepath
```

## SQL 注入防护

### ✅ 使用参数化查询

```python
import sqlite3

# ❌ 危险 - SQL 注入
def get_user_unsafe(user_id: str):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE id = '{user_id}'"
    cursor.execute(query)
    return cursor.fetchone()

# ✅ 安全 - 参数化查询
def get_user_safe(user_id: str):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE id = ?"
    cursor.execute(query, (user_id,))
    return cursor.fetchone()
```

### ✅ 使用 ORM

```python
# ✅ 安全 - SQLAlchemy
from sqlalchemy import select

def get_user(user_id: str):
    stmt = select(User).where(User.id == user_id)
    return session.execute(stmt).scalar_one_or_none()

# ✅ 安全 - Django ORM
def get_user(user_id: str):
    return User.objects.filter(id=user_id).first()
```

## 命令注入防护

### ✅ 避免 shell=True

```python
import subprocess

# ❌ 危险 - 命令注入
def run_command_unsafe(filename: str):
    subprocess.run(f'ls {filename}', shell=True)

# ✅ 安全 - 使用列表参数
def run_command_safe(filename: str):
    subprocess.run(['ls', filename], shell=False)

# ✅ 安全 - 验证输入
def run_command_validated(filename: str):
    # 只允许字母数字和下划线
    if not filename.replace('_', '').isalnum():
        raise ValueError('Invalid filename')
    subprocess.run(['ls', filename], shell=False)
```

## 路径遍历防护

### ✅ 验证文件路径

```python
import os
from pathlib import Path

UPLOAD_DIR = '/var/uploads'

# ❌ 危险 - 路径遍历
def read_file_unsafe(filename: str):
    filepath = os.path.join(UPLOAD_DIR, filename)
    with open(filepath) as f:
        return f.read()

# ✅ 安全 - 验证路径
def read_file_safe(filename: str):
    # 清理文件名
    filename = os.path.basename(filename)
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    # 验证路径在允许的目录内
    real_path = os.path.realpath(filepath)
    if not real_path.startswith(os.path.realpath(UPLOAD_DIR)):
        raise ValueError('Invalid file path')
    
    with open(filepath) as f:
        return f.read()

# ✅ 安全 - 使用 pathlib
def read_file_pathlib(filename: str):
    base_dir = Path(UPLOAD_DIR).resolve()
    file_path = (base_dir / filename).resolve()
    
    # 确保在基础目录内
    if not file_path.is_relative_to(base_dir):
        raise ValueError('Invalid file path')
    
    return file_path.read_text()
```

## 密码安全

### ✅ 使用 bcrypt

```python
import bcrypt

def hash_password(password: str) -> bytes:
    """哈希密码"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt)

def verify_password(password: str, hashed: bytes) -> bool:
    """验证密码"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

# 使用
hashed = hash_password('my_password')
is_valid = verify_password('my_password', hashed)
```

### ❌ 避免弱哈希

```python
import hashlib

# ❌ 危险 - MD5/SHA1 不安全
def hash_password_weak(password: str):
    return hashlib.md5(password.encode()).hexdigest()

# ❌ 危险 - 没有 salt
def hash_password_no_salt(password: str):
    return hashlib.sha256(password.encode()).hexdigest()
```

## 密钥管理

### ✅ 使用环境变量

```python
import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    """类型安全的配置"""
    database_url: str
    secret_key: str
    api_key: str
    
    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'

# 加载配置
settings = Settings()

# 验证必需的密钥
if not settings.secret_key:
    raise ValueError('SECRET_KEY is required')
```

### ❌ 避免硬编码

```python
# ❌ 危险 - 硬编码密钥
SECRET_KEY = 'my-secret-key-12345'
API_KEY = 'sk-1234567890abcdef'

# ✅ 安全 - 环境变量
SECRET_KEY = os.environ['SECRET_KEY']
API_KEY = os.environ['API_KEY']
```

## 序列化安全

### ❌ 避免 pickle

```python
import pickle

# ❌ 危险 - pickle 可以执行任意代码
def load_data_unsafe(data: bytes):
    return pickle.loads(data)

# ✅ 安全 - 使用 JSON
import json

def load_data_safe(data: str):
    return json.loads(data)
```

### ✅ 使用安全的序列化

```python
import json
from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str

# ✅ 安全 - JSON + Pydantic
def serialize_user(user: User) -> str:
    return user.json()

def deserialize_user(data: str) -> User:
    return User.parse_raw(data)
```

## Django 安全

### ✅ CSRF 保护

```python
# settings.py
MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',
]

# 模板中
# {% csrf_token %}

# API 视图中
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # 仅用于 API
def api_view(request):
    pass
```

### ✅ XSS 防护

```python
# Django 模板自动转义
# {{ user_input }}  # 自动转义

# 标记为安全（谨慎使用）
from django.utils.safestring import mark_safe

def render_html(content: str):
    # 清理 HTML
    from bleach import clean
    safe_content = clean(content, tags=['p', 'br', 'strong'])
    return mark_safe(safe_content)
```

### ✅ SQL 注入防护

```python
# ✅ 安全 - ORM
User.objects.filter(email=user_email)

# ✅ 安全 - 参数化查询
from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("SELECT * FROM users WHERE email = %s", [user_email])
    row = cursor.fetchone()

# ❌ 危险 - 字符串拼接
cursor.execute(f"SELECT * FROM users WHERE email = '{user_email}'")
```

## FastAPI 安全

### ✅ 依赖注入验证

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """验证 JWT token"""
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token'
        )

@app.get('/api/users/me')
def get_current_user(payload: dict = Depends(verify_token)):
    return {'user_id': payload['sub']}
```

### ✅ 速率限制

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post('/api/login')
@limiter.limit('5/minute')
def login(request: Request):
    pass
```

## 加密

### ✅ 使用 cryptography

```python
from cryptography.fernet import Fernet

# 生成密钥
key = Fernet.generate_key()
cipher = Fernet(key)

# 加密
def encrypt_data(data: str) -> bytes:
    return cipher.encrypt(data.encode())

# 解密
def decrypt_data(encrypted: bytes) -> str:
    return cipher.decrypt(encrypted).decode()
```

### ✅ 安全的随机数

```python
import secrets

# ✅ 安全 - 用于密码学
token = secrets.token_hex(32)
secure_random = secrets.randbelow(100)

# ❌ 不安全 - 不要用于安全场景
import random
weak_random = random.randint(0, 100)  # 可预测
```

## 依赖安全

### ✅ 定期审计

```bash
# 检查已知漏洞
pip-audit

# 或使用 safety
safety check

# 更新依赖
pip install --upgrade package-name
```

### ✅ 锁定依赖版本

```txt
# requirements.txt
Django==4.2.0
requests==2.31.0
pydantic==2.0.0
```

## 日志安全

### ✅ 不记录敏感信息

```python
import logging

logger = logging.getLogger(__name__)

# ❌ 危险 - 记录密码
logger.info(f'User login: {username}, password: {password}')

# ✅ 安全 - 不记录敏感信息
logger.info(f'User login: {username}')

# ✅ 安全 - 脱敏
def mask_email(email: str) -> str:
    name, domain = email.split('@')
    return f'{name[0]}***@{domain}'

logger.info(f'User registered: {mask_email(email)}')
```

## 错误处理

### ✅ 不泄露敏感信息

```python
from fastapi import HTTPException

# ❌ 危险 - 泄露堆栈信息
@app.get('/api/users/{user_id}')
def get_user(user_id: str):
    try:
        return db.get_user(user_id)
    except Exception as e:
        raise HTTPException(500, detail=str(e))  # 泄露内部信息

# ✅ 安全 - 通用错误消息
@app.get('/api/users/{user_id}')
def get_user(user_id: str):
    try:
        return db.get_user(user_id)
    except UserNotFoundError:
        raise HTTPException(404, detail='User not found')
    except Exception as e:
        logger.error(f'Error getting user: {e}')  # 记录到日志
        raise HTTPException(500, detail='Internal server error')
```

## 安全检查清单

- [ ] 所有用户输入都经过验证（Pydantic）
- [ ] 使用参数化查询或 ORM
- [ ] 避免 shell=True 和命令注入
- [ ] 文件路径已验证
- [ ] 密码使用 bcrypt 哈希
- [ ] 密钥存储在环境变量
- [ ] 不使用 pickle 序列化
- [ ] CSRF 保护已启用（Django）
- [ ] 速率限制已配置
- [ ] 依赖定期审计
- [ ] 日志不包含敏感信息
- [ ] 错误不泄露内部信息

## 参考资料

- [OWASP Python Security](https://cheatsheetseries.owasp.org/cheatsheets/Python_Security_Cheat_Sheet.html)
- [Bandit - Python Security Linter](https://bandit.readthedocs.io/)
- [Django Security](https://docs.djangoproject.com/en/stable/topics/security/)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
