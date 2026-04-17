#!/usr/bin/env node
/**
 * 安全扫描 Hook
 *
 * 在代码提交前检查安全问题
 * - SQL 注入风险
 * - XSS 风险
 * - 路径遍历风险
 * - 不安全的依赖
 */

const HookBase = require('./hook-base');
const fs = require('fs');

class SecurityScan extends HookBase {
  async execute(input) {
    const { tool_name, tool_input } = input;

    // 只处理 Bash 命令（git commit）
    if (tool_name === 'Bash') {
      const command = tool_input?.command || '';

      // 检查是否是 git commit
      if (!command.includes('git commit')) {
        return this.success('Not a git commit, skipping security scan');
      }

      this.log('Running security scan before commit...');

      // 获取暂存的文件
      const { execSync } = require('child_process');
      let stagedFiles;

      try {
        stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf-8' })
          .split('\n')
          .filter(f => f.trim());
      } catch (error) {
        return this.warn('Could not get staged files');
      }

      if (stagedFiles.length === 0) {
        return this.success('No staged files to scan');
      }

      this.log('Scanning files:', stagedFiles);

      // 扫描每个文件
      const issues = [];

      for (const file of stagedFiles) {
        if (!fs.existsSync(file)) continue;

        const content = fs.readFileSync(file, 'utf-8');
        const fileIssues = this.scanFile(file, content);
        issues.push(...fileIssues);
      }

      // 返回结果
      if (issues.length > 0) {
        const critical = issues.filter(i => i.severity === 'CRITICAL');

        if (critical.length > 0) {
          return this.fail(
            `🚨 CRITICAL: ${critical.length} security issue(s) found!`,
            critical.map(i => `${i.file}: ${i.message}`).join('\n')
          );
        }

        return this.warn(
          `⚠️  ${issues.length} security warning(s)`,
          issues.map(i => `[${i.severity}] ${i.file}: ${i.message}`).join('\n')
        );
      }

      return this.success('✅ Security scan passed');
    }

    return this.success('Not applicable for this tool');
  }

  /**
   * 扫描单个文件
   */
  scanFile(file, content) {
    const issues = [];

    // 1. SQL 注入风险
    const sqlInjectionPatterns = [
      /query\s*=\s*['"`].*\$\{.*\}.*['"`]/,  // Template literals in SQL
      /query\s*=\s*['"`].*\+.*\+.*['"`]/,    // String concatenation in SQL
      /execute\s*\(\s*['"`].*\$\{.*\}.*['"`]\s*\)/,
    ];

    for (const pattern of sqlInjectionPatterns) {
      if (pattern.test(content)) {
        issues.push({
          file,
          severity: 'CRITICAL',
          message: 'Possible SQL injection: Use parameterized queries'
        });
        break;
      }
    }

    // 2. XSS 风险
    const xssPatterns = [
      /innerHTML\s*=\s*[^'"]/,  // Direct innerHTML assignment
      /dangerouslySetInnerHTML/,
      /document\.write\s*\(/,
    ];

    for (const pattern of xssPatterns) {
      if (pattern.test(content)) {
        issues.push({
          file,
          severity: 'HIGH',
          message: 'Possible XSS: Sanitize user input before rendering'
        });
        break;
      }
    }

    // 3. 路径遍历风险
    const pathTraversalPatterns = [
      /readFileSync\s*\(\s*[^'"]*\+/,  // File read with concatenation
      /writeFileSync\s*\(\s*[^'"]*\+/,
      /\.\.\/\.\.\//,  // Path traversal pattern
    ];

    for (const pattern of pathTraversalPatterns) {
      if (pattern.test(content)) {
        issues.push({
          file,
          severity: 'HIGH',
          message: 'Possible path traversal: Validate and sanitize file paths'
        });
        break;
      }
    }

    // 4. 硬编码密钥（CRITICAL）
    const secretPatterns = [
      { pattern: /api[_-]?key\s*=\s*['"][a-zA-Z0-9]{20,}['"]/, name: 'API key' },
      { pattern: /password\s*=\s*['"][^'"]{8,}['"]/, name: 'Password' },
      { pattern: /secret\s*=\s*['"][^'"]{20,}['"]/, name: 'Secret' },
      { pattern: /sk-[a-zA-Z0-9]{32,}/, name: 'OpenAI/Anthropic key' },
      { pattern: /ghp_[a-zA-Z0-9]{36}/, name: 'GitHub token' },
    ];

    for (const { pattern, name } of secretPatterns) {
      if (pattern.test(content)) {
        issues.push({
          file,
          severity: 'CRITICAL',
          message: `Hardcoded ${name} detected! Use environment variables.`
        });
      }
    }

    // 5. 不安全的随机数生成
    if (/Math\.random\(\)/.test(content) && /crypto|security|token|password/.test(content)) {
      issues.push({
        file,
        severity: 'MEDIUM',
        message: 'Use crypto.randomBytes() for security-sensitive random values'
      });
    }

    // 6. eval() 使用
    if (/\beval\s*\(/.test(content)) {
      issues.push({
        file,
        severity: 'HIGH',
        message: 'Avoid eval(): It can execute arbitrary code'
      });
    }

    return issues;
  }
}

// 运行
if (require.main === module) {
  new SecurityScan().run();
}

module.exports = SecurityScan;
