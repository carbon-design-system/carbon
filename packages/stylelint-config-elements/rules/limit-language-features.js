/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const OFF = null;

module.exports = {
  rules: {
    // Color
    // Require (where possible) or disallow named colors.
    'color-named': 'never',
    // Disallow hex colors.
    'color-no-hex': OFF,

    // Function
    // Specify a blacklist of disallowed functions.
    'function-blacklist': OFF,
    // Disallow scheme-relative urls.
    'function-url-no-scheme-relative': OFF,
    // Specify a blacklist of disallowed url schemes.
    'function-url-scheme-blacklist': OFF,
    // Specify a whitelist of allowed url schemes.
    'function-url-scheme-whitelist': OFF,
    // Specify a whitelist of allowed functions.
    'function-whitelist': OFF,

    // Number
    // Limit the number of decimal places allowed in numbers.
    'number-max-precision': 4,

    // Time
    // Specify the minimum number of milliseconds for time values.
    'time-min-milliseconds': 100,

    // Unit
    // Specify a blacklist of disallowed units.
    'unit-blacklist': OFF,
    // Specify a whitelist of allowed units.
    'unit-whitelist': OFF,

    // Shorthand property
    // Disallow redundant values in shorthand properties (Autofixable).
    'shorthand-property-no-redundant-values': true,

    // Value
    // Disallow vendor prefixes for values.
    'value-no-vendor-prefix': true,

    // Custom property
    // Specify a pattern for custom properties.
    'custom-property-pattern': 'ibm-.+',

    // Property
    // Specify a blacklist of disallowed properties.
    'property-blacklist': OFF,
    // Disallow vendor prefixes for properties.
    'property-no-vendor-prefix': true,
    // Specify a whitelist of allowed properties.
    'property-whitelist': OFF,

    // Declaration
    // Disallow longhand properties that can be combined into one shorthand
    // property.
    'declaration-block-no-redundant-longhand-properties': true,
    // Disallow !important within declarations.
    'declaration-no-important': true,
    // Specify a blacklist of disallowed property and unit pairs within
    // declarations.
    'declaration-property-unit-blacklist': OFF,
    // Specify a whitelist of allowed property and unit pairs within
    // declarations.
    'declaration-property-unit-whitelist': {
      'font-size': ['rem', '%', 'vw'],
      '/^animation/': ['ms'],
      'line-height': ['rem'],
    },
    // Specify a blacklist of disallowed property and value pairs within
    // declarations.
    'declaration-property-value-blacklist': {
      // Disallow unset as it is unsupported in IE11
      '/.*/': ['unset'],
    },
    // Specify a whitelist of allowed property and value pairs within
    // declarations.
    'declaration-property-value-whitelist': OFF,

    // Declaration block
    // Limit the number of declaration within single line declaration blocks.
    'declaration-block-single-line-max-declarations': 1,

    // Selector
    // Specify a blacklist of disallowed attribute operators.
    'selector-attribute-operator-blacklist': OFF,
    // Specify a whitelist of allowed attribute operators.
    'selector-attribute-operator-whitelist': OFF,
    // Specify a pattern for class selectors.
    'selector-class-pattern': OFF,
    // Specify a blacklist of disallowed combinators.
    'selector-combinator-blacklist': OFF,
    // Specify a whitelist of allowed combinators.
    'selector-combinator-whitelist': OFF,
    // Specify a pattern for id selectors.
    'selector-id-pattern': OFF,
    // Limit the number of attribute selectors in a selector.
    'selector-max-attribute': OFF,
    // Limit the number of classes in a selector.
    'selector-max-class': OFF,
    // Limit the number of combinators in a selector.
    'selector-max-combinators': OFF,
    // Limit the number of compound selectors in a selector.
    'selector-max-compound-selectors': OFF,
    // Limit the number of adjacent empty lines within selectors.
    'selector-max-empty-lines': OFF,
    // Limit the number of id selectors in a selector.
    'selector-max-id': OFF,
    // Limit the specificity of selectors.
    'selector-max-specificity': OFF,
    // Limit the number of type in a selector.
    'selector-max-type': OFF,
    // Limit the number of universal selectors in a selector.
    'selector-max-universal': OFF,
    // Specify a pattern for the selectors of rules nested within rules.
    'selector-nested-pattern': OFF,
    // Disallow qualifying a selector by type.
    'selector-no-qualifying-type': OFF,
    // Disallow vendor prefixes for selectors.
    'selector-no-vendor-prefix': true,
    // Specify a blacklist of disallowed pseudo-class selectors.
    'selector-pseudo-class-blacklist': OFF,
    // Specify a whitelist of allowed pseudo-class selectors.
    'selector-pseudo-class-whitelist': OFF,
    // Specify a blacklist of disallowed pseudo-element selectors.
    'selector-pseudo-element-blacklist': OFF,
    // Specify a whitelist of allowed pseudo-element selectors.
    'selector-pseudo-element-whitelist': OFF,

    // Media feature
    // Specify a blacklist of disallowed media feature names.
    'media-feature-name-blacklist': OFF,
    // Disallow vendor prefixes for media feature names.
    'media-feature-name-no-vendor-prefix': true,
    // Specify a whitelist of allowed media feature names.
    'media-feature-name-whitelist': OFF,

    // Custom media
    // Specify a pattern for custom media query names.
    'custom-media-pattern': OFF,

    // At-rule
    // Specify a blacklist of disallowed at-rules.
    'at-rule-blacklist': OFF,
    // Disallow vendor prefixes for at-rules.
    'at-rule-no-vendor-prefix': true,
    // Specify a whitelist of allowed at-rules.
    'at-rule-whitelist': OFF,

    // Comment
    // Specify a blacklist of disallowed words within comments.
    'comment-word-blacklist': OFF,

    // General / Sheet
    // Limit the depth of nesting.
    'max-nesting-depth': [
      0,
      {
        ignoreAtRules: ['if', 'else', 'each', 'include', 'mixin'],
      },
    ],
    // Disallow unknown animations.
    'no-unknown-animations': true,
  },
};
