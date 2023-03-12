## This repo contains various polyfills for the heresy runtime.
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmiragespace%2Fheresy-js.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmiragespace%2Fheresy-js?ref=badge_shield)


---

[url-search-params](https://github.com/jerrybendy/url-search-params-polyfill)

- Needed to bring `URLSearchParams` into the runtime

[text-encoding](https://github.com/anonyco/FastestSmallestTextEncoderDecoder)

- Needed to bring TextEncoder/TextDecoder (UTF-8) only to support converting between `string` and `ArrayBuffer`

[react-native-fetch](https://github.com/react-native-community/fetch)

- Modified to use TypeScript without Fetch implementation. Only `Headers`, `Request`, and `Response` are used.

[web-streams](https://github.com/MattiasBuelens/web-streams-polyfill/)

- Needed to support the Streams API in the runtime (e.g. `ReadableStream`)


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmiragespace%2Fheresy-js.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmiragespace%2Fheresy-js?ref=badge_large)