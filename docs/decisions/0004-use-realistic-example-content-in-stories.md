# 4. Use realistic example content in stories

Date: 2026-02-16

## Status

Accepted

## Context

Many component stories use generic labels and placeholder prose such as "Section
1 title" and lorem ipsum text. This kind of meta content can accidentally carry
the meaning of the pattern itself instead of validating whether the design is
clear in realistic usage.

For example, sequence-based interactions can appear clear only because labels
use words like "Step", instead of because the component's visual and interaction
design communicates sequence on its own.

Using realistic, task-oriented labels in stories helps us identify when a
component is relying on placeholder wording to explain behavior. It also gives
consumers better examples of how components read in product-like contexts.

## Decision

We will prefer realistic example content in stories over generic meta content
and lorem ipsum placeholders. Story content should use plausible user-facing
labels and supporting text that reflect real tasks.

## Consequences

- Stories become a more effective quality check for whether component affordance
  is communicated by design, not placeholder wording.
- Storybook docs become more useful to consumers by showing product-like usage
  examples.
