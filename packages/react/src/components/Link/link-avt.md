# Link Component Accessibility Verification Testing

Developers or designers wanting to manually verify the accessibility of the
component can carry out the following steps:

## Keyboard

- [ ] the user can focus the link with `tab`
- [ ] the user can activate the link with `enter`

## Contrast

- [ ] the link text has a contrast of 4.5:1 minimum against the background color
- [ ] the link focus outline has a contrast of 4.5:1 minimum against the
      background color

## Screen reader

Each screen reader should be tested when paired with it's preferred browser.

### VoiceOver on Safari

"{link text}, link. You are currently on a link. To click this link, press
Control-Option-Space."

### JAWS on Edge/Chrome

"Main region. {link text}, link."

### NVDA on Firefox (optional, but recommended)

"link {link text}"
