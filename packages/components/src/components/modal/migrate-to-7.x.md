### HTML

HTML for Modals have been given a siginificant overhaul. Previously, there were
3 distinct types of modals. Now, Modals simply adhere to a simple 3-part HTML
structure for better composability:

A Modal can be made of these parts:

- Modal Header
- Modal Content
- Modal Footer

The Modal Footer will contain actions, usually a set of buttons. The most common
patterns for Modals will usually be Modals with a footer and Modals without a
footer.

With that said, it will be best to copy and paste the new HTML for Modal to
capture all of the latest changes.

### SCSS

The `_modal.scss` file is now located at `src/components/modal/_modal.scss`. You
will need to update any `@import` statements for this file to reflect this
change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/modal/modal';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/modal/modal';
```

Some classes have been changed. Some old classes have been repurposed to take on
different meanings or hook in different kinds of styles. Below is a subset of
changes that you can expect, but does not cover all changes. It will be best to
use the newest HTML as a template for new Modals.

| Old Class                    | New Class               | Note    |
| ---------------------------- | ----------------------- | ------- |
| bx--modal-content\_\_label   |                         | Removed |
| bx--modal-content\_\_heading |                         | Removed |
| bx--modal-content\_\_text    |                         | Removed |
|                              | bx--modal-footer        | Added   |
|                              | bx--modal-header        | Added   |
| bx--modal-inner              | bx--modal-container     | Changed |
| bx--modal\_\_close           | bx--modal-close         | Changed |
| bx--modal\_\_close--icon     | bx--modal-close\_\_icon | Changed |

### JavaScript

The `getTransitionDuration` function is no longer used.

The `hookCloseActions` method is now a private method, so it's been renamed to
`_hookCloseActions`.

A new private method has been added called `_getLaunchingDetails`, which is used
inside the `show` public method.

The `static hook` method has been removed since it was deprecated in the
previous major version (6.x).
