import React from 'react';

interface ErrorMessageProps {
  error: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
      {error}
    </div>
  );
};
