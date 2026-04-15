# VS Code 设置说明

## 推荐环境

- Windows + WSL
- VS Code 通过 Remote - WSL 打开仓库
- GitHub 已在 VS Code 中登录
- Claude 与 Codex 的运行逻辑分别由各自目录管理

## 编辑器负责什么

VS Code 主要负责：

- 打开 WSL 工作区
- 管理扩展登录与 UI
- 暴露共享 MCP
- 提供终端访问 `git`、`gh` 等工具

VS Code 不负责：

- 共享 skill 定义
- 长期项目记忆的主存储
- 某一组 AI 的专属架构规则

## 建议使用方式

1. 用 WSL 打开仓库。
2. 让 VS Code 读取 `.vscode/mcp.json`。
3. Claude 相关工作看 `claude/`。
4. Codex 相关工作看 `codex/`。
5. 最终输出统一放到 `output/`。
6. 长期记忆统一维护在 `shared/memory/`。

## GitHub 分层

- VS Code GitHub 扩展：界面和评审体验
- WSL 里的 `gh`：命令行操作
- Claude/Codex：通过各自 MCP 和指令层理解何时需要仓库上下文

## 维护规则

当编辑器使用方式、MCP 使用方式、记忆方式发生变化时，应同步更新：

- `docs/VS-CODE-SETUP.md`
- `docs/MCP-STRATEGY.md`
- `docs/MEMORY-STRATEGY.md`
