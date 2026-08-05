/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { types: t } = require('@carbon/scss-generator');
const { group } = require('../../src/tokens');
const { FILE_BANNER } = require('./shared');

/**
 * Build token variables from DTCG + JS metadata.
 *
 * Generates scss/generated/_tokens.scss — a flat list of Sass variables, one
 * per Carbon token, each wrapping a CSS Custom Property via var():
 *
 *   $border-inverse: var(--cds-border-inverse, #161616) !default;
 *
 * The inline fallback (second arg to var()) is always a sRGB hex or rgba()
 * value, NOT an oklch() string.  This matters because the inline fallback is
 * used by browsers when the custom property is not defined on any ancestor
 * (e.g. theme mixin not called, shadow DOM isolation, iframe).  If the
 * fallback were oklch(), old browsers would receive an invalid value.
 *
 * The _oklch-fallback() helper below converts oklch Sass colors to hex/rgba
 * at Sass compile time using the $oklch-to-hex map from _hex-fallbacks.scss.
 *
 * The token *declarations* (--cds-border-inverse: oklch(...)) are a separate
 * concern handled by the theme mixin in _theme.scss, optionally with the
 * $enable-oklch-fallback flag for dual-declaration support.
 */
function buildDTCGTokens() {
  const tokens = group.getTokens();

  const variables = tokens.flatMap((token) => {
    const id = token.name;
    return [
      t.Newline(),
      t.Comment(`/ The CSS Custom Property for the \`${id}\` token`),
      t.Assignment({
        id: t.Identifier(id),
        init: t.SassFunctionCall({
          id: t.Identifier('_get'),
          params: [t.SassString(id)],
        }),
        default: true,
      }),
    ];
  });

  // Raw Sass for the helper functions. We use t.SassValue() to inject verbatim
  // Sass — the scss-generator AST does not have first-class nodes for complex
  // function bodies, so raw injection is the pragmatic choice here.
  const helperFunctions = t.SassValue(`
/// Convert an oklch Sass color to a sRGB hex or rgba() fallback string.
///
/// The result is used as the inline fallback in var(--cds-token, <fallback>)
/// so that browsers without CSS Color Level 4 oklch() support still receive a
/// valid colour when the custom property is not defined on any ancestor.
///
/// Fully opaque colours return a 7-character hex string (#rrggbb).
/// Semi-transparent colours return rgba(#hex, alpha).
/// Non-oklch values are returned unchanged.
///
/// @param {Color} $value - A Sass color in any color space
/// @returns {String|Color}
/// @access private
@function _oklch-fallback($value) {
  @if meta.type-of($value) != color or color.space($value) != oklch {
    @return $value;
  }

  // Extract L (0–1), C (raw), H (degrees as unitless number).
  // math.div strips the Sass units: 55.65% → 0.5565, 261.95deg → 261.95.
  $l: math.div(color.channel($value, 'lightness', $space: oklch), 100%);
  $c: color.channel($value, 'chroma', $space: oklch);
  $h: math.div(color.channel($value, 'hue', $space: oklch), 1deg);
  $alpha: color.channel($value, 'alpha');

  // Round to 4 decimal places — matches keys written by generate-hex-fallbacks.js,
  // which also rounds to 4dp to mirror formatOklch() in dtcg-converter.js.
  $l-r: math.div(math.round($l * 10000), 10000);
  $c-r: math.div(math.round($c * 10000), 10000);
  $h-r: math.div(math.round($h * 10000), 10000);
  $key: 'oklch(#{$l-r} #{$c-r} #{$h-r})';

  @if not map.has-key(hex-fb.$oklch-to-hex, $key) {
    // oklch value not found in palette map — return raw value unchanged.
    @return $value;
  }

  $hex: map.get(hex-fb.$oklch-to-hex, $key);

  @if $alpha < 1 {
    // rgba() expects a Sass color object — #{$hex} is a string, so emit verbatim.
    @return string.unquote('rgba(#{$hex}, #{$alpha})');
  }

  @return string.unquote($hex);
}

/// Return the CSS Custom Property var() expression for a token.
///
/// When $use-fallback-value is true (the default), the var() inline fallback
/// is a sRGB hex or rgba() value rather than the raw oklch theme value.  This
/// ensures browsers that do not support CSS Color Level 4 receive a valid
/// colour even when the custom property is not defined on an ancestor.
///
/// @param {String} $token - The token name, e.g. "border-inverse"
/// @returns {String} var(--cds-border-inverse, #161616)
/// @access private
@function _get($token) {
  @if config.$use-fallback-value == false {
    @return var(--#{config.$prefix}-#{$token});
  }

  $raw: theme.get($token);
  $fallback: _oklch-fallback($raw);
  @return var(--#{config.$prefix}-#{$token}, #{$fallback});
}
`);

  return t.StyleSheet([
    FILE_BANNER,
    t.Newline(),

    // @use statements — must come before any other rules in Sass.
    t.SassValue("@use 'sass:color';"),
    t.SassValue("@use 'sass:map';"),
    t.SassValue("@use 'sass:math';"),
    t.SassValue("@use 'sass:meta';"),
    t.SassValue("@use 'sass:string';"),
    t.SassModule('../config'),
    t.SassModule('../theme'),
    // _tokens.scss lives inside scss/generated/ — use sibling path, not 'generated/...'
    t.SassValue("@use 'hex-fallbacks' as hex-fb;"),
    t.Newline(),

    helperFunctions,

    // One $token-name: _get('token-name') variable per token.
    ...variables,
  ]);
}

module.exports = buildDTCGTokens;
