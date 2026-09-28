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

async function drainStream(stream: ReadableStream<Uint8Array>): Promise<Uint8Array<ArrayBuffer>> {
  const chunks: Uint8Array<ArrayBuffer>[] = [];
  const reader = stream.getReader({ mode: "byob" });
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read(new Uint8Array(8192));
      if (value && value.byteLength) {
        chunks.push(value);
        length += value.byteLength;
      }
      if (done) break;
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

function readArrayBufferAsText(array: ArrayBuffer | Uint8Array<ArrayBuffer>) {
  const decoder = new TextDecoder();

  return decoder.decode(array);
}

export { drainStream, readArrayBufferAsText };

export const globals = getGlobals();
