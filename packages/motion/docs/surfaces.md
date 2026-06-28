# Motion surfaces architecture spike

Motion surfaces name an interaction intent without selecting an animation
engine. The definition belongs in `@carbon/motion`; framework packages adapt
that definition to their lifecycle and rendering model.

## Initial scope

The first proof of concept defines `expand`: a surface such as a tile or card
expands into a larger modal or panel. It deliberately does not define every
proposed surface category. New definitions should be added only after a proof of
concept demonstrates that their lifecycle and token requirements are reusable.

```ts
const expand = {
  kind: 'shared-element',
  origin: 'surface',
  duration: 'slow-01',
  enterEasing: ['entrance', 'expressive'],
  exitEasing: ['exit', 'expressive'],
  reducedMotion: 'fade',
};
```

The values reference Carbon duration and easing tokens. Adapters resolve them
into the representation their engine expects. For example, the React Motion
adapter converts milliseconds to seconds and Carbon cubic-bezier curves to
numeric tuples. Engine-specific values such as `layoutId`, springs, or View
Transition names do not belong in the definition.

## Layering

1. `@carbon/motion` owns names, intent, tokens, and reduced-motion policy.
2. A framework adapter owns rendering lifecycle, presence, focus coordination,
   interruption, and conversion to engine options.
3. Components expose stable origin and destination surfaces. They do not query
   each other's private DOM structure.
4. An engine implements the transition. Native CSS is the default for simple
   reveals; Motion or View Transitions can implement shared elements where the
   framework and browser support them.

## React proof of concept

The Tile story measures a Carbon `ClickableTile` and the inner surface of an
actual Carbon `Modal`, then uses Motion to apply an inverse FLIP transform to
the modal surface. The Modal retains ownership of focus trapping, keyboard
dismissal, and modal semantics. The adapter owns measurement, animation
completion, interruption, reduced motion, and focus return.

The current `Modal` ref resolves to its full-screen overlay rather than the
inner modal container. The proof of concept temporarily queries
`.cds--modal-container` to test the animation. This selector is private and must
not become production API. A production implementation needs a stable internal
surface ref or registration primitive supplied by Modal. This is a concrete
requirement surfaced by the spike.

### Why the Motion adapter is imperative

Motion's declarative `layoutId` works best when both visual surfaces are Motion
components during the same React layout measurement. Carbon Modal renders the
visual container inside its component, while its public ref points to the
full-screen overlay. Preview Dialog promotes itself to the browser top layer in
an effect, after the first layout measurement. Neither currently gives a
declarative shared element the stable destination it requires.

The proof of concept therefore uses Motion's `animate()` API as a FLIP engine:

1. Measure the clicked Tile and mounted Modal container.
2. Invert the Modal to the Tile's position and dimensions using translate and
   scale.
3. Animate that transform to `none` while separately revealing content and the
   overlay.
4. Reverse the measurements on close, wait for every animation control to
   finish, then let Modal close and restore focus.

This is a real geometry morph of the Modal surface, not a clip-path reveal from
a fixed origin. Motion supplies animation controls, easing support, completion,
and interruption; Carbon supplies the intent and tokens.

### Web Components parity

A Lit reactive controller can consume the same `expand` definition. It would
capture the source rectangle before an update, capture the registered target
surface after the update, and run the same FLIP transform with Motion's
framework-neutral `animate()` API. Controller cleanup must stop active controls,
restore source visibility, and return focus. A View Transitions adapter can be
tested separately, but it should implement the same surface contract rather than
changing component APIs.

### Native boundary

Native CSS is still the preferred zero-dependency engine for local reveals whose
start and end state are owned by one element. A Tile-to-Modal morph needs
cross-component measurement, presence coordination, interruption, and an
explicit completion signal. Native Web Animations can implement those pieces,
but Carbon would have to author and maintain the FLIP orchestration that Motion
already provides.

## Compatibility boundary

Motion for React currently requires React 18.2 or newer. `@carbon/react` still
supports React 16.8 and 17, so Motion cannot become an unconditional production
dependency without a support-policy decision. During the spike it remains a
development dependency used by the Storybook proof of concept. A production
option could be an opt-in adapter package or a future v12 integration after the
React support range is aligned.

## Acceptance criteria

- Opening morphs the selected Tile surface into the Modal surface.
- Closing returns to the same Tile and restores focus.
- Escape, close button, and backdrop dismissal use the same close lifecycle.
- `prefers-reduced-motion` uses a fade without layout transforms.
- Rapid state changes do not leave stale animation controls or mounted modals.
- The semantic definition remains usable by a Web Components adapter without
  importing React or Motion.
