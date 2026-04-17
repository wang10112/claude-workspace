# Python 测试规范

## 原则

编写清晰、可维护的测试，确保代码质量。

## 测试框架

### pytest（推荐）

**优点：**
- 简洁的语法
- 强大的 fixture 系统
- 丰富的插件生态
- 参数化测试

**安装：**
```bash
pip install pytest pytest-cov pytest-asyncio
```

**配置：**
```ini
# pytest.ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = 
    --cov=src
    --cov-report=html
    --cov-report=term
    --cov-fail-under=80
```

### unittest（标准库）

**适用场景：**
- 不想添加外部依赖
- 团队熟悉 xUnit 风格

## 测试结构

### ✅ 使用 AAA 模式

```python
def test_create_user():
    # Arrange - 准备
    user_data = {
        'name': 'Alice',
        'email': 'alice@example.com'
    }
    service = UserService(mock_db)
    
    # Act - 执行
    result = service.create_user(user_data)
    
    # Assert - 断言
    assert result['name'] == 'Alice'
    assert result['email'] == 'alice@example.com'
    assert 'id' in result
```

### ✅ 清晰的测试命名

```python
# ✅ 好 - 描述行为和预期结果
def test_returns_404_when_user_not_found():
    pass

def test_raises_validation_error_when_email_invalid():
    pass

def test_caches_result_after_first_call():
    pass

# ❌ 不好 - 模糊不清
def test_user():
    pass

def test_works():
    pass

def test_error():
    pass
```

## 单元测试

### ✅ 测试纯函数

```python
# 被测试的函数
def calculate_total(items: list[dict], tax_rate: float) -> float:
    """计算含税总价"""
    subtotal = sum(item['price'] for item in items)
    return subtotal * (1 + tax_rate)

# 测试
def test_calculate_total_with_tax():
    items = [{'price': 10}, {'price': 20}]
    
    total = calculate_total(items, 0.1)
    
    assert total == 33.0

def test_calculate_total_empty_items():
    assert calculate_total([], 0.1) == 0.0

def test_calculate_total_zero_tax():
    items = [{'price': 10}]
    assert calculate_total(items, 0) == 10.0
```

### ✅ 使用 fixture

```python
import pytest

@pytest.fixture
def sample_user():
    """提供测试用户数据"""
    return {
        'id': '1',
        'name': 'Alice',
        'email': 'alice@example.com'
    }

@pytest.fixture
def user_service(mock_db):
    """提供 UserService 实例"""
    return UserService(mock_db)

def test_get_user(user_service, sample_user):
    # 使用 fixture
    result = user_service.get_user(sample_user['id'])
    assert result == sample_user
```

## Mock 和 Patch

### ✅ 使用 unittest.mock

```python
from unittest.mock import Mock, patch, MagicMock

def test_send_email():
    # Mock 对象
    mock_smtp = Mock()
    service = EmailService(mock_smtp)
    
    service.send_email('test@example.com', 'Hello')
    
    # 验证调用
    mock_smtp.send.assert_called_once_with(
        to='test@example.com',
        subject='Hello'
    )

def test_fetch_user():
    # Patch 外部依赖
    with patch('requests.get') as mock_get:
        mock_get.return_value.json.return_value = {'id': '1', 'name': 'Alice'}
        
        result = fetch_user('1')
        
        assert result['name'] == 'Alice'
        mock_get.assert_called_with('https://api.example.com/users/1')
```

### ✅ 使用 pytest-mock

```python
def test_save_user(mocker):
    # 使用 mocker fixture
    mock_db = mocker.Mock()
    service = UserService(mock_db)
    
    user = {'name': 'Alice'}
    service.save_user(user)
    
    mock_db.save.assert_called_once_with(user)
```

## 参数化测试

### ✅ 使用 pytest.mark.parametrize

```python
import pytest

@pytest.mark.parametrize('items,tax_rate,expected', [
    ([{'price': 10}], 0.1, 11.0),
    ([{'price': 10}, {'price': 20}], 0.1, 33.0),
    ([], 0.1, 0.0),
    ([{'price': 10}], 0, 10.0),
])
def test_calculate_total(items, tax_rate, expected):
    result = calculate_total(items, tax_rate)
    assert result == expected
```

### ✅ 参数化 fixture

```python
@pytest.fixture(params=['sqlite', 'postgres', 'mysql'])
def database(request):
    """测试多种数据库"""
    db_type = request.param
    db = create_database(db_type)
    yield db
    db.close()

def test_save_user(database):
    # 会对每种数据库运行
    user = {'name': 'Alice'}
    database.save(user)
    assert database.count() == 1
```

## 异步测试

### ✅ 使用 pytest-asyncio

```python
import pytest

@pytest.mark.asyncio
async def test_async_fetch_user():
    service = AsyncUserService()
    
    user = await service.fetch_user('1')
    
    assert user['name'] == 'Alice'

@pytest.mark.asyncio
async def test_async_with_mock(mocker):
    mock_client = mocker.AsyncMock()
    mock_client.get.return_value = {'id': '1', 'name': 'Alice'}
    
    service = AsyncUserService(mock_client)
    user = await service.fetch_user('1')
    
    assert user['name'] == 'Alice'
```

