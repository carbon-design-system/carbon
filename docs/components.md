# Components

## Templates

**Definition of done**

**Acceptance Criteria**

```md
- [ ] The component is available through the entrypoint of the package
- [ ] The component has a story defined in Storybook
  - [ ] This story includes at least one usage example
  - [ ] This story includes a playground story
  - [ ] This story includes a docs page
    - [ ] The docs page follows our docs page template
- [ ] The component has a test suite that includes Public API, functional, and
      automated accessibility tests
  - [ ] This test file includes AVT1 tests with aXe and Accessibility Checker
  - [ ] This test file includes tests against the components Public API
- [ ] The component has a corresponding test for visual regressions
  - [ ] This visual test includes the component rendered in each theme
- [ ] The component has gone through a visual review
- [ ] The component is documented on the design system website
- [ ] The accessibility of the component has been verified across the following
      levels
  - [ ] AVT2
    - [ ] Keyboard
    - [ ] Zoom Magnifier
  - [ ] AVT3
    - [ ] VoiceOver
    - [ ] JAWS
    - [ ] NVDA
    - [ ] VoiceOver on iOS
```

**Component API**

````md
## About

<!--
Fill out this section with information about the component, including its
intended purpose and role in the Design System.
-->

## Behavior

<!-- How do you anticipate a user will interact with this component? -->

## Accessibility

<!-- What accessible considerations should be included and tested against? -->

**Links & Resources**

<!-- Include any references or examples that are helpful -->

## API Design

```jsx
function SampleComponent() {
  // ...
}
```
````

**Props**

| Name | Type | Description |
| :--- | :--- | :---------- |

**Links & Resources**

<!-- Include any references or examples that are helpful -->

```

```
