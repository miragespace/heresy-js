import Request from "./Request";
import Response from "./Response";

export default class FetchEvent {
  respondWith(response: Response | Promise<Response>): void {} // implemented in Go, here only for prototype
  waitUntil(promise: Promise<any>): void {} // implemented in Go, here only for prototype
  readonly request: Request;

  get [Symbol.toStringTag]() {
    return "FetchEvent";
  }
}
