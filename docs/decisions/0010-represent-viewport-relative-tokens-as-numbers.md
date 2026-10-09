# 10. Represent viewport-relative layout tokens as DTCG number tokens

Date: 2026-10-08

## Status

Accepted

## Context

The token source for `@carbon/layout`, `tokens/layout.tokens.json`, follows the
[Design Tokens Community Group (DTCG) 2025.10 format](https://www.designtokens.org/tr/2025.10/format/).
We hold our token files to two rules. The first is that each file validates
against the official format schema, which the token conformance test in each
package checks. The second comes from the specification's own description of
`$extensions`, which is for
["optional meta-data that is not crucial to understanding that token's value"](https://www.designtokens.org/tr/2025.10/format/#extensions).
A tool that ignores every extension should still read correct values from our
files.

Four layout tokens cannot satisfy both rules. The fluid spacing tokens are
relative to the viewport width: `fluid-spacing-01` is `0`, and
`fluid-spacing-02`, `-03` and `-04` are `2vw`, `5vw` and `10vw`. The format's
`dimension` type is the natural home for a spacing value, but it accepts only
two units, `px` and `rem`. It has no viewport-relative unit and no way to
declare a custom one.

That left three ways to write these tokens:

- Keep them as `dimension` tokens with a `vw` unit. The value would be complete
  without any extension, but the file would fail schema validation. A tool that
  validates before reading could reject the whole file, including the forty
  tokens that are valid.
- Write them as `number` tokens and record the unit as Carbon metadata in
  `$extensions`. The file validates, but the unit is needed to understand the
  value, so this breaks the second rule for these tokens.
- Leave them out of the token file and define them by hand in Sass and
  JavaScript. The file would be fully compliant, but the package would have two
  sources of truth again, which is what the move to token files removed.

The fluid spacing tokens are also lightly used. They are part of the public API
of `@carbon/layout`, and `@carbon/styles`, `@carbon/themes` and
`@carbon/elements` re-export them, but no Carbon component uses them.

## Decision

Viewport-relative layout tokens are `number` tokens. The `$value` is the count
of viewport units, and the unit is recorded under the `com.ibm.carbon` extension
as `layout.unit`:

```json
"fluid-spacing-02": {
  "$type": "number",
  "$value": 2,
  "$description": "Fluid spacing token — 2vw.",
  "$extensions": {
    "com.ibm.carbon": {
      "layout": { "unit": "vw" }
    }
  }
}
```

A `number` token with no unit is written out as the bare number, which is how
`fluid-spacing-01` produces a unitless `0`.

This is a named exception to the rule that extensions must not be needed to
understand a value. It applies only to values whose unit the `dimension` type
cannot express. Every value in `px` or `rem` remains a `dimension` token, and a
new use of `layout.unit` should be treated as a reason to revisit this record,
not as an established pattern to copy.

We chose a schema-valid file over an extension-free one because the cost falls
on fewer tokens and fails more gently. A tool that ignores the extension reads
three tokens as a bare number. A tool that rejects an invalid file reads none of
them.

## Consequences

The published Sass and JavaScript do not change. `$fluid-spacing-02` is still
`2vw` and `fluidSpacing02` is still `'2vw'`, because the build appends the unit
when it writes the value out.

`layout.tokens.json` passes all five conformance rules, so the package needs no
entry in the conformance test's list of known failures.

Anything that reads the raw token file must read `layout.unit` to get a complete
value for these three tokens. Without it, `fluid-spacing-02` reads as the number
`2`. This is documented in the package's `tokens/README.md`. Our own readers of
the file, the Style Dictionary build and the `layout-explorer` example, already
handle it.

The description of each fluid spacing token states the full value, such as
`2vw`, so a person reading the file is not misled even where a tool might be.

If a later version of the format adds viewport-relative units to `dimension`, or
a supported way to declare custom units, these tokens should move back to
`dimension` and the `layout.unit` property should be removed. That change would
be invisible to Sass and JavaScript consumers for the same reason this one is.
