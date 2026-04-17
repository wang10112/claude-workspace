# Python 最佳实践

## 原则

遵循 PEP 8 和 Python 之禅，编写 Pythonic 的代码。

## 代码风格

### ✅ 遵循 PEP 8
```python
# 好 - 符合 PEP 8
def calculate_total_price(items: list[dict], tax_rate: float) -> float:
    """Calculate total price including tax."""
    subtotal = sum(item['price'] for item in items)
    return subtotal * (1 + tax_rate)
```

### ❌ 不符合 PEP 8
```python
# 不好
def CalculateTotalPrice(Items,TaxRate):
    SubTotal=sum([Item['price'] for Item in Items])
    return SubTotal*(1+TaxRate)
```

## 类型提示

### ✅ 使用类型提示（Python 3.9+）
```python
from typing import Optional, Union

# 好 - 清晰的类型
def get_user(user_id: str) -> Optional[dict]:
    """Get user by ID."""
    return db.find_user(user_id)

# 好 - 泛型类型
def first[T](items: list[T]) -> T | None:
    """Get first item from list."""
    return items[0] if items else None
```

### ✅ 使用 dataclass
```python
from dataclasses import dataclass

# 好 - 使用 dataclass
@dataclass
class User:
    id: str
    name: str
    email: str
    role: str = 'user'
    
    def is_admin(self) -> bool:
        return self.role == 'admin'
```

## 错误处理

### ✅ 具体的异常
```python
# 好 - 捕获具体异常
try:
    user = get_user(user_id)
except UserNotFoundError:
    return None
except DatabaseError as e:
    logger.error(f"Database error: {e}")
    raise
```

### ❌ 捕获所有异常
```python
# 不好 - 隐藏所有错误
try:
    user = get_user(user_id)
except:
    pass
```

### ✅ 自定义异常
```python
# 好 - 自定义异常类
class UserNotFoundError(Exception):
    """Raised when user is not found."""
    pass

class ValidationError(Exception):
    """Raised when validation fails."""
    def __init__(self, field: str, message: str):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")
```

## 列表推导式

### ✅ 使用列表推导式
```python
# 好 - 简洁清晰
active_users = [u for u in users if u.is_active]

# 好 - 字典推导式
user_map = {u.id: u for u in users}

# 好 - 集合推导式
unique_roles = {u.role for u in users}
```

### ❌ 过度复杂
```python
# 不好 - 太复杂
result = [
    item.value * 2 
    for sublist in data 
    for item in sublist 
    if item.is_valid 
    if item.value > 0
]

# 好 - 拆分为多步
valid_items = (
    item 
    for sublist in data 
    for item in sublist 
    if item.is_valid and item.value > 0
)
result = [item.value * 2 for item in valid_items]
```

## 上下文管理器

### ✅ 使用 with 语句
```python
# 好 - 自动关闭文件
with open('file.txt', 'r') as f:
    content = f.read()

# 好 - 数据库连接
with db.connection() as conn:
    result = conn.execute(query)
```

### ✅ 自定义上下文管理器
```python
from contextlib import contextmanager

@contextmanager
def timer(name: str):
    """Time a code block."""
    start = time.time()
    try:
        yield
    finally:
        elapsed = time.time() - start
        print(f"{name} took {elapsed:.2f}s")

# 使用
with timer("Database query"):
    result = db.query(sql)
```

## 生成器

### ✅ 使用生成器节省内存
```python
# 好 - 生成器（惰性求值）
def read_large_file(file_path: str):
    """Read file line by line."""
    with open(file_path) as f:
        for line in f:
            yield line.strip()

# 使用
for line in read_large_file('large.txt'):
    process(line)
```

### ❌ 一次性加载所有数据
```python
# 不好 - 内存占用大
def read_large_file(file_path: str) -> list[str]:
    with open(file_path) as f:
        return [line.strip() for line in f]
```

## 装饰器

### ✅ 使用装饰器
```python
from functools import wraps
import time

# 好 - 装饰器
def retry(max_attempts: int = 3):
    """Retry decorator."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    time.sleep(2 ** attempt)
        return wrapper
    return decorator

# 使用
@retry(max_attempts=3)
def fetch_data(url: str) -> dict:
    return requests.get(url).json()
```

## 字符串格式化

### ✅ 使用 f-strings
```python
# 好 - f-strings（Python 3.6+）
name = "Alice"
age = 30
message = f"Hello, {name}! You are {age} years old."

# 好 - 多行 f-strings
query = f"""
    SELECT * FROM users
    WHERE name = '{name}'
    AND age > {age}
"""
```

