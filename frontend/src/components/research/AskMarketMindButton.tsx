import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, ChevronDown, ChevronUp, RefreshCw, Layers } from 'lucide-react';
import { ResearchResponse, ChatMessage, ChatSourceItem } from '../../types/research';
import { chatWithReport } from '../../api/research';

interface AskMarketMindButtonProps {
  report: ResearchResponse;
}

export const AskMarketMindButton: React.FC<AskMarketMindButtonProps> = ({ report }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested starter prompts tailored to the research report
  const starterPrompts = [
    `What are the top 3 competitors and their key weaknesses?`,
    `Summarize the recommended MVP pricing and launch strategy.`,
    `What are the critical customer pain points in ${report.target_market || 'the market'}?`,
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMessageId,
        role: 'user',
        content: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];

    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      if (!report.id) {
        // Fallback if report wasn't assigned an ID in database yet
        setMessages([
          ...newMessages,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content:
              "This report has not been saved in the database yet. Please ensure your database is running and re-run research to enable real-time RAG embeddings.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        return;
      }

      const res = await chatWithReport(report.id, query);

      setMessages([
        ...newMessages,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: res.answer,
          sources: res.sources,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      setMessages([
        ...newMessages,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content:
            err?.response?.data?.detail ||
            "Unable to retrieve an answer right now. Please verify backend connection and try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSource = (msgId: string) => {
    setExpandedSources(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 1. Floating Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-elevated hover:shadow-glow-primary transition-all duration-200 active:scale-95 cursor-pointer group"
        aria-label="Ask MarketMind Assistant"
      >
        <div className="p-1 rounded-lg bg-white/20 text-white">
          {isOpen ? <X className="w-4 h-4" /> : <Sparkles className="w-4 h-4 animate-pulse" />}
        </div>
        <span>Ask MarketMind</span>
        <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/20 text-blue-100 font-bold hidden sm:inline">
          RAG AI
        </span>
      </button>

      {/* 2. Interactive RAG Chat Window */}
      {isOpen && (
        <div className="mt-3 w-[92vw] sm:w-[420px] h-[520px] max-h-[80vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 overflow-hidden">
          
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  Ask MarketMind
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                    pgvector RAG
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[220px]">
                  {report.idea}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Clear conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center px-4 space-y-4">
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                    Chat with this Market Dossier
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[280px]">
                    Ask deep-dive questions grounded in market analysis, competitor gaps, customer ICP, and product strategy.
                  </p>
                </div>

                {/* Quick Prompts */}
                <div className="w-full space-y-2 pt-2 text-left">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Suggested Questions
                  </span>
                  {starterPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      className="w-full text-xs text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-150 flex items-center justify-between group"
                    >
                      <span className="truncate pr-2">{prompt}</span>
                      <Sparkles className="w-3 h-3 text-slate-400 group-hover:text-blue-500 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-1.5 px-1">
                    {msg.role === 'user' ? (
                      <span className="text-[10px] text-slate-400 font-medium">You</span>
                    ) : (
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                        <Bot className="w-3 h-3" /> MarketMind AI
                      </span>
                    )}
                    <span className="text-[9px] text-slate-400">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/60 dark:border-slate-700/50'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Grounded Sources Dropdown */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => toggleSource(msg.id)}
                          className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          <Layers className="w-3 h-3" />
                          <span>{msg.sources.length} Context Chunks Cited</span>
                          {expandedSources[msg.id] ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>

                        {expandedSources[msg.id] && (
                          <div className="mt-2 space-y-1.5">
                            {msg.sources.map((src, i) => (
                              <div
                                key={i}
                                className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] space-y-1"
                              >
                                <div className="flex items-center justify-between font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                  <span>{src.section}</span>
                                  {src.similarity_score !== undefined && (
                                    <span className="text-emerald-600 dark:text-emerald-400">
                                      Match: {Math.round(src.similarity_score * 100)}%
                                    </span>
                                  )}
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 italic line-clamp-3">
                                  "{src.content}"
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="p-1.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 animate-pulse">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] font-medium ml-1">Searching dossier & synthesizing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-50/80 dark:bg-slate-800/60 border-t border-slate-200/80 dark:border-slate-800">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Ask anything about this research report..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};
