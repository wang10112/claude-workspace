#!/usr/bin/env node
/**
 * 记忆捕获 Hook
 *
 * 自动捕获重要操作到记忆系统
 * - 代码模式
 * - 架构决策
 * - 问题解决方案
 */

const HookBase = require('./hook-base');
const fs = require('fs');
const path = require('path');

class MemoryCapture extends HookBase {
  constructor() {
    super();
    this.memoryDir = path.join(process.cwd(), 'claude', 'memory', 'auto');
  }

  async execute(input) {
    const { tool_name, tool_input, tool_response } = input;

    // 确保 auto memory 目录存在
    if (!fs.existsSync(this.memoryDir)) {
      fs.mkdirSync(this.memoryDir, { recursive: true });
    }

    // 捕获不同类型的操作
    let captured = false;

    // 1. 捕获重要的代码变更
    if (['Write', 'Edit'].includes(tool_name)) {
      captured = await this.captureCodeChange(input);
    }

    // 2. 捕获 Git 操作
    if (tool_name === 'Bash' && tool_input?.command?.includes('git')) {
      captured = await this.captureGitOperation(input);
    }

    // 3. 捕获问题解决
    if (tool_name === 'Bash' && tool_input?.command?.includes('fix')) {
      captured = await this.captureProblemSolution(input);
    }

    if (captured) {
      return this.success('📝 Memory captured', 'Operation recorded for future reference');
    }

    return this.success('No memory capture needed');
  }

  /**
   * 捕获代码变更
   */
  async captureCodeChange(input) {
    const { tool_input } = input;
    const filePath = tool_input?.file_path;

    if (!filePath) return false;

    // 只捕获重要文件
    const importantPatterns = [
      /config/i,
      /setup/i,
      /init/i,
      /core/i,
      /base/i,
    ];

    const isImportant = importantPatterns.some(p => p.test(filePath));
    if (!isImportant) return false;

    // 记录到 patterns/
    const patternsDir = path.join(this.memoryDir, 'patterns');
    if (!fs.existsSync(patternsDir)) {
      fs.mkdirSync(patternsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const memoryFile = path.join(patternsDir, `${timestamp}-code-pattern.md`);

    const content = `# Code Pattern

**Date:** ${new Date().toISOString()}
**File:** ${filePath}
**Type:** Code Change

## Context

Important file modified: ${path.basename(filePath)}

## Pattern

\`\`\`
${tool_input.content?.substring(0, 500) || 'N/A'}
\`\`\`

## Notes

- Captured automatically by memory-capture hook
- Review and categorize if needed
`;

    fs.writeFileSync(memoryFile, content);
    this.log('Captured code pattern to:', memoryFile);

    return true;
  }

  /**
   * 捕获 Git 操作
   */
  async captureGitOperation(input) {
    const { tool_input } = input;
    const command = tool_input?.command || '';

    // 只捕获重要的 Git 操作
    if (!command.includes('commit') && !command.includes('merge')) {
      return false;
    }

    const decisionsDir = path.join(this.memoryDir, 'decisions');
    if (!fs.existsSync(decisionsDir)) {
      fs.mkdirSync(decisionsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const memoryFile = path.join(decisionsDir, `${timestamp}-git-operation.md`);

    const content = `# Git Operation

**Date:** ${new Date().toISOString()}
**Command:** \`${command}\`

## Context

Git operation captured for tracking.

## Notes

- Captured automatically by memory-capture hook
- Review commit message for architectural decisions
`;

    fs.writeFileSync(memoryFile, content);
    this.log('Captured git operation to:', memoryFile);

    return true;
  }

  /**
   * 捕获问题解决方案
   */
  async captureProblemSolution(input) {
    const { tool_input } = input;
    const command = tool_input?.command || '';

    const learningsDir = path.join(this.memoryDir, 'learnings');
    if (!fs.existsSync(learningsDir)) {
      fs.mkdirSync(learningsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const memoryFile = path.join(learningsDir, `${timestamp}-solution.md`);

    const content = `# Problem Solution

**Date:** ${new Date().toISOString()}
**Command:** \`${command}\`

## Problem

[Describe the problem that was solved]

## Solution

\`\`\`bash
${command}
\`\`\`

## Lessons Learned

- Captured automatically by memory-capture hook
- Add details about what was learned
`;

    fs.writeFileSync(memoryFile, content);
    this.log('Captured solution to:', memoryFile);

    return true;
  }
}

// 运行
if (require.main === module) {
  new MemoryCapture().run();
}

module.exports = MemoryCapture;
