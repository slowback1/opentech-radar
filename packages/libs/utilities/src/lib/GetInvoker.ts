import { Log } from './Logger';

export function GetInvoker<T>(task: Function, ...args: any[]): () => T | undefined {
  return () => {
    try {
      return task(...args);
    } catch (error) {
      Log(error);
      return undefined;
    }
  };
}
