// logger.ts

const defaultLogger = ["setup", "x-icon", "component"];

type LoggerFn = (...args: any[]) => void;

let loggerFunctions: string[] = [];
let log: Record<string, LoggerFn> = {};

function generateLogger(namespaces: string[]) {
  const newLog: Record<string, LoggerFn> = {};

  namespaces.forEach(ns => {
    newLog[ns] = (...args: any[]) => {
      const prefix = `[${ns.toUpperCase()}]`;
      console.info(prefix, ...args);
    };
  });

  return newLog;
}

export function createLogger(namespaces: string[]) {
  loggerFunctions = [...new Set([...loggerFunctions, ...namespaces])];

  log = generateLogger(loggerFunctions);
  
  return log;
}

createLogger(defaultLogger);

export { log };
