# Component implementation practice

Starting point: https://github.com/carbon-design-system/carbon/blob/v10.3.2/packages/react/src/components/TextInput/TextInput.js

- A set of React props for a component works as a public API of the component, in some ways similar to `@Input()`. What is the corresponding feature in Custom Elements?
- Some React props works as event listeners, similar to `@Output()`. How can we define event listener API in Custom Elements? Will [event retargeting](https://javascript.info/shadow-dom-events) help, or do we need to do declarative event listener (similar to Angular `(event)="myEventListener"`) to translate the event for the caller? If it depends, what will make us choose one vs. another?
- There is [code to prevent event from being fired if the component is disabled](https://github.com/carbon-design-system/carbon/blob/v10.3.2/packages/react/src/components/TextInput/TextInput.js#L43-L52). Should we do the same? If so, how can we do that? Can we make the disable style automatically take care of that?
- Some `carbon-components-react` codebase has [a way to generate class list from a set of props](https://github.com/carbon-design-system/carbon/blob/v10.3.2/packages/react/src/components/TextInput/TextInput.js#L59-L65) (similar to `ngClass`). Can we do the same with `lit-html`?
- Some `carbon-components-react` code [composes sub-portions of a component](https://github.com/carbon-design-system/carbon/blob/v10.3.2/packages/react/src/components/TextInput/TextInput.js#L76-L81), often conditionally (similar to `ngIf`). Can we do the same with `lit-html`?
- How can we [render a Carbon icon](https://github.com/carbon-design-system/carbon/blob/v10.3.2/packages/react/src/components/TextInput/TextInput.js#L91) in `lit-html`, with specific CSS class applied?