### ❌ 旧式格式化
```python
# 不好 - % 格式化
message = "Hello, %s! You are %d years old." % (name, age)

# 不好 - .format()
message = "Hello, {}! You are {} years old.".format(name, age)
```

## 路径操作

### ✅ 使用 pathlib
```python
from pathlib import Path

# 好 - pathlib
config_path = Path(__file__).parent / 'config.json'
if config_path.exists():
    content = config_path.read_text()

# 好 - 跨平台路径
data_dir = Path.home() / 'data'
data_dir.mkdir(parents=True, exist_ok=True)
```

### ❌ 使用字符串拼接
```python
# 不好 - 字符串拼接
import os
config_path = os.path.dirname(__file__) + '/config.json'
```

## 默认参数

### ❌ 可变默认参数
```python
# 不好 - 可变默认参数陷阱
def add_item(item: str, items: list = []):
    items.append(item)
    return items

# 问题：所有调用共享同一个列表
```

### ✅ 使用 None 作为默认值
```python
# 好 - 使用 None
def add_item(item: str, items: list | None = None) -> list:
    if items is None:
        items = []
    items.append(item)
    return items
```

## 枚举

### ✅ 使用 Enum
```python
from enum import Enum, auto

# 好 - 枚举
class UserRole(Enum):
    ADMIN = 'admin'
    USER = 'user'
    GUEST = 'guest'

# 好 - 自动值
class Status(Enum):
    PENDING = auto()
    APPROVED = auto()
    REJECTED = auto()
```

## 异步代码

### ✅ 使用 async/await
```python
import asyncio
import aiohttp

# 好 - 异步函数
async def fetch_user(session: aiohttp.ClientSession, user_id: str) -> dict:
    """Fetch user asynchronously."""
    async with session.get(f'/api/users/{user_id}') as response:
        return await response.json()

# 好 - 并发请求
async def fetch_all_users(user_ids: list[str]) -> list[dict]:
    """Fetch multiple users concurrently."""
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_user(session, uid) for uid in user_ids]
        return await asyncio.gather(*tasks)
```

## 测试

### ✅ 使用 pytest
```python
import pytest

# 好 - pytest 测试
def test_calculate_total():
    """Test total calculation."""
    items = [{'price': 10}, {'price': 20}]
    total = calculate_total_price(items, tax_rate=0.1)
    assert total == 33.0

# 好 - 参数化测试
@pytest.mark.parametrize('items,tax_rate,expected', [
    ([{'price': 10}], 0.1, 11.0),
    ([{'price': 10}, {'price': 20}], 0.1, 33.0),
])
def test_calculate_total_parametrized(items, tax_rate, expected):
    assert calculate_total_price(items, tax_rate) == expected

# 好 - fixture
@pytest.fixture
def sample_user():
    return User(id='1', name='Alice', email='alice@example.com')

def test_user_is_admin(sample_user):
    assert not sample_user.is_admin()
```

## 日志

### ✅ 使用 logging 模块
```python
import logging

# 好 - 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

# 好 - 使用日志
def process_data(data: dict):
    logger.info(f"Processing data: {data['id']}")
    try:
        result = transform(data)
        logger.debug(f"Transform result: {result}")
        return result
    except Exception as e:
        logger.error(f"Error processing data: {e}", exc_info=True)
        raise
```

## 性能优化

### ✅ 使用内置函数
```python
# 好 - 使用内置函数（更快）
total = sum(items)
maximum = max(items)
minimum = min(items)

# 好 - 使用 any/all
has_admin = any(u.is_admin() for u in users)
all_active = all(u.is_active for u in users)
```

### ✅ 使用集合操作
```python
# 好 - 集合操作（O(1) 查找）
valid_ids = {'1', '2', '3'}
if user_id in valid_ids:
    process(user_id)

# 好 - 集合运算
common = set1 & set2
unique = set1 - set2
all_items = set1 | set2
```

## 常见陷阱

### ❌ 修改迭代中的列表
```python
# 不好 - 修改迭代中的列表
for item in items:
    if should_remove(item):
        items.remove(item)  # 危险！
```

### ✅ 创建新列表
```python
# 好 - 创建新列表
items = [item for item in items if not should_remove(item)]
```

## Python 之禅

```python
import this

# Beautiful is better than ugly.
# Explicit is better than implicit.
# Simple is better than complex.
# Complex is better than complicated.
# Readability counts.
```

## 参考资料

- [PEP 8](https://peps.python.org/pep-0008/)
- [Python Type Hints](https://docs.python.org/3/library/typing.html)
- [Real Python](https://realpython.com/)
- [Effective Python](https://effectivepython.com/)
