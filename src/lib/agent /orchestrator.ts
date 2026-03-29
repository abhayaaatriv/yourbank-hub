import { agentTools } from './tools';

export interface AgentAction {
  tool: string;
  args: Record<string, any>;
}

export interface AgentLog {
  timestamp: string;
  type: 'thought' | 'action' | 'observation' | 'final';
  content: string;
}

export class BankingAgent {
  private apiKey: string;
  private conversationHistory: Array<{ role: string; content: string }> = [];
  private logs: AgentLog[] = [];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  addLog(type: AgentLog['type'], content: string) {
    this.logs.push({
      timestamp: new Date().toLocaleTimeString(),
      type,
      content,
    });
  }

  getLogs(): AgentLog[] {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  private buildPrompt(task: string): string {
    const pageState = agentTools.getPageState();
    
    return `You are a banking AI assistant. Your job is to help users navigate a banking website by using tools.

Current Page State:
- URL: ${pageState.url}
- Title: ${pageState.title}
- Available buttons/links:
${pageState.elements.map(e => `  [${e.id}] ${e.type}: ${e.text}`).join('\n')}

Available tools you can use:
1. clickElement(index) - Click a button/link by its index
2. typeText(index, text) - Type text into an input field
3. readPage() - Read the page content
4. navigateTo(path) - Go to a different page
5. scrollPage(direction) - Scroll up or down
6. waitForElement(selector) - Wait for an element to appear

User Request: ${task}

Think about what steps you need to take to accomplish the task. Use the tools to interact with the page.
Respond with ONLY valid JSON in this format:
{
  "thought": "your reasoning",
  "action": {
    "tool": "toolName",
    "args": { "arg1": value, "arg2": value }
  }
}

If you're done, respond with:
{
  "thought": "task complete",
  "action": null,
  "final": "Your summary of what was done"
}`;
  }

  async executeTool(toolName: string, args: Record<string, any>): Promise<any> {
    const tool = (agentTools as any)[toolName];
    if (!tool) {
      throw new Error(`Unknown tool: ${toolName}`);
    }
    
    if (typeof tool === 'function') {
      return await tool(...Object.values(args));
    }
    return tool;
  }

  async runTask(userRequest: string, onProgress?: (log: AgentLog) => void): Promise<string> {
    this.clearLogs();
    this.addLog('thought', `Received task: ${userRequest}`);
    onProgress?.(this.logs[this.logs.length - 1]);

    let iterations = 0;
    const maxIterations = 10;

    while (iterations < maxIterations) {
      iterations++;

      const prompt = this.buildPrompt(userRequest);
      this.conversationHistory.push({ role: 'user', content: prompt });

      try {
        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful banking assistant. Respond ONLY with valid JSON.',
              },
              ...this.conversationHistory,
            ],
            temperature: 0.2,
            max_tokens: 500,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.message || 'API Error');
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        this.conversationHistory.push({ role: 'assistant', content: aiResponse });

        let parsed;
        try {
          parsed = JSON.parse(aiResponse);
        } catch {
          this.addLog('final', 'Invalid JSON response from model');
          onProgress?.(this.logs[this.logs.length - 1]);
          break;
        }

        // Check if task is complete
        if (parsed.final) {
          this.addLog('final', parsed.final);
          onProgress?.(this.logs[this.logs.length - 1]);
          return parsed.final;
        }

        // Execute action
        if (parsed.action && parsed.action.tool) {
          this.addLog('thought', parsed.thought);
          onProgress?.(this.logs[this.logs.length - 1]);

          this.addLog('action', `Executing: ${parsed.action.tool}(${JSON.stringify(parsed.action.args)})`);
          onProgress?.(this.logs[this.logs.length - 1]);

          const result = await this.executeTool(parsed.action.tool, parsed.action.args);
          
          this.addLog('observation', JSON.stringify(result));
          onProgress?.(this.logs[this.logs.length - 1]);

          await new Promise(r => setTimeout(r, 500)); // Wait for DOM updates
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        this.addLog('final', `Error: ${errorMsg}`);
        onProgress?.(this.logs[this.logs.length - 1]);
        return `Failed: ${errorMsg}`;
      }
    }

    this.addLog('final', 'Max iterations reached');
    onProgress?.(this.logs[this.logs.length - 1]);
    return 'Task completed with max iterations';
  }
}