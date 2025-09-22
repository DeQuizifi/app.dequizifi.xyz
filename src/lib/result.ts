export type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export function success<T>(data: T): Result<T> {
  return { success: true, data };
}

export function error<T>(message: string): Result<T> {
  return { success: false, error: message };
}
