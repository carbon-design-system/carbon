# Components

<!-- prettier-ignore-start -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

* [Documentation](#documentation)
  * [File Structure](#file-structure)
  * [Storybook README](#storybook-readme)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- prettier-ignore-end -->

## Documentation

We're actively looking to improve our Component documentation through generating
`README.md` files in each of our component directories. The hope is that we can
add documentation around installing and using our components, in addition to
covering common use-cases for each component with code examples.

If you would like to help out, there are several options to contribute
component-specific documentation to `carbon-components-react`:

1. Create a `README.md` file using [this file structure](#file-structure), and
   add it to the component's story using [these steps](#storybook-readme)
2. Ensure props of components are covered by
   [Storybook knobs](https://github.com/storybooks/storybook/tree/master/addons/knobs)
3. Ensure event handlers of components are covered by
   [Storybook action logger](https://github.com/storybooks/storybook/tree/master/addons/actions)

Once those steps are complete, you should be able to follow our
[contribution guidelines](/.github/CONTRIBUTING.md) to finish making a Pull
Request for your work!

### File Structure

Each markdown file will tend to take on the following initial structure:

- Component name heading
- Brief description of the component
- A table of contents block
- Steps around installing and using the component
- Details around any special cases with component prop types
- Details around common use-cases for the components, either with embedded code
  or links to [codesandbox.io](http://codesandbox.io) playgrounds

You can use the template available [here](/docs/component-template.md) to help
with filling out each of these steps.

### Storybook README

After creating the `README.md` file for a component, you'll most likely want to
add it to Storybook so that it shows up in the tabs for the component story. To
do this, we'll use the
[`storybook-readme`](https://github.com/tuchk4/storybook-readme) add-on.

The first step will be to import the `withReadme` helper from `storybook-readme`
and the `README.md` file in the component story by doing:

```js
import { withReadme } from 'storybook-readme';
import readme from './README.md';
```

Afterwards, you can decorate each story with the `withReadme` helper by doing:

```js
import { withReadme } from 'storybook-readme';
import readme from './README.md';

storiesOf('ComponentName', module).add(
  'story-title',
  withReadme(readme, () => <ComponentExample />, {
    info: {
      text: 'Information for the given story',
    },
  })
);
```
