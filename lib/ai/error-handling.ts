// AIError isn't directly exported from 'ai'  
// Use standard Error instead

/**
 * Error handling utilities for AI model fallbacks
 */

/**
 * Handles errors when using the Radium LLM model and provides fallback options
 * 
 * @param error - The error that occurred when using the Radium model
 * @param fallbackModelId - Optional fallback model ID to switch to
 * @returns Information about the error and fallback strategy
 */
export function handleRadiumModelError(
  error: unknown, 
  fallbackModelId = 'chat-model'
): { 
  message: string;
  fallbackToModel: string;
  originalError: unknown;
} {
  console.error('Error using Radium LLM model:', error);
  
  const isConnectionError = error instanceof Error && 
    (error.message.includes('ECONNREFUSED') || 
     error.message.includes('ETIMEDOUT') ||
     error.message.includes('Failed to fetch'));
  
  // Check for authentication errors in the error message
  const isAuthError = error instanceof Error && 
    error.message.includes('authentication');
  
  let message = 'An error occurred with the Radium LLM model.';
  
  if (isConnectionError) {
    message = 'Unable to connect to the Radium LLM server. Falling back to default model.';
  } else if (isAuthError) {
    message = 'Authentication error with Radium LLM server. Falling back to default model.';
  }
  
  return {
    message,
    fallbackToModel: fallbackModelId,
    originalError: error,
  };
}
