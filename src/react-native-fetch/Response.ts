import Body, { BodyInit } from "./Body";
import Headers, { HeadersInit } from "./Headers";

export interface ResponseInit {
  status?: number;
  statusText?: string;
  headers?: HeadersInit;
}

export default class Response extends Body {
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly headers: Headers;
  readonly url: string;

  constructor(body: BodyInit | null, options?: ResponseInit | Response) {
    super(body);
    this.status = options?.status ?? 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options?.statusText ?? "";
    this.headers = new Headers(options?.headers);

    if (options instanceof Response) {
      this.url = options.url;
    } else {
      this.url = "";
    }

    if (!this.headers.has("content-type") && this._mimeType) {
      this.headers.set("content-type", this._mimeType);
    }
  }

  clone() {
    return new Response(this.bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url,
    });
  }

  get [Symbol.toStringTag]() {
    return "Response";
  }

  static redirect(url: string, status: number) {
    const redirectStatuses = [301, 302, 303, 307, 308];

    if (!redirectStatuses.includes(status)) {
      throw new RangeError(`Invalid status code: ${status}`);
    }

    return new Response(null, { status: status, headers: { location: url } });
  }
}
