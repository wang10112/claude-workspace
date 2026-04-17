#!/usr/bin/env node
/**
 * 质量门禁 Hook
 *
 * 在文件写入/编辑后检查代码质量
 * - 检查文件大小
 * - 检查是否包含 TODO/FIXME
 * - 检查是否包含 console.log
 * - 检查是否包含硬编码密钥
 */

const HookBase = require('./hook-base');
const fs = require('fs');
const path = require('path');

class QualityGate extends HookBase {
  async execute(input) {
    const { tool_name, tool_input, tool_response } = input;

    // 只处理 Write/Edit 操作
    if (!['Write', 'Edit'].includes(tool_name)) {
      return this.success('Not a write operation, skipping quality gate');
    }

    // 获取文件路径
    const filePath = tool_input?.file_path || tool_response?.filePath;
    if (!filePath) {
      return this.success('No file path found, skipping quality gate');
    }

    this.log('Checking file:', filePath);

    // 读取文件内容
    let content;
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      return this.warn(`Could not read file: ${error.message}`);
    }

    // 执行检查
    const issues = [];

    // 1. 检查文件大小
    if (content.length > 10000) {
      issues.push(`File is large (${content.length} chars). Consider splitting.`);
    }

    // 2. 检查 TODO/FIXME
    const todoMatches = content.match(/TODO|FIXME/gi);
    if (todoMatches && todoMatches.length > 3) {
      issues.push(`Found ${todoMatches.length} TODO/FIXME comments. Consider addressing them.`);
    }

    // 3. 检查 console.log（仅 JS/TS 文件）
    if (/\.(js|ts|jsx|tsx)$/.test(filePath)) {
      const consoleMatches = content.match(/console\.(log|debug|info)/g);
      if (consoleMatches && consoleMatches.length > 0) {
        issues.push(`Found ${consoleMatches.length} console.log statements. Remove before commit.`);
      }
    }

    // 4. 检查硬编码密钥
    const secretPatterns = [
      /api[_-]?key\s*=\s*['"][^'"]+['"]/i,
      /password\s*=\s*['"][^'"]+['"]/i,
      /secret\s*=\s*['"][^'"]+['"]/i,
      /token\s*=\s*['"][^'"]+['"]/i,
      /sk-[a-zA-Z0-9]{32,}/,  // OpenAI/Anthropic keys
    ];

    for (const pattern of secretPatterns) {
      if (pattern.test(content)) {
        return this.fail(
          '🚨 SECURITY: Possible hardcoded secret detected!',
          'Please use environment variables for secrets.'
        );
      }
    }

    // 5. 检查大文件（> 1MB）
    const stats = fs.statSync(filePath);
    if (stats.size > 1024 * 1024) {
      return this.fail(
        `File is too large (${(stats.size / 1024 / 1024).toFixed(2)} MB)`,
        'Files over 1MB should not be committed. Use Git LFS for large files.'
      );
    }

    // 返回结果
    if (issues.length > 0) {
      return this.warn(
        `Quality gate: ${issues.length} issue(s) found`,
        issues.join('\n')
      );
    }

    return this.success('✅ Quality gate passed');
  }
}

// 运行
if (require.main === module) {
  new QualityGate().run();
}

module.exports = QualityGate;
