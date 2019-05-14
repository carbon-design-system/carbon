# @carbon/sketch

## Developing

When working with this package, you will need to follow a couple of steps to get
started. It's important that you have Sketch installed on your system before
attempting any of these steps.

1. Run `cd packages/sketch` to go into the package folder
2. Run `yarn build` to build out the initial plugin
3. Run `yarn skpm:link` to link the plugin to your Sketch plugin folder

Afterwards, you can continue development by running `yarn develop`.

## References

- [API Reference](https://developer.sketch.com/reference/api) for the `sketch`
  module
- [`Sketch-Headers`](https://github.com/abynim/Sketch-Headers) to determine
  methods on internal objects
- [Plugin bundle guide](https://developer.sketch.com/guides/plugin-bundles/) for
  structuring a plugin and its menus

## Tips & Tricks

- Use `yarn skpm log -f` to tail logs from the Sketch plugin. Useful if you want
  to debug using `console.log`
- When removing layers, start at th end as the indices get reordered each time a
  layer is removed
