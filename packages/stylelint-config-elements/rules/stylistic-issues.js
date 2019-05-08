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
    // Specify lowercase or uppercase for hex colors (Autofixable).
    'color-hex-case': 'lower',
    // Specify short or long notation for hex colors (Autofixable).
    'color-hex-length': 'long',

    // Font family
    // Specify whether or not quotation marks should be used around font family
    // names.
    'font-family-name-quotes': 'always-where-recommended',

    // Font weight
    // Require numeric or named (where possible) font-weight values.
    'font-weight-notation': OFF,

    // Function
    // Require a newline or disallow whitespace after the commas of functions.
    'function-comma-newline-after': 'always-multi-line',
    // Require a newline or disallow whitespace before the commas of functions.
    'function-comma-newline-before': 'never-multi-line',
    // Require a single space or disallow whitespace after the commas of
    // functions.
    'function-comma-space-after': 'always-single-line',
    // Require a single space or disallow whitespace before the commas of
    // functions.
    'function-comma-space-before': 'never',
    // Limit the number of adjacent empty lines within functions.
    'function-max-empty-lines': 0,
    // Specify lowercase or uppercase for function names.
    'function-name-case': 'lower',
    // Require a newline or disallow whitespace on the inside of the parentheses
    // of functions.
    'function-parentheses-newline-inside': 'always-multi-line',
    // Require a single space or disallow whitespace on the inside of the
    // parentheses of functions.
    'function-parentheses-space-inside': 'never-single-line',
    // Require or disallow quotes for urls.
    'function-url-quotes': OFF,
    // Require or disallow whitespace after functions.
    'function-whitespace-after': 'always',

    // Number
    // Require or disallow a leading zero for fractional numbers less than 1
    // (Autofixable).
    'number-leading-zero': 'always',
    // Disallow trailing zeros in numbers (Autofixable).
    'number-no-trailing-zeros': true,

    // String
    // Specify single or double quotes around strings (Autofixable).
    'string-quotes': 'single',

    // Length
    // Disallow units for zero lengths (Autofixable).
    'length-zero-no-unit': true,

    // Unit
    // Specify lowercase or uppercase for units.
    'unit-case': 'lower',

    // Value
    // Specify lowercase or uppercase for keywords values.
    'value-keyword-case': OFF,

    // Value list
    // Require a newline or disallow whitespace after the commas of value lists.
    'value-list-comma-newline-after': 'always-multi-line',
    // Require a newline or disallow whitespace before the commas of value
    // lists.
    'value-list-comma-newline-before': 'never-multi-line',
    // Require a single space or disallow whitespace after the commas of value
    // lists.
    'value-list-comma-space-after': 'always-single-line',
    // Require a single space or disallow whitespace before the commas of value
    // lists.
    'value-list-comma-space-before': 'never',
    // Limit the number of adjacent empty lines within value lists.
    'value-list-max-empty-lines': 0,

    // Custom property
    // Require or disallow an empty line before custom properties (Autofixable).
    'custom-property-empty-line-before': 'never',

    // Property
    // Specify lowercase or uppercase for properties.
    'property-case': 'lower',

    // Declaration
    // Require a single space or disallow whitespace after the bang of
    // declarations.
    'declaration-bang-space-after': 'never',
    // Require a single space or disallow whitespace before the bang of
    // declarations.
    'declaration-bang-space-before': OFF,
    // Require a newline or disallow whitespace after the colon of declarations.
    'declaration-colon-newline-after': OFF,
    // Require a single space or disallow whitespace after the colon of
    // declarations.
    'declaration-colon-space-after': 'always',
    // Require a single space or disallow whitespace before the colon of
    // declarations.
    'declaration-colon-space-before': 'never',
    // Require or disallow an empty line before declarations (Autofixable).
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-comment', 'first-nested'],
        ignore: ['after-declaration'],
      },
    ],

    // Declaration block
    // Require a newline or disallow whitespace after the semicolons of
    // declaration blocks.
    'declaration-block-semicolon-newline-after': 'always',
    // Require a newline or disallow whitespace before the semicolons of
    // declaration blocks.
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    // Require a single space or disallow whitespace after the semicolons of
    // declaration blocks.
    'declaration-block-semicolon-space-after': 'always-single-line',
    // Require a single space or disallow whitespace before the semicolons of
    // declaration blocks.
    'declaration-block-semicolon-space-before': 'never',
    // Require or disallow a trailing semicolon within declaration blocks.
    'declaration-block-trailing-semicolon': 'always',

    // Block
    // Require or disallow an empty line before the closing brace of blocks.
    'block-closing-brace-empty-line-before': 'never',
    // Require a newline or disallow whitespace after the closing brace of
    // blocks.
    'block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],
    // Require a newline or disallow whitespace before the closing brace of
    // blocks.
    'block-closing-brace-newline-before': 'always-multi-line',
    // Require a single space or disallow whitespace after the closing brace of
    // blocks.
    'block-closing-brace-space-after': 'always-single-line',
    // Require a single space or disallow whitespace before the closing brace of
    // blocks.
    'block-closing-brace-space-before': 'always-single-line',
    // Require a newline after the opening brace of blocks.
    'block-opening-brace-newline-after': 'always-multi-line',
    // Require a newline or disallow whitespace before the opening brace of
    // blocks.
    'block-opening-brace-newline-before': OFF,
    // Require a single space or disallow whitespace after the opening brace of
    // blocks.
    'block-opening-brace-space-after': 'always-single-line',
    // Require a single space or disallow whitespace before the opening brace of
    // blocks.
    'block-opening-brace-space-before': 'always',

    // Selector
    // Require a single space or disallow whitespace on the inside of the
    // brackets within attribute selectors.
    'selector-attribute-brackets-space-inside': 'never',
    // Require a single space or disallow whitespace after operators within
    // attribute selectors.
    'selector-attribute-operator-space-after': 'never',
    // Require a single space or disallow whitespace before operators within
    // attribute selectors.
    'selector-attribute-operator-space-before': 'never',
    // Require or disallow quotes for attribute values.
    'selector-attribute-quotes': 'always',
    // Require a single space or disallow whitespace after the combinators of
    // selectors.
    'selector-combinator-space-after': 'always',
    // Require a single space or disallow whitespace before the combinators of
    // selectors.
    'selector-combinator-space-before': 'always',
    // Disallow non-space characters for descendant combinators of selectors.
    'selector-descendant-combinator-no-non-space': true,
    // Specify lowercase or uppercase for pseudo-class selectors.
    'selector-pseudo-class-case': 'lower',
    // Require a single space or disallow whitespace on the inside of the
    // parentheses within pseudo-class selectors.
    'selector-pseudo-class-parentheses-space-inside': 'never',
    // Specify lowercase or uppercase for pseudo-element selectors.
    'selector-pseudo-element-case': 'lower',
    // Specify single or double colon notation for applicable pseudo-elements.
    'selector-pseudo-element-colon-notation': 'double',
    // Specify lowercase or uppercase for type selector.
    'selector-type-case': 'lower',

    // Selector list
    // Require a newline or disallow whitespace after the commas of selector
    // lists.
    'selector-list-comma-newline-after': 'always-multi-line',
    // Require a newline or disallow whitespace before the commas of selector
    // lists.
    'selector-list-comma-newline-before': 'never-multi-line',
    // Require a single space or disallow whitespace after the commas of
    // selector lists.
    'selector-list-comma-space-after': 'always-single-line',
    // Require a single space or disallow whitespace before the commas of
    // selector lists.
    'selector-list-comma-space-before': 'never',

    // Rule
    // Require or disallow an empty line before rules (Autofixable).
    'rule-empty-line-before': [
      'always',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],

    // Media feature
    // Require a single space or disallow whitespace after the colon in media
    // features.
    'media-feature-colon-space-after': 'always',
    // Require a single space or disallow whitespace before the colon in media
    // features.
    'media-feature-colon-space-before': 'never',
    // Specify lowercase or uppercase for media feature names.
    'media-feature-name-case': 'lower',
    // Require a single space or disallow whitespace on the inside of the
    // parentheses within media features.
    'media-feature-parentheses-space-inside': 'never',
    // Require a single space or disallow whitespace after the range operator in
    // media features.
    'media-feature-range-operator-space-after': 'always',
    // Require a single space or disallow whitespace before the range operator
    // in media features.
    'media-feature-range-operator-space-before': 'always',

    // Media query list
    // Require a newline or disallow whitespace after the commas of media query
    // lists.
    'media-query-list-comma-newline-after': 'always-multi-line',
    // Require a newline or disallow whitespace before the commas of media query
    // lists.
    'media-query-list-comma-newline-before': 'never-multi-line',
    // Require a single space or disallow whitespace after the commas of media
    // query lists.
    'media-query-list-comma-space-after': 'always-single-line',
    // Require a single space or disallow whitespace before the commas of media
    // query lists.
    'media-query-list-comma-space-before': 'never',

    // At-rule
    // Require or disallow an empty line before at-rules (Autofixable).
    'at-rule-empty-line-before': OFF,
    // Specify lowercase or uppercase for at-rules names (Autofixable).
    'at-rule-name-case': 'lower',
    // Require a newline after at-rule names.
    'at-rule-name-newline-after': OFF,
    // Require a single space after at-rule names.
    'at-rule-name-space-after': 'always',
    // Require a newline after the semicolon of at-rules.
    'at-rule-semicolon-newline-after': 'always',
    // Require a single space or disallow whitespace before the semicolons of at
    // rules.
    'at-rule-semicolon-space-before': 'never',

    // Comment
    // Require or disallow an empty line before comments (Autofixable).
    'comment-empty-line-before': OFF,
    // Require or disallow whitespace on the inside of comment markers.
    'comment-whitespace-inside': 'always',

    // General / Sheet
    // Specify indentation (Autofixable).
    indentation: OFF,
    // Limit the number of adjacent empty lines.
    'max-empty-lines': 1,
    // Limit the length of a line.
    'max-line-length': OFF,
    // Disallow end-of-line whitespace.
    'no-eol-whitespace': true,
    // Disallow missing end-of-source newlines (Autofixable).
    'no-missing-end-of-source-newline': true,
  },
};
