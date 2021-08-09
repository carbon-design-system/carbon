Button Component Accessibility Verification Testing

Developers or designers wanting to manually verify the accessibility of the
component can carry out the following steps:

## Contrast

- [ ] the Button text has a contrast of 4.5:1 minimum against the background
      color
- [ ] the Button background has a contrast of 4.5:1 minimum against the page
      background

## Screen reader

Each screen reader should be tested when paired with its preferred browser.

### VoiceOver on Safari

1. {tab} "Button, button, main. You are currently on a button. To click this
   button press ctrl-option-space"

### JAWS on Edge/Chrome

1. {tab} "Main frame, Button, button. To activate press SPACEBAR"

### NVDA on Firefox (optional, but recommended)

1. {tab} "main frame, main landmark. Button button"
