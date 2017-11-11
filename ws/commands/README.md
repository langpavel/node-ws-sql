# Commands

All `*.js` files here are loaded automatically.
action is conditionally executed.

## Required exports

```js
// test start of command, fastest filter
exports.startsWith: String;

// test full regexp, slower filter
exports.test: RegExp | (cmd: String) => Boolean;

// group -- Group name in English, default to "others"
exports.group: String;

// description -- single line
exports.description: String;

// markdown, verbose info
exports.help: String;

// can do action, returning result -- next state
exports.action: (state: Object, next: () => Promise) => Promise<Object>;
```
