# minitype

* Essential, extensible Javascript types.
* Type `Result` for active error handling.
* Source code at [github.com](https://github.com/kevin-leptons/minitype).

# Getting Started

```js
'use strict'

const {Result, UInt32, Timespan, mapObject} = require('minitype')

let uint32 = UInt32.fromNumber(137).open()
let timespan = Timespan.fromMinutes(981).open()
let object = mapObject({number: 1, bool: true}, [
    ['number', v => Result.ok(v.toString())],
    ['bool', v => Result.ok(v ? 'true' : 'false')]
]).open()
```
