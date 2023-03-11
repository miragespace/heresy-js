import Request from "./Request";
import Response from "./Response";

abstract class FetchEvent {
  abstract espondWith(response: Response | Promise<Response>): void;
  abstract waitUntil(promise: Promise<any>): void;
  readonly request: Request;

  get [Symbol.toStringTag]() {
    return "FetchEvent";
  }
}

export default FetchEvent;
