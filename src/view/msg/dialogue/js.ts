// https://rollbar.com/blog/top-10-javascript-errors/
export const getJavascriptDialogues = (): string[] => [
  '`Uncaught TypeError: Cannot read property`',
  '`TypeError: ‘undefined’ is not an object`',
  '`TypeError: null is not an object`',
  '`(unknown): Script error`',
  '`TypeError: Object doesn’t support property`',
  '`TypeError: ‘undefined’ is not a function`',
  '`Uncaught RangeError`',
  '`TypeError: Cannot read property ‘length’`',
  '`Uncaught TypeError: Cannot set property`',
  '`ReferenceError: event is not defined`',
  '`UnhandledPromiseRejectionWarning: Error: unhandled`', // node v15+
]
