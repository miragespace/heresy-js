import Body, { BodyInit } from "./Body";
import Headers, { HeadersInit } from "./Headers";

export type Method = "HEAD" | "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";

export interface RequestInit {
  method?: Method;
  headers?: HeadersInit;
  body?: BodyInit | null;
}

export default class Request extends Body {
  readonly url: string;
  readonly headers: Headers;
  readonly method: Method;

  constructor(input: Request | string, options: Request | RequestInit) {
    if (input instanceof Request) {
      if (input.bodyInit && input.bodyUsed) {
        throw new TypeError("Already read");
      }
      super(input.body);

      this.url = input.url;
      this.method = input.method;
      this.headers = new Headers(options.headers ?? input.headers);

      if (input.bodyInit) {
        input._consumed = true;
      }
    } else {
      if (options instanceof Request) {
        if (options.bodyInit && options.bodyUsed) {
          throw new TypeError("Already read");
        }
        super(options.body);

        if (options.bodyInit) {
          options._consumed = true;
        }
      } else {
        super(options.body ?? null);
      }
      this.url = input;
      this.method = options.method || "GET";
      this.headers = this.headers ?? new Headers(options.headers);
    }

    if (this.bodyInit && ["GET", "HEAD"].includes(this.method)) {
      throw new TypeError("Body not allowed for GET or HEAD requests");
    }

    if (this.bodyInit) {
      if (!this.headers.has("content-type") && this._mimeType) {
        this.headers.set("content-type", this._mimeType);
      }
    }
  }

  clone() {
    return new Request(this, { body: this.bodyInit });
  }
}
