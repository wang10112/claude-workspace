# Verification 模块记忆

## 当前定位

- `verification` 已升级为 `project` 中的第五个正式模块
- 它负责把 readiness checks、已执行校验和残余风险说明标准化

## 长期约束

- verification 必须说明做了哪些检查
- verification 不等于 review，二者应分层
- 没有执行的检查不能被描述为已验证

## 维护规则

- shared 侧维护 workflow / skill / playbook / memory
- Claude / Codex 侧只做适配
- verification 输出应能回流到 review、planning 或 execution work
