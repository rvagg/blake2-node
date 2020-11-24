# @rvagg/blake2 Node.js BLAKE2 addon

Supports [BLAKE2b and BLAKE2s](https://www.blake2.net/) using the [SSE optimized reference implementation](https://github.com/BLAKE2/BLAKE2/tree/master/sse).

See https://github.com/dcposch/blakejs for a pure JavaScript implementation that works in the browser. This implementation is for Node.js only and requires a compile toolchain on a supported platform.

See https://github.com/vrza/node-blake2 for an alternative addon for BLAKE2 that also supports BLAKE2bp and BLAKE2sp, using the same reference implementation, and also providing the full streaming API to match the core `'crypto'` hash API.

Use this implementation if you have simple needs, guaranteed Node.js usage (no browser), and don't need additional layers of fluff.

## API

* `blake2b(input:<Buffer>, key:<Buffer|null>, outputLength:number)`
* `blake2s(input:<Buffer>, key:<Buffer|null>, outputLength:number)`

```js
const { blake2b, blake2s } = require('@rvagg/blake2')

console.log(blake2b(Buffer.from('abc'), null, 64).toString('hex'))
// -> ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923'

console.log(blake2b(Buffer.from('abc'), null, 64).toString('hex'))
// -> 508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982
```

## License and Copyright

Copyright 2020 Rod Vagg

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

### BLAKE2 reference sources

Optimized BLAKE2 C implementation code is copied without modification from https://github.com/BLAKE2/BLAKE2 (sse).
