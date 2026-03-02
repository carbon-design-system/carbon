# 3. Use `preview` moniker instead of `experimental`

## Status

Accepted

## Context

Occasionally there are new features and APIs added to the system that the Carbon
team is unsure of, wanting consumers to test, and gather feedback on. We've long
described these as `experimental` or `unstable` across the codebase and
documentation. While these terms have clear intent, our approach to non-stable
features and APIs has shifted and these terms are no longer the best way to
describe how we treat these or what consumers can expect using them.

The definition previously held for `experimental` and `unstable` was that these
are highly in flux, subject to change at any time, are not bound by semver, and
other similar descriptions of a high likelihood of instability. Due to this,
consumers have rarely chosen to pick up these improvements and instead wait to
use them until they are marked as stable.

To change this and improve the feedback loop, we're shifting our approach. We
now aim to ship and maintain these with significantly greater stability than
before. We avoid changes wherever possible and limit any changes to only those
based on customer feedback. If change does have to happen, we mitigate the
impact of that change as much as possible. Adding backwards compatibility,
providing automated migration paths through codemods, and similar interventions.

Coupling the changes in our approach with our recent adoption of the Product
Development Lifecycle (PDLC) process framework, the term `preview` stands out as
a way to label and describe what we would previously have called `experimental`
or `unstable`.

Using `preview` is an opportunity for us to reframe the community's relationship
with new features and APIs that we need feedback on. It contributes to the
overall goal of instilling greater confidence in the stability of these things,
which encourages more early and often feedback to guide system decisions.

## Decision

`experimental` and `unstable` will no longer be used where possible, and
`preview` will be used instead. We'll use this change as an opportunity to
reframe expectations with consumers and communicate our heightened focus on
stability.

## Consequences

- This change could cause confusion as `preview` is inherently a bit more "open
  to interpretation". We'll need to ground this with new/updated docs, increased
  communications surrounding the `preview` meaning, and discussions during
  community events (office hours, DSAG, etc.).
- Our exports and feature flags and such will bloat a bit. `unstable__Component`
  will need to stick around for backwards compatibility of the new
  `preview__Component`, for instance.
- Docs will need updated in the codebase and the site
