const settings = {
  prefix: 'bx',
  selectorTabbable: `
    a[href], area[href], input:not([disabled]):not([tabindex='-1']),
    button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
    textarea:not([disabled]):not([tabindex='-1']),
    iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]
  `,
  selectorFocusable: `
    a[href], area[href], input:not([disabled]),
    button:not([disabled]),select:not([disabled]),
    textarea:not([disabled]),
    iframe, object, embed, *[tabindex], *[contenteditable=true]
  `,
};
module.exports = settings;
