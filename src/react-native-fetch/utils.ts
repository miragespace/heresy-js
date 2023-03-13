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

async function drainStream(stream: ReadableStream<any>): Promise<Uint8Array> {
  const chunks: any[] = [];
  const reader = stream.getReader({ mode: "byob" });
  const buffer = new ArrayBuffer(8192);
  const view = new Uint8Array(buffer);

  async function readNextChunk(): Promise<any> {
    const { done, value } = await reader.read(view);
    if (done) {
      return chunks.reduce((bytes, chunk) => [...bytes, ...chunk], []);
    }
    chunks.push(value);
    return readNextChunk();
  }

  const bytes = await readNextChunk();

  return new Uint8Array(bytes);
}

function readArrayBufferAsText(array: ArrayBuffer) {
  const decoder = new TextDecoder();

  return decoder.decode(array);
}

export { drainStream, readArrayBufferAsText };

export const globals = getGlobals();
