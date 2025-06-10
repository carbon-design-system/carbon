# documentLang

Framework-agnostic utilities for tracking the `<html>` element's `lang`
attribute, including functions to read the current language and subscribe to
changes.

## `getDocumentLang()`

Retrieves and returns the current document language. Falls back to the browser's
`navigator.language` if the `<html>` `lang` attribute is empty.

### Usage

```js
const lang = getDocumentLang();
```

## `subscribeDocumentLangChange()`

Function that enables subscribing to changes on the `<html>` element's `lang`
attribute. Uses a single/shared MutationObserver to watch for attribute
mutations, and returns a function that can be called to unsubscribe.

### Usage

```js
const unsubscribe = subscribeDocumentLangChange((lang) => {
  console.log('Language changed to', lang);
});

// Later, to stop listening:
unsubscribe();
```
