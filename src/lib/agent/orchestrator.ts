import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export interface AgentLog {
  timestamp: string;
  type: 'input' | 'thought' | 'action' | 'observation' | 'final_answer' | 'error';
  content: string;
}

export class BankingAgent {
  private apiKey: string;
  private logs: AgentLog[] = [];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private addLog(type: AgentLog['type'], content: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push({ timestamp, type, content });
  }

  private getBankingContext(): string {
    return `You are a helpful banking assistant for YourBank. You help users with:
- Account information and balance inquiries
- Transaction history
- Loan applications
- Fixed deposits (FD) creation
- Credit card applications
- General banking questions

Always be helpful, professional, and follow banking best practices. 
Provide clear and concise answers about banking services.`;
  }

  async runTask(
    task: string,
    onLog: (log: AgentLog) => void
  ): Promise<string> {
    this.logs = [];
    let result = '';

    try {
      // Log the input task
      this.addLog('input', task);
      onLog(this.logs[this.logs.length - 1]);

      // Add thinking log
      this.addLog('thought', 'Processing your request...');
      onLog(this.logs[this.logs.length - 1]);

      const model = google('gemini-2.0-flash-exp');

      // Call Gemini with banking context
      const response = await generateText({
        model,
        messages: [
          {
            role: 'user',
            content: `${this.getBankingContext()}\n\nUser Query: ${task}`,
          },
        ],
        temperature: 0.7,
      });

      // Log the response
      const answer = response.text;
      this.addLog('final_answer', answer);
      onLog(this.logs[this.logs.length - 1]);

      result = answer;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.addLog('error', `Error: ${errorMessage}`);
      onLog(this.logs[this.logs.length - 1]);
      throw error;
    }

    return result;
  }

  getLogs(): AgentLog[] {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}
