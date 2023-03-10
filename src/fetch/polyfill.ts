// @ts-ignore
import { Headers, Request, Response } from "./types.js";

function getGlobals() {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  return undefined;
}

const globals = getGlobals();

const m = {
  Headers,
  Request,
  Response,
};

// Add classes to global scope
if (typeof globals !== "undefined") {
  for (const prop in m) {
    if (Object.prototype.hasOwnProperty.call(m, prop)) {
      Object.defineProperty(globals, prop, {
        value: m[prop as keyof typeof m],
        writable: true,
        configurable: true,
      });
    }
  }
}
