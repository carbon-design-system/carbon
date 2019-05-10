### HTML

There are now three major variations of this component. Default tooltip is now
interactive tooltip and is an on click icon instead of the prior on hover.
`.bx--tooltip--definition` does not contain an icon and should only be used to
define the underlined word. `.bx--tooltip--icon` replaces
`.bx--tooltip--simple`. You should only use this variation for an icon and
limited to a single line describing the icon. Multi-line is not supported.

### SCSS

The tooltips are now by default normal font weight and can be made semi-bold by
adding the modifier class `.bx--tooltip__trigger--bold`.

**New**: `.bx--tooltip__trigger--bold`

`.bx--tooltip--definition`

`.bx--tooltip--icon`

**Old**:

`.bx--tooltip--simple`

### JavaScript

The old tooltip variation of the default tooltip was on hover. This variation
however now has on click functionality.
