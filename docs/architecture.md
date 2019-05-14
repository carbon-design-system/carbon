# Architecture

## Packages shipping Sass

If a package in elements is shipping Sass-based files, then it will follow a
certain number of conventions.

The first convention is that each of these packages will have a `scss` folder
that contains all the Sass files for the package. For example, `@carbon/colors`
would have a folder at `@carbon/colors/scss` in the import path for Sass.

To include the entire package, there are two options within this `scss` folder:
the `index.scss` entrypoint for modules and an entrypoint for inline support.
The `index.scss` entrypoint would be found at `@carbon/colors/scss/index.scss`
and would work for teams that are using tools like eyeglass or have already
setup `node-sass`'s `includePaths` option to include `node_modules`.

The other entrypoint option is for inline support. This option will work without
having to use eyeglass or something like `node-sass`'s `includePaths` option.
Each package that ships a `scss` folder will include this entrypoint, and the
name will reflect the package name. For example, `@carbon/colors` would have an
entrypoint available at `@carbon/colors/scss/colors.scss`.

### Entrypoint behavior

The entrypoints of our Sass packages will output CSS (side-effects) by default,
unless there is no corresponding CSS to output. These side-effects help with
quickly using a package, but sometimes an application developer will want to
control behavior in order to manage side-effects. For these cases, we expose
additional files that you can include in your project, most notably a common
`scss/mixins.scss` file.

For example, in `@carbon/colors` we can import the `carbon--colors` mixin by
importing `@carbon/colors/scss/mixins.scss`. These types of files are guaranteed
to have no, or minimal, side-effects. The only side-effects that are admitted
are global variable initializations as this is required behavior in newer
versions of Sass.

Using these `mixins.scss` entrypoints allows you as an application developer to
control when these side-effects are applied in your project.
