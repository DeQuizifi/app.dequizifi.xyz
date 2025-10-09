
// src/lib/error-tracking.ts

/**
 * Represents a categorized error with additional context.
 */
export interface CategorizedError extends Error {
  category: ErrorCategory;
  context?: Record<string, any>;
}

/**
 * Defines categories for different types of errors.
 */
export enum ErrorCategory {
  Network = "Network Error",
  Validation = "Validation Error",
  Authentication = "Authentication Error",
  Authorization = "Authorization Error",
  Database = "Database Error",
  NotFound = "Not Found Error",
  ServerError = "Server Error",
  ClientError = "Client Error",
  Unknown = "Unknown Error",
}

/**
 * Formats an error into a human-readable string.
 * @param error The error object to format.
 * @returns A formatted string representation of the error.
 */
export function formatError(error: Error | CategorizedError): string {
  if (error instanceof Error) {
    let message = `Error: ${error.message}`;
    if ((error as CategorizedError).category) {
      message = `Category: ${(error as CategorizedError).category}, ${message}`;
    }
    if (error.stack) {
      message += `
Stack: ${error.stack}`;
    }
    if ((error as CategorizedError).context) {
      message += `
Context: ${JSON.stringify((error as CategorizedError).context, null, 2)}`;
    }
    return message;
  }
  return "Unknown error occurred.";
}

/**
 * Categorizes an error based on its type or properties.
 * This is a basic implementation and can be extended with more sophisticated logic
 * to parse error messages, status codes, or specific error classes.
 * @param error The error object to categorize.
 * @returns The determined ErrorCategory.
 */
export function categorizeError(error: Error): ErrorCategory {
  if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
    return ErrorCategory.Network;
  }
  // Example: You might parse error messages or check for specific error codes
  if (error.message.includes("validation failed")) {
    return ErrorCategory.Validation;
  }
  if (error.message.includes("authentication")) {
    return ErrorCategory.Authentication;
  }
  if (error.message.includes("not found")) {
    return ErrorCategory.NotFound;
  }
  if (error.message.includes("database")) {
    return ErrorCategory.Database;
  }
  if (error.message.includes("server error") || (error as any).statusCode >= 500) {
    return ErrorCategory.ServerError;
  }
  if (error.message.includes("client error") || (error as any).statusCode >= 400) {
    return ErrorCategory.ClientError;
  }

  return ErrorCategory.Unknown;
}

/**
 * Reports an error, logging it to the console and potentially sending it to an external service.
 * @param error The error object to report.
 * @param context Optional additional context to include with the error report.
 */
export function reportError(error: Error, context?: Record<string, any>): void {
  const category = categorizeError(error);
  const categorizedError: CategorizedError = { ...error, category, context };

  const formattedErrorMessage = formatError(categorizedError);

  console.error("Error Reported:", formattedErrorMessage);

  // TODO: Integrate with an external error tracking service (e.g., Sentry, Bugsnag, Datadog)
  // Example:
  // if (process.env.NODE_ENV === 'production') {
  //   Sentry.captureException(categorizedError, { extra: context });
  // }
}

/**
 * A higher-order function to wrap asynchronous functions for automatic error reporting.
 * @param fn The asynchronous function to wrap.
 * @returns A new asynchronous function that reports errors if they occur.
 */
export function withErrorTracking<T extends (...args: any[]) => Promise<any>>(
  fn: T
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | undefined> {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | undefined> => {
    try {
      return await fn(...args);
    } catch (error: any) {
      reportError(error, { functionName: fn.name, args });
      // Depending on the use case, you might want to re-throw the error
      // or return a default/undefined value.
      // For now, we'll return undefined to indicate failure without crashing.
      return undefined;
    }
  };
}
