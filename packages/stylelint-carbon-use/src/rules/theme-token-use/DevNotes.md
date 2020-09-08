# Dev Notes

## Decl Structure

```js
Declaration {
  raws: { before: ' ', between: ': ' },
  type: 'decl',
  parent:
    Rule {
      raws: { before: '', between: ' ', semicolon: true, after: ' ' },
      type: 'rule',
      nodes: [ [Circular] ],
      parent:
      Root {
        raws: [Object],
        type: 'root',
        nodes: [Array],
        source: [Object],
        lastEach: 3,
        indexes: [Object] },
      source: { start: [Object], input: [Input], end: [Object] },
      selector: '.foo',
      lastEach: 3,
      indexes: { '3': 0 } },
  source:
    { start: { line: 1, column: 8 },
      input:
      Input {
        css: '.foo { box-shadow: 0 0 5px $ui-01, 0 0 10px $ui-02; }',
        hasBOM: false,
        id: '<input css 2>' },
      end: { line: 1, column: 51 } },
  prop: 'box-shadow',
  value: '0 0 5px $ui-01, 0 0 10px $ui-02' }
```

## Value Parse Node Structure

```js
 { type: 'div',
   sourceIndex: 14,
   value: ',',
   before: '',
   after: ' ' }
```
