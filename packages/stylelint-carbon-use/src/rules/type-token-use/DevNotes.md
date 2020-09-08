# Type

The tokens are used with the `carbon--type-style` mixin.

- \$caption-01
- \$label-01
- \$helper-text-01
- \$body-short-01
- \$body-long-01
- \$body-short-02
- \$body-long-02
- \$code-01
- \$code-02
- \$heading-01
- \$productive-heading-01
- \$heading-02
- \$productive-heading-02
- \$productive-heading-03
- \$productive-heading-04
- \$productive-heading-05
- \$productive-heading-06
- \$productive-heading-07
- \$expressive-heading-01
- \$expressive-heading-02
- \$expressive-heading-03
- \$expressive-heading-04
- \$expressive-heading-05
- \$expressive-heading-06
- \$expressive-paragraph-01
- \$quotation-01
- \$quotation-02
- \$display-01
- \$display-02
- \$display-03
- \$display-04

These tokens are used with the `carbon--font-weight` mixin and function

- 'light'
- 'regular'
- 'semibold'

The following mixins are used to set the font-face

- @include carbon--type-reset();
- @include carbon--font-face-mono();
- @include carbon--font-face-sans();
- @include carbon--font-face-serif();

Alternatively there are declarative options

- .bx--type-<type-style> to select styles for the given type situation

In addition the floowing settings are available

- .bx--type-mono
- .bx--type-sans
- .bx--type-serif
- .bx--type-light
- .bx--type-regular
- .bx--type-semibold
- .bx--type-italic
