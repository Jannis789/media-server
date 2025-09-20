// logger.ts

const defaultLogger = ["setup", "x-icon", "component", "route"];

type LoggerFn = (...args: any[]) => void;

let loggerFunctions: string[] = [];
let log: Record<string, LoggerFn> = {};

function getTimestamp() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = (now.getMonth() + 1).toString().padStart(2, '0');
  const dd = now.getDate().toString().padStart(2, '0');
  const HH = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  const ss = now.getSeconds().toString().padStart(2, '0');
  const SSS = now.getMilliseconds().toString().padStart(3, '0');
  return `${yyyy}.${MM}.${dd} - ${HH}:${mm}:${ss}:${SSS}`;
}

function generateLogger(namespaces: string[]) {
  const newLog: Record<string, LoggerFn> = {};

  namespaces.forEach(ns => {
    newLog[ns] = (...args: any[]) => {
      const prefix = `[${ns.toUpperCase()}]`;
      const timestamp = `[${getTimestamp()}]`;
      console.info(timestamp, prefix, ...args);
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
