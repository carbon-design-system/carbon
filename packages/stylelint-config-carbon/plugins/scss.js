/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const OFF = null;

module.exports = {
  plugins: ['stylelint-scss'],
  rules: {
    // @-else
    // Require or disallow a newline after the closing brace of @else statements.
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    // Require a single space or disallow whitespace after the closing brace of @else statements.
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    // Require an empty line or disallow empty lines before @-else.
    'scss/at-else-empty-line-before': 'never',
    // Require or disallow a space before @else if parentheses.
    'scss/at-else-if-parentheses-space-before': OFF,

    // @-extend
    // Disallow at-extends (@extend) with missing placeholders.
    'scss/at-extend-no-missing-placeholder': OFF,

    // @-function
    // Require named parameters in SCSS function call rule.
    'scss/at-function-named-arguments': OFF,
    // Require or disallow a space before @function parentheses.
    'scss/at-function-parentheses-space-before': OFF,
    // Specify a pattern for Sass/SCSS-like function names.
    'scss/at-function-pattern': OFF,

    // @-if
    // Require or disallow a newline after the closing brace of @if statements.
    'scss/at-if-closing-brace-newline-after': OFF,
    // Require a single space or disallow whitespace after the closing brace of @if statements.
    'scss/at-if-closing-brace-space-after': OFF,

    // @-import
    // Disallow leading underscore in partial names in @import.
    'scss/at-import-no-partial-leading-underscore': OFF,
    // Specify blacklist of disallowed file extensions for partial names in @import commands.
    'scss/at-import-partial-extension-blacklist': OFF,
    // Specify whitelist of allowed file extensions for partial names in @import commands.
    'scss/at-import-partial-extension-whitelist': OFF,

    // @-mixin
    // Require or disallow parentheses in argumentless @mixin calls.
    'scss/at-mixin-argumentless-call-parentheses': OFF,
    // Require named parameters in at-mixin call rule.
    'scss/at-mixin-named-arguments': OFF,
    // Require or disallow a space before @mixin parentheses.
    'scss/at-mixin-parentheses-space-before': OFF,
    // Specify a pattern for Sass/SCSS-like mixin names.
    'scss/at-mixin-pattern': OFF,

    // @-rule
    // Disallow unknown at-rules. Should be used instead of stylelint's at-rule-no-unknown.
    'scss/at-rule-no-unknown': true,

    // $-variable
    // Require a newline after the colon in $-variable declarations.
    'scss/dollar-variable-colon-newline-after': OFF,
    // Require a single space or disallow whitespace after the colon in $-variable declarations.
    'scss/dollar-variable-colon-space-after': OFF,
    // Require a single space or disallow whitespace before the colon in $-variable declarations.
    'scss/dollar-variable-colon-space-before': OFF,
    // Require !default flag for $-variable declarations.
    'scss/dollar-variable-default': OFF,
    // Require a single empty line or disallow empty lines before $-variable declarations.
    'scss/dollar-variable-empty-line-before': OFF,
    // Disallow Sass variables that are used without interpolation with CSS features that use custom identifiers.
    'scss/dollar-variable-no-missing-interpolation': true,
    // Specify a pattern for Sass-like variables.
    'scss/dollar-variable-pattern': OFF,

    // %-placeholder
    // Specify a pattern for %-placeholders.
    'scss/percent-placeholder-pattern': OFF,

    // //-comment
    // Require or disallow an empty line before //-comments.
    'scss/double-slash-comment-empty-line-before': OFF,
    // Require or disallow //-comments to be inline comments.
    'scss/double-slash-comment-inline': 'never',
    // Require or disallow whitespace after the // in //-comments
    'scss/double-slash-comment-whitespace-inside': OFF,

    // Declaration
    // Require or disallow properties with - in their names to be in a form of a nested group.
    'scss/declaration-nested-properties': 'never',
    // Disallow nested properties of the same "namespace" be divided into multiple groups.
    'scss/declaration-nested-properties-no-divided-groups': OFF,

    // Media feature
    // Require a media feature value be a $-variable or disallow $-variables in media feature values.
    'scss/media-feature-value-dollar-variable': OFF,

    // Operator
    // Disallow linebreaks after Sass operators.
    'scss/operator-no-newline-after': OFF,
    // Disallow linebreaks before Sass operators.
    'scss/operator-no-newline-before': true,
    // Disallow unspaced operators in Sass operations.
    'scss/operator-no-unspaced': OFF,

    // Partial
    // Disallow non-CSS @imports in partial files.
    'scss/partial-no-import': OFF,

    // Selector
    // Disallow redundant nesting selectors (&).
    'scss/selector-no-redundant-nesting-selector': true,
  },
};
