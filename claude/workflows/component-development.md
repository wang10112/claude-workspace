# 组件开发工作流

完整的前端组件开发流程，从设计到发布。

## 工作流程

### 阶段 1：设计组件

#### 1.1 定义需求
```markdown
## 组件需求：Button

### 功能
- 支持多种样式（primary, secondary, danger）
- 支持多种尺寸（sm, md, lg）
- 支持禁用状态
- 支持加载状态
- 支持图标

### 可访问性
- 键盘可访问
- 屏幕阅读器友好
- ARIA 属性完整

### 性能
- 避免不必要的重渲染
- 优化事件处理
```

#### 1.2 设计 API
```typescript
// Button.types.ts
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
```

#### 1.3 创建原型
```typescript
// Button.tsx (初版)
export function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick 
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### 阶段 2：实现组件

#### 2.1 完整实现
```typescript
// Button.tsx
import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      icon,
      onClick,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled && !loading && onClick) {
        onClick();
      }
    };

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          {
            [styles.disabled]: disabled,
            [styles.loading]: loading
          }
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-busy={loading}
        {...rest}
      >
        {loading && <Spinner className={styles.spinner} />}
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
```

#### 2.2 添加样式
```css
/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Variants */
.primary {
  background: #3b82f6;
  color: white;
}

.primary:hover:not(.disabled) {
  background: #2563eb;
}

.secondary {
  background: #e5e7eb;
  color: #374151;
}

.danger {
  background: #ef4444;
  color: white;
}

/* Sizes */
.sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* States */
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading {
  cursor: wait;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

#### 2.3 添加 Storybook
```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary'
  }
};

export const WithIcon: Story = {
  args: {
    children: 'Button',
    icon: <IconPlus />
  }
};

export const Loading: Story = {
  args: {
    children: 'Button',
    loading: true
  }
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true
  }
};
```

### 阶段 3：测试组件

#### 3.1 单元测试
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('applies correct variant class', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('primary');
    
    rerender(<Button variant="danger">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('danger');
  });
});
```

#### 3.2 可访问性测试
```typescript
// Button.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('is keyboard accessible', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
    
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });
});
```

#### 3.3 视觉回归测试
```typescript
// Button.visual.test.tsx
import { test, expect } from '@playwright/test';

test.describe('Button Visual Tests', () => {
  test('primary button', async ({ page }) => {
    await page.goto('/button?variant=primary');
    await expect(page).toHaveScreenshot('button-primary.png');
  });

  test('hover state', async ({ page }) => {
    await page.goto('/button?variant=primary');
    await page.hover('button');
    await expect(page).toHaveScreenshot('button-hover.png');
  });

  test('focus state', async ({ page }) => {
    await page.goto('/button?variant=primary');
    await page.focus('button');
    await expect(page).toHaveScreenshot('button-focus.png');
  });
});
```

### 阶段 4：审查组件

使用 `component-reviewer` agent 审查：
- 组件结构
- Props 设计
- 性能优化
- 可访问性
- 样式实现

### 阶段 5：文档化

#### 5.1 README
```markdown
# Button

通用按钮组件。

## 使用

\`\`\`tsx
import { Button } from '@/components/Button';

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click me
    </Button>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | 按钮内容 |
| variant | 'primary' \| 'secondary' \| 'danger' | 'primary' | 按钮样式 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 按钮尺寸 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否加载中 |
| icon | ReactNode | - | 图标 |
| onClick | () => void | - | 点击回调 |

## 示例

### 基础用法
\`\`\`tsx
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
\`\`\`

### 尺寸
\`\`\`tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
\`\`\`

### 状态
\`\`\`tsx
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
\`\`\`

### 带图标
\`\`\`tsx
<Button icon={<IconPlus />}>Add</Button>
\`\`\`

## 可访问性

- 支持键盘导航
- 包含 ARIA 属性
- 加载状态使用 aria-busy
- 焦点可见
```

#### 5.2 JSDoc
```typescript
/**
 * 通用按钮组件
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  /**
   * @param props - 按钮属性
   * @param props.children - 按钮内容
   * @param props.variant - 按钮样式变体
   * @param props.size - 按钮尺寸
   * @param props.disabled - 是否禁用
   * @param props.loading - 是否显示加载状态
   * @param props.icon - 可选图标
   * @param props.onClick - 点击事件处理函数
   */
  (props, ref) => {
    // ...
  }
);
```

### 阶段 6：发布

#### 6.1 版本管理
```bash
# 更新版本
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

#### 6.2 发布到 npm
```bash
# 构建
npm run build

# 发布
npm publish
```

#### 6.3 更新日志
```markdown
# Changelog

## [1.1.0] - 2026-04-17

### Added
- 添加 loading 状态
- 添加 icon 支持

### Changed
- 改进可访问性

### Fixed
- 修复禁用状态下的点击问题
```

## 最佳实践

### 1. 组件设计
- 单一职责
- 可组合
- 可配置
- 可扩展

### 2. 性能
- 使用 React.memo
- 使用 useCallback
- 避免内联函数
- 优化重渲染

### 3. 可访问性
- 语义化 HTML
- ARIA 属性
- 键盘导航
- 焦点管理

### 4. 测试
- 单元测试
- 集成测试
- 可访问性测试
- 视觉回归测试

### 5. 文档
- README
- JSDoc
- Storybook
- 示例代码

## 参考资料

- [React Component Patterns](https://react.dev/learn)
- [Storybook](https://storybook.js.org/)
- [Testing Library](https://testing-library.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
