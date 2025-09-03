# Step flows

## Table of Contents

- [Overview](#overview)
- [Example usage](#example-usage)

## Overview

The step flow utility can be used to compose stepping experiences across any
variation of components. This utility allows for stepping as commonly seen in
the `CreateTearsheet` and `CreateFullPage` components, but through a more
composable and headless delivery. This allows for the flexibility to incorporate
stepped experiences within any component.

Included assets:

- `StepProvider`
- `useStepContext`
- `StepGroup`, handles rendering of step components so _only_ the current step
  is in the DOM

## Example usage

Wrap your stepped component in the `StepProvider` from the utility. Use
`<StepGroup>` and step components with your new step enabled tearsheet
component. Any content outside of the `<StepGroup>` will render on every step.

```tsx
const Example = () => {
  return <StepProvider>
    <Tearsheet>
      <StepGroup>
        <Step1 />
        <Step2 />
        {someCondition && <ConditionalStep />}
      </StepGroup>
    <Tearsheet>
  </StepProvider>
}
```

Any component inside of the step enabled component (`StepProvider`) can use
`useStepContext()` to retrieve the step context state, giving the ability to get
and set the state.

```tsx
const Step1 = () => {
  const { setFormState, formState } = useStepContext();
  const { email } = formState ?? {};
  return (
    <TextInput
      labelText="Email"
      value={email ?? ''}
      onChange={(e) => {
        setFormState((prev: StepState['formState']) => ({
          ...prev,
          email: e.target.value,
        }));
      }}
    />
  );
};
```

[Step state](./types.ts) (returned from `useStepContext`):
