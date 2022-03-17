# Misc functions

# `event-matches.js`

Event delegation - returns the closest ancestor of the event target (or the
event target itself) which matches the selectors given in parameter.

# `get-launching-details.js`

Given an event, returns an object that contains the `launchingElement` and the
`launchingEvent` (if either exists)

# `mixin.js`

Creates the composed base class for components to build off of

# `on.js`

Abstracts out the `addEventListener` handler to automatically get released when
`handle.release()` is run.

# `resize.js`

Creates a resize handler tied to requestAnimationFrame for a more optimized
result. Has an `add` method to add callbacks to the resize handler.
