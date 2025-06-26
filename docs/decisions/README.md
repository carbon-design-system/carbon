# Decisions

> One of the hardest things to track during the life of a project is the
> motivation behind certain decisions.

This directory contains
[architecture decision records](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
(ADRs) that document the context surrounding and the motivation behind decisions
made by the Carbon Design System.

These are "architecturally significant" decisions: those that affect the
structure, non-functional characteristics, dependencies, interfaces, or
construction techniques of the Carbon Design System.

- Project processes
- Carbon team processes
- Design-based standards
- Coding standards
- UX best practices
- API design principles
- Approaches to accessibility
- ... and others - this list is not exhaustive

## Decision record principles

- ADRs will be created as proposals, before a decision is made
- ADRs will be discussed both as a team and with relevant parties
- When a decision is made, it will be documented by updating the
  initial/proposed ADR
- If a decision is reversed, we will keep the old one around, but mark it as
  superseded by adding links from the old one to the new one and vice versa.

---

- ADRs will be numbered sequentially, numbers will not be reused.
- The template format will have just a few parts, so each document is easy to
  digest.
- Each ADR will be written as if it is a conversation with a future maintainer
  by using good writing style with full sentences organized into paragraphs.

These principles are derived from Michael Nygard's article,
[Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

## Authoring a decision record

1. Duplicate the `0000-template.md` file within `./docs/decisions`
2. Rename it to include the next logical number in the sequence within the
   folder and the title of the decision
3. Fill out the ADR
4. Submit it in a PR
