# `scss/fonts`

## Usage

By default, you can configure what fonts are loaded in your project with the
`$fonts` variable:

```scss
@use '@carbon/styles' with (
  $fonts: (
    IBM-Plex-Sans: true,
  ),
);
```

By default, the following fonts are enabled:

- IBM Plex Sans
- IBM Plex Mono
- IBM Plex Serif

You can also enable the following fonts from IBM Plex:

- `IBM-Plex-Sans-Arabic`
- `IBM-Plex-Sans-Condensed`
- `IBM-Plex-Sans-Devanagari`
- `IBM-Plex-Sans-Hebrew`
- `IBM-Plex-Sans-JP`
- `IBM-Plex-Sans-KR`
- `IBM-Plex-Sans-Thai-Looped`
- `IBM-Plex-Sans-Thai`
- `IBM-Plex-Sans-Variable`

By default, we provide the Light, Regular, and SemiBold font weights for each
font, where applicable, along with an italic variant if available.

If you would like to customize which font weights and styles are loaded, you can
use a font entrypoint.

**Disabling a font**

You can disable a specific font from loading by setting it to `false`:

```scss
@use '@carbon/styles' with (
  $fonts: (
    IBM-Plex-Sans: true,
  ),
);
```

**Customizing a font**

```scss
@use '@carbon/scss/fonts/sans';
@use '@carbon/scss/fonts/serif';

@include sans.regular(normal);
@include serif.default();
```

**Variable font**

**Unicode ranges**

**Japanese and Korean**

How to deal with large file sizes?

**Font entrypoints**

| Entrypoint                    | styles         | complete | split | hinted | default | all | thin | extra-light | light | regular | text | medium | semibold | bold |
| ----------------------------- | -------------- | -------- | ----- | ------ | ------- | --- | ---- | ----------- | ----- | ------- | ---- | ------ | -------- | ---- |
| `scss/fonts/mono`             | normal, italic |          | ✅    |        | ✅      | ✅  | ✅   | ✅          | ✅    | ✅      | ✅   | ✅     | ✅       | ✅   |
| `scss/fonts/sans-arabic`      | normal         | ✅       |       |        | ✅      | ✅  | ✅   | ✅          | ✅    | ✅      | ✅   | ✅     | ✅       | ✅   |
| `scss/fonts/sans-devanagari`  | normal         | ✅       |       |        | ✅      | ✅  | ✅   | ✅          | ✅    | ✅      | ✅   | ✅     | ✅       | ✅   |
| `scss/fonts/sans-hebrew`      | normal         | ✅       |       |        | ✅      | ✅  | ✅   | ✅          | ✅    | ✅      | ✅   | ✅     | ✅       | ✅   |
| `scss/fonts/sans-jp`          | normal         |          | ✅    | ✅     | ✅      | ✅  | ✅   | ✅          | ✅    | ✅      | ✅   | ✅     | ✅       | ✅   |
| `scss/fonts/sans-kr`          | normal         |          | ✅    | ✅     | ✅      | ✅  | ✅   | ✅          | ✅    | ✅      | ✅   | ✅     | ✅       | ✅   |
| `scss/fonts/sans-thai-looped` | normal         | ✅       |       |        | ✅      | ✅  | ✅   | ✅          | ✅    | ✅      | ✅   | ✅     | ✅       | ✅   |
| `scss/fonts/sans-thai`        | normal         | ✅       |       |        | ✅      | ✅  | ✅   | ✅          | ✅    | ✅      | ✅   | ✅     | ✅       | ✅   |
| `scss/fonts/sans-variable`    | normal, italic | ✅       |       |        | ✅      | ✅  |      |             |       |         |      |        |          |      |
| `scss/fonts/sans`             | normal, italic |          | ✅    |        | ✅      | ✅  | ✅   | ✅          | ✅    | ✅      | ✅   | ✅     | ✅       | ✅   |
| `scss/fonts/serif`            | normal, italic |          | ✅    |        | ✅      | ✅  | ✅   | ✅          | ✅    | ✅      | ✅   | ✅     | ✅       | ✅   |

## Notes

- The source of the unicode ranges matter, if ordered incorrectly then all are
  loaded
- Fonts support all weights (except for VF)
- Each font has an entrypoint with mixins you can use
  - weight mixins
  - all weights
  - default (our pick, suggested config)
- How do you configure the font path?
- Some fonts include "hinting"
- How to review
  - Go to a specific font
  - Open up network panel
  - Pick fonts
  - Clear requests
  - Reload page
  - Verify regular font has loaded (with split, if applicable)
  - Go through each font weight, check to see if it loads
  - Inspect the text, make sure it says "network resource" for the font
- Seems like TTF is missing for Sans Variable
- Seems like JP is missing in latest beta
- Are hinted fonts always `complete` instead of split?

Fonts

- [x] IBM Plex Mono
- [x] IBM Plex Sans Arabic
- [x] IBM Plex Sans Devanagari
- [x] IBM Plex Sans Hebrew
- [x] IBM Plex Sans JP
- [x] IBM Plex Sans KR
- [x] IBM Plex Sans Thai Looped
- [x] IBM Plex Sans Thai
- [ ] IBM Plex Sans Variable
- [x] IBM Plex Sans
- [x] IBM Plex Serif