## 异常测试

### ✅ 使用 pytest.raises

```python
def test_raises_value_error_for_negative_price():
    with pytest.raises(ValueError, match='Price must be positive'):
        calculate_total([{'price': -10}], 0.1)

def test_raises_validation_error():
    with pytest.raises(ValidationError) as exc_info:
        validate_email('invalid-email')
    
    assert 'email' in str(exc_info.value)
```

## 测试覆盖率

### 目标

- **行覆盖率**: ≥ 80%
- **分支覆盖率**: ≥ 80%
- **函数覆盖率**: ≥ 80%

### 检查覆盖率

```bash
# 运行测试并生成覆盖率报告
pytest --cov=src --cov-report=html

# 查看报告
open htmlcov/index.html
```

### ✅ 排除不需要测试的代码

```python
# .coveragerc
[run]
omit =
    */tests/*
    */migrations/*
    */venv/*
    */__init__.py

[report]
exclude_lines =
    pragma: no cover
    def __repr__
    raise AssertionError
    raise NotImplementedError
    if __name__ == .__main__.:
```

## Django 测试

### ✅ 使用 TestCase

```python
from django.test import TestCase
from django.contrib.auth.models import User

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='alice',
            email='alice@example.com',
            password='password123'
        )
    
    def test_user_creation(self):
        self.assertEqual(self.user.username, 'alice')
        self.assertTrue(self.user.check_password('password123'))
    
    def test_user_str(self):
        self.assertEqual(str(self.user), 'alice')
```

### ✅ 测试视图

```python
from django.test import Client, TestCase
from django.urls import reverse

class UserViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='alice',
            password='password123'
        )
    
    def test_login_view(self):
        response = self.client.post(reverse('login'), {
            'username': 'alice',
            'password': 'password123'
        })
        
        self.assertEqual(response.status_code, 302)
        self.assertTrue(response.wsgi_request.user.is_authenticated)
```

## FastAPI 测试

### ✅ 使用 TestClient

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user():
    response = client.post('/api/users', json={
        'name': 'Alice',
        'email': 'alice@example.com'
    })
    
    assert response.status_code == 201
    data = response.json()
    assert data['name'] == 'Alice'
    assert 'id' in data

def test_get_user_not_found():
    response = client.get('/api/users/999')
    
    assert response.status_code == 404
```

## 测试最佳实践

### 1. 独立性

```python
# ✅ 好 - 每个测试独立
@pytest.fixture
def user_service():
    return UserService(MockDatabase())

def test_create_user(user_service):
    pass

def test_get_user(user_service):
    pass

# ❌ 不好 - 测试相互依赖
user_id = None

def test_create_user():
    global user_id
    user_id = create_user()

def test_get_user():
    get_user(user_id)  # 依赖前一个测试
```

### 2. 快速执行

```python
# ✅ 好 - 使用 mock
@pytest.fixture
def mock_db():
    return Mock()

# ❌ 不好 - 真实数据库（慢）
@pytest.fixture
def real_db():
    return Database('postgresql://...')
```

### 3. 可读性

```python
# ✅ 好 - 清晰的断言
assert user.name == 'Alice'
assert user.email == 'alice@example.com'
assert user.is_active is True

# ❌ 不好 - 模糊的断言
assert user
```

## 常见陷阱

### ❌ 测试实现细节

```python
# ❌ 不好 - 测试私有方法
def test_private_method():
    service = UserService()
    result = service._internal_method()
    assert result == 'something'

# ✅ 好 - 测试公共接口
def test_public_method():
    service = UserService()
    result = service.process_user(user_data)
    assert result['status'] == 'success'
```

### ❌ 过度 Mock

```python
# ❌ 不好 - mock 所有东西
@patch('module.function1')
@patch('module.function2')
@patch('module.function3')
def test_something(mock3, mock2, mock1):
    pass

# ✅ 好 - 只 mock 外部依赖
@patch('requests.get')
def test_fetch_data(mock_get):
    pass
```

## 测试组织

### 目录结构

```
project/
├── src/
│   ├── __init__.py
│   ├── models.py
│   ├── services.py
│   └── utils.py
└── tests/
    ├── __init__.py
    ├── conftest.py          # 共享 fixtures
    ├── test_models.py
    ├── test_services.py
    └── test_utils.py
```

### conftest.py

```python
# tests/conftest.py
import pytest

@pytest.fixture
def mock_db():
    """所有测试共享的 mock 数据库"""
    return Mock()

@pytest.fixture
def sample_user():
    """所有测试共享的示例用户"""
    return {
        'id': '1',
        'name': 'Alice',
        'email': 'alice@example.com'
    }
```

## 参考资料

- [pytest 文档](https://docs.pytest.org/)
- [unittest 文档](https://docs.python.org/3/library/unittest.html)
- [Python Testing Best Practices](https://realpython.com/python-testing/)
