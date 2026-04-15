import React, { useState, useRef, useEffect } from 'react';
import { BankingAgent, AgentLog } from '@/lib/agent/orchestrator';
import './AIAgent.css';

interface AIAgentProps {
  apiKey?: string;
}

export const AIAgent: React.FC<AIAgentProps> = ({ apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const agentRef = useRef<BankingAgent | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Initialize agent
  useEffect(() => {
    const key = apiKey || import.meta.env.VITE_GOOGLE_API_KEY;
    if (!key) {
      setError('Google API key not configured. Set VITE_GOOGLE_API_KEY in .env');
      return;
    }
    agentRef.current = new BankingAgent(key);
  }, [apiKey]);

  // Auto scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !agentRef.current || isRunning) return;

    setIsRunning(true);
    setError('');
    setLogs([]);

    try {
      await agentRef.current.runTask(input, (log) => {
        setLogs(prev => [...prev, log]);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }

    setIsRunning(false);
  };

  if (!agentRef.current) {
    return (
      <div className="ai-agent-button" style={{ display: 'none' }}>
        <div className="ai-agent-error">{error}</div>
      </div>
    );
  }

  return (
    <>
      {/* Floating Button */}
      <button
        className="ai-agent-button"
        onClick={() => setIsOpen(!isOpen)}
        title="AI Assistant"
      >
        ✨
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="ai-agent-panel">
          <div className="ai-agent-header">
            <h3>AI Banking Assistant</h3>
            <button
              className="ai-agent-close"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="ai-agent-error">
              {error}
            </div>
          )}

          <div className="ai-agent-logs">
            {logs.map((log, idx) => (
              <div key={idx} className={`log-entry log-${log.type}`}>
                <span className="log-time">{log.timestamp}</span>
                <span className="log-type">{log.type}</span>
                <span className="log-content">{log.content}</span>
              </div>
            ))}
            {isRunning && (
              <div className="log-entry log-thinking">
                <span className="spinner">⟳</span>
                <span className="log-content">Agent thinking...</span>
              </div>
            )}
            <div ref={logsEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="ai-agent-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What do you need help with?"
              disabled={isRunning}
              className="ai-agent-input"
            />
            <button
              type="submit"
              disabled={isRunning || !input.trim()}
              className="ai-agent-submit"
            >
              {isRunning ? 'Processing...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};
