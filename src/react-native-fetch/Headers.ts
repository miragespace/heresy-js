function normalizeName(name: string) {
  if (typeof name !== "string") {
    name = String(name);
  }

  name = name.trim();

  if (name.length === 0) {
    throw new TypeError("Header field name is empty");
  }

  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name)) {
    throw new TypeError(`Invalid character in header field name: ${name}`);
  }

  return name.toLowerCase();
}

function normalizeValue(value: string | number) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return value;
}

function iteratorFor<R = any>(items: R[]): IterableIterator<R> {
  var dummyR: R;
  var iterator = {
    next(): IteratorResult<R> {
      var value = items.shift();
      return { done: value === undefined, value: value ?? dummyR };
    },
    [Symbol.iterator]() {
      return iterator;
    },
  };

  return iterator;
}

export type HeadersInit =
  | Headers
  | Record<string, string>
  | [key: string, value: string][];

export default class Headers {
  map: Record<string, string> = {};

  constructor(init?: HeadersInit) {
    if (init instanceof Headers) {
      init.forEach((value: string, name: string) => {
        this.append(name, value);
      });

      return this;
    }

    if (Array.isArray(init)) {
      init.forEach(([name, value]) => {
        this.append(name, value);
      });

      return this;
    }

    if (init) {
      for (const name in init) {
        this.append(name, init[name]);
      }
    }
  }

  append(name: string, value: string): void {
    name = normalizeName(name);
    value = normalizeValue(value);
    const oldValue = this.map[name];
    // From MDN: If the specified header already exists and accepts multiple values, append() will append the new value to the end of the value set.
    // However, we're a missing a check on whether the header does indeed accept multiple values
    this.map[name] = oldValue ? oldValue + ", " + value : value;
  }

  get(name: string): string | null {
    name = normalizeName(name);
    return this.map[name] ?? null;
  }

  has(name: string): boolean {
    return this.map.hasOwnProperty(normalizeName(name));
  }

  set(name: string, value: string | number): void {
    this.map[normalizeName(name)] = normalizeValue(value);
  }

  forEach(
    callback: (value: string, key: string, parent?: object) => void,
    thisArg?: object
  ): void {
    for (const key in this.map) {
      callback.call(thisArg, this.map[key], key, this);
    }
  }

  keys(): IterableIterator<string> {
    return iteratorFor(Object.keys(this.map));
  }

  values(): IterableIterator<string> {
    return iteratorFor(Object.values(this.map));
  }

  entries(): IterableIterator<[string, string]> {
    var items: [string, string][] = [];
    this.forEach((value, name) => {
      items.push([name, value]);
    });
    return iteratorFor(items);
  }

  [Symbol.iterator](): IterableIterator<[string, string]> {
    return this.entries();
  }

  get [Symbol.toStringTag]() {
    return "Headers";
  }
}
