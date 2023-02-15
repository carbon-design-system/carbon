# `scss/fonts`

The `scss/fonts` folder provides a way to incorporate IBM Plex into your
project. Below is a table of what fonts are currently supported from IBM Plex in
Carbon:

| Font                      | Available | Entrypoint                    |
| ------------------------- | --------- | ----------------------------- |
| IBM Plex Mono             | ✅        | `scss/fonts/mono`             |
| IBM Plex Sans Arabic      | ✅        | `scss/fonts/sans-arabic`      |
| IBM Plex Sans Devanagari  | ✅        | `scss/fonts/sans-devanagari`  |
| IBM Plex Sans Hebrew      | ✅        | `scss/fonts/sans-hebrew`      |
| IBM Plex Sans KR          |           |                               |
| IBM Plex Sans JP          |           |                               |
| IBM Plex Sans Thai Looped | ✅        | `scss/fonts/sans-thai-looped` |
| IBM Plex Sans Thai        | ✅        | `scss/fonts/sans-thai`        |
| IBM Plex Sans             | ✅        | `scss/fonts/sans`             |
| IBM Plex Serif            | ✅        | `scss/fonts/serif`            |

By default, Carbon provides the default font weights for: IBM Plex Mono, IBM
Plex Sans, and IBM Plex Serif. To bring in additional fonts, you can include the
`@carbon/styles/scss/fonts` entrypoint and configure it:

```scss
@use '@carbon/styles/scss/fonts' with (
  $fonts: (
    IBM-Plex-Sans-Arabic: true,
  )
);
```

You can also configure it to disable specific fonts:

```scss
@use '@carbon/styles/scss/fonts' with (
  $fonts: (
    IBM-Plex-Sans: false,
  )
);
```

If you would like to disable all fonts, you can use the `$css--font-face` flag
in:

```scss
@use '@carbon/styles/scss/config' with (
  $css--font-face: false
);
```

## Features

Each font is available as an entrypoint in the `fonts` folder. You can use these
entrypoints to include specific font weights, styles, and more for IBM Plex. For
example, if you only want to include the regular font weight for IBM Plex Sans
then you could do the following:

```scss
@use '@carbon/styles/scss/fonts/sans';

@include sans.regular($styles: normal);
```

Each font entrypoint supports the following weights:

- `thin`
- `extralight`
- `light`
- `regular`
- `tex`
- `medium`
- `semibold`
- `bold`

All fonts support the `normal` font style, some fonts include support for the
`italic` font style, as well.

### Custom font src resolver

By default, `@carbon/styles/scss/fonts` attempts to resolve fonts directly from
the `@ibm/plex` package. You can configure the location of these font files in
two ways:

- Use the `$font-path` option to define a path "prefix"
- Provide a custom resolver to point to where your font files are hosted

The `$font-path` options is available in `scss/config`:

```scss
@use '@carbon/styles/scss/config' with (
  $font-path: 'https://cdn.custom-font-path.com/fonts'
);
```

And allows you to change the beginning part of each `src` URL that is generated.
You can also completely override the default behavior and provide your own URL
resolver through `scss/fonts/src`:

```scss
@use 'sass:meta';
@use './my-custom-resolver' as resolver;
@use '@carbon/styles/scss/fonts/src' with (
  // Here, "resolve" is the name of the function in the "resolver" module
  $resolver: meta.get-function('resolve', 'resolver')
);
```

This can be particularly useful for self-hosted projects that are not using
webpack. This custom resolver should follow the signature:

```scss
/// @param {String} $name
/// @param {String} $weight
/// @param {String} $style
/// @param {String} $unicode-range
/// @param {List} $formats
/// @returns List
@function resolver($name, $weight, $style, $unicode-range, $formats) {
  // Here, you will need to return a list of url() format() that will be used in
  // the src property
}
```

## Contributing

**How do I add support for a font?**

You will need to do the following:

- [ ] Create a file for the font under `scss/fonts/`, for example
      `scss/fonts/_sans-arabic.scss`
- [ ] Define all available weights as mixins in that file
- [ ] Emit `@font-face` blocks in each font weight mixin
- [ ] Add a `default` mixin for the default font weights to include for a font
- [ ] Add an `all` mixin which emits all font weights
- [ ] Export a `$name` variable for the name of the font to be used to detect if
      a font should be auto-included
- [ ] Add the base font name to the `$-filenames` map in `fonts/_src.scss`. This
      will be used in the font src resolver to get the correct path from
      `@ibm/plex`
- [ ] In `fonts/_index.scss`
  - [ ] Update the `$-fonts` map to include the `$name` for the font and specify
        whether it should be included automatically
  - [ ] Update the block at the end of the file to call the default mixin of the
        file if the font is enabled
- [ ] Update `packages/carbon-react/tasks/build-styles.js` to include the font
      file as a re-export
- [ ] Add a story for the font in `Plex.stories.js`
