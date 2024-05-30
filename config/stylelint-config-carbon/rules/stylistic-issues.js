/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const OFF = null;

export default {
  rules: {
    // Color
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
    // Specify lowercase or uppercase for function names.
    'function-name-case': 'lower',
    // Require or disallow quotes for urls.
    'function-url-quotes': OFF,

    // Length
    // Disallow units for zero lengths (Autofixable).
    'length-zero-no-unit': true,

    // Value
    // Specify lowercase or uppercase for keywords values.
    'value-keyword-case': OFF,

    // Custom property
    // Require or disallow an empty line before custom properties (Autofixable).
    'custom-property-empty-line-before': 'never',
    // Require or disallow an empty line before declarations (Autofixable).
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-comment', 'first-nested'],
        ignore: ['after-declaration'],
      },
    ],
    // Require or disallow quotes for attribute values.
    'selector-attribute-quotes': 'always',
    // Specify single or double colon notation for applicable pseudo-elements.
    'selector-pseudo-element-colon-notation': 'double',
    // Specify lowercase or uppercase for type selector.
    'selector-type-case': 'lower',

    // Rule
    // Require or disallow an empty line before rules (Autofixable).
    'rule-empty-line-before': [
      'always',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],

    // At-rule
    // Require or disallow an empty line before at-rules (Autofixable).
    'at-rule-empty-line-before': OFF,

    // Comment
    // Require or disallow an empty line before comments (Autofixable).
    'comment-empty-line-before': OFF,
    // Require or disallow whitespace on the inside of comment markers.
    'comment-whitespace-inside': 'always',

    // Shorthands
    'declaration-block-no-redundant-longhand-properties': OFF,
  },
};
