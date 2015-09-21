# Links

A link is a standard HTML `<a>` (anchor) element.

Links are used in bodies of text to link to other pages or downloads when clicked on.

# Basic use

*This is some text on basic use of this pattern*

# Examples

A link.
```html
<a href="#" class="content-link">bluemix docs</a>
```

A download link.
```html
<a download href="#" class="content-link">download</a>
```

A link that opens in a new tab.
```html
<a href="#" target="_blank" class="content-link">open in new tab</a>
```
- see other uses for target here on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)

# Classes

| Class | Effect | Remarks |
|-----------|--------|---------|
|`content-link`| Defines a link | - |

# Attributes

| Attribute | Effect | Remarks |
|-----------|--------|---------|
|`href`| Defines a URL for a link | For example, `href` URL can take the user to another page |
|`download`| Defines a link as a download | Clicking on a link with a download attribute will download a file located at its `href` value |
|`target`| Defines a target for a link to open | For example, `target=_blank` will open the `href` value in a new browser tab |
