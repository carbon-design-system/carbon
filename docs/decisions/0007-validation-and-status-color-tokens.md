# Validation and status color tokens

## Status

Accepted

## Context

Core theme tokens include `$support-*`, `$interactive`, and component-level
`$status-*` tokens. Form fields, list boxes, and notifications were reviewed for
consistent use when showing error, warning, and success feedback.

`$status-*` tokens exist for preview status indicator components (Icon Indicator,
Shape Indicator). `$support-*` tokens are theme-level semantic colors for
validation and alerts. `$interactive` and `$icon-interactive` express focus and
action affordances, not validation meaning.

## Decision

Use each token family only for its intended role.

| Token family | Use for | Do not use for |
| --- | --- | --- |
| `$support-error`, `$support-warning`, `$support-success`, `$support-info` (and inverse variants) | Invalid and warning icons, borders, and text inside inputs, list boxes, checkboxes, notifications, progress feedback | Generic icons, loading spinners, or primary UI chrome |
| `$status-*` | Icon Indicator and Shape Indicator only | Icons inside other components |
| `$interactive`, `$border-interactive` | Progress, loading, sliders, selected tree nodes, default progress bar fill | Validation icons or semantic success/error coloring |
| `$icon-interactive` | Interactive icon affordances (for example, file upload complete) | Validation states |

Nested validation icons in components use `$support-error` and `$support-warning`
with the existing warning icon inner-path treatment. List box invalid icons are
the canonical pattern for dropdown, combo box, and multi-select.

`$support-*` tokens remain theme-level. `$status-*` tokens remain
component-level and are registered through `icon-indicator` component tokens.

## Consequences

New form or feedback UI should use `$support-*` for semantic states. New status
visualizations outside status indicator components should not introduce `$status-*`
into shared input styles. Replacing `$interactive` with `$icon-interactive` for
icon fills avoids conflating validation color with interactive affordance color.

Deprecating `$support-*` in favor of `$status-*` is out of scope; both families
serve different layers of the token system.
