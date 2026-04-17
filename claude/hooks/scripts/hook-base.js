#!/usr/bin/env node
/**
 * Hook 脚本基类
 *
 * 提供标准的输入/输出处理和错误处理
 */

class HookBase {
  constructor() {
    this.input = null;
    this.debug = process.env.DEBUG?.includes('hook');
  }

  /**
   * 从 stdin 读取输入
   */
  async readInput() {
    return new Promise((resolve, reject) => {
      let data = '';

      process.stdin.on('data', chunk => {
        data += chunk;
      });

      process.stdin.on('end', () => {
        try {
          this.input = JSON.parse(data);
          resolve(this.input);
        } catch (error) {
          reject(new Error(`Failed to parse input JSON: ${error.message}`));
        }
      });

      process.stdin.on('error', reject);
    });
  }

  /**
   * 输出结果到 stdout
   */
  writeOutput(result) {
    console.log(JSON.stringify(result, null, 2));
  }

  /**
   * 输出调试信息到 stderr
   */
  log(...args) {
    if (this.debug) {
      console.error('[DEBUG]', ...args);
    }
  }

  /**
   * 输出错误信息到 stderr
   */
  error(...args) {
    console.error('[ERROR]', ...args);
  }

  /**
   * 创建成功响应
   */
  success(message, additionalContext = null) {
    const result = {
      continue: true,
      systemMessage: message
    };

    if (additionalContext) {
      result.hookSpecificOutput = {
        hookEventName: this.input?.event || 'Unknown',
        additionalContext
      };
    }

    return result;
  }

  /**
   * 创建失败响应（阻止操作）
   */
  fail(reason, message = null) {
    return {
      continue: false,
      stopReason: reason,
      systemMessage: message || reason
    };
  }

  /**
   * 创建警告响应（继续但显示警告）
   */
  warn(message, additionalContext = null) {
    return this.success(`⚠️  ${message}`, additionalContext);
  }

  /**
   * 执行 Hook 逻辑（子类实现）
   */
  async execute(input) {
    throw new Error('execute() must be implemented by subclass');
  }

  /**
   * 运行 Hook
   */
  async run() {
    try {
      // 读取输入
      await this.readInput();
      this.log('Input:', this.input);

      // 执行逻辑
      const result = await this.execute(this.input);
      this.log('Result:', result);

      // 输出结果
      this.writeOutput(result);

      // 退出码
      process.exit(result.continue ? 0 : 1);

    } catch (error) {
      this.error('Hook execution failed:', error);

      // 输出错误响应
      this.writeOutput({
        continue: true,  // 默认不阻止（优雅失败）
        systemMessage: `Hook error: ${error.message}`
      });

      process.exit(0);
    }
  }
}

module.exports = HookBase;
