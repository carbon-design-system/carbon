# React example app

Path: `packages/themes/examples/coforge-skin/app/`

## Stack

- `@carbon/react` vendor components
- CoForge Sass: `@carbon/themes/scss/coforge` (or local
  `packages/themes/scss/coforge`)
- `document.documentElement.setAttribute('data-coforge-skin', 'on')`
- HashRouter: `#/`, `#/venues`, `#/venues/:id`, `#/venues/how-verified`,
  `#/documents`, `#/plan`, `#/airport`
- No Next.js, no shadcn, no Tailwind as the DS, no CSS-in-JS theme

## Shell

```jsx
<Header>
  <HeaderName href="#/">Luma</HeaderName>
  <HeaderNavigation>
    <HeaderMenuItem href="#/venues" isCurrentPage={...}>Venues</HeaderMenuItem>
    <HeaderMenuItem href="#/documents">Documents</HeaderMenuItem>
    <HeaderMenuItem href="#/plan">Plan</HeaderMenuItem>
    <HeaderMenuItem href="#/airport">Airport</HeaderMenuItem>
  </HeaderNavigation>
</Header>
```

Routes implement `proto-spec.json` hotspots. Forbidden hotspots must not render
(`Book` on Venues).

## A11y

WCAG 2.2 AA. Visible focus (ink). Search has a visible `<label>`. Hit targets ≥
24px. One h1. Landmarks: banner + main.

## Storybook

Isolated stories may remain under `.storybook/` with
`globals.coforgeSkin: 'on'`. The **product** is the HashRouter app, not a story
per frame only.

## Dual flagship

React first for the prototype. Web components later if asked — same `id`s, do
not diverge IA.
