import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Complete Research Step',
  message = 'An error occurred while communicating with the research agents. Please check your connection or retry.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-8 md:p-12 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-center flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto my-6',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-rose-900 dark:text-rose-200">
          {title}
        </h3>
        <p className="text-xs text-rose-700/80 dark:text-rose-400/90 leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Operation
        </button>
      )}
    </div>
  );
};
