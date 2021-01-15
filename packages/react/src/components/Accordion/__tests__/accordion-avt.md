# Accordion Component Accessibility Verification Testing

Developers or designers wanting to manually verify the accessibility of the
component can carry out the following steps:

## Contrast

- [ ] the Accordion text has a contrast of 4.5:1 minimum against the background
      color
- [ ] the Accordion focus outline has a contrast of 4.5:1 minimum against the
      background color

## Screen reader

Each screen reader should be tested when paired with it's preferred browser.

### VoiceOver on Safari

1. {tab} "Section 1 title, collapsed, button, main. You are currently on a
   button. To click this button press ctrl-option-space"
2. {space} "Section 1 title, expanded, button"
3. {down arrow} "Lorem ipsum dolor sit amet..."

### JAWS on Edge/Chrome

1. {tab} "Section 1 title, button, collapsed. To activate press ENTER"
2. {enter or space} "expanded"
3. {down arrow} "Lorem ipsum dolor sit amet..."

### NVDA on Firefox (optional, but recommended)

1. {tab} "Section 1 title, button, collapsed"
2. {enter or space} "expanded"
3. {down arrow} "Lorem ipsum dolor sit amet..."
