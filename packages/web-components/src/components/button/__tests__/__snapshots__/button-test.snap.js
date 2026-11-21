/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['cds-button should support a custom tabIndex through props'] =
  `<button
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="-1"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button should support a custom tabIndex through props */

snapshots[
  'cds-button should support a custom className on the outermost element'
] = `<button
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button should support a custom className on the outermost element */

snapshots['cds-button should render an element with the button role'] = `<button
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button should render an element with the button role */

snapshots[
  'cds-button should use the disabled prop to set disabled on the <button>'
] = `<button
  class="cds--btn cds--btn--disabled cds--btn--lg cds--btn--primary cds--layout--size-lg"
  disabled=""
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</button>
`;
/* end snapshot cds-button should use the disabled prop to set disabled on the <button> */

snapshots['cds-button should render with a default button type of button'] =
  `<button
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button should render with a default button type of button */

snapshots[
  'cds-button should support changing the button type to button with the `type` prop'
] = `<button
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button should support changing the button type to button with the `type` prop */

snapshots[
  'cds-button should support changing the button type to submit with the `type` prop'
] = `<button
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="submit"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button should support changing the button type to submit with the `type` prop */

snapshots[
  'cds-button should support changing the button type to reset with the `type` prop'
] = `<button
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="reset"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button should support changing the button type to reset with the `type` prop */

snapshots[
  'cds-button should render as an element with the role of `link` when the `href` prop is used'
] = `<a
  aria-describedby="badge-indicator"
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg"
  href="/"
  id="button"
  part="button"
  role="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</a>
`;
/* end snapshot cds-button should render as an element with the role of `link` when the `href` prop is used */

snapshots[
  'cds-button should not error on tooltipAlignment even when hasIconOnly=false'
] = `<button
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button should not error on tooltipAlignment even when hasIconOnly=false */

snapshots['cds-button supports props.size size="sm"'] = `<button
  class="cds--btn cds--btn--primary cds--btn--sm cds--layout--size-sm"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button supports props.size size="sm" */

snapshots['cds-button supports props.size size="md"'] = `<button
  class="cds--btn cds--btn--md cds--btn--primary cds--layout--size-md"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button supports props.size size="md" */

snapshots['cds-button supports props.size size="lg"'] = `<button
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button supports props.size size="lg" */

snapshots['cds-button supports props.size size="xl"'] = `<button
  class="cds--btn cds--btn--primary cds--btn--xl cds--layout--size-xl"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button supports props.size size="xl" */

snapshots['cds-button supports props.size size="2xl"'] = `<button
  class="cds--btn cds--btn--2xl cds--btn--primary cds--layout--size-2xl"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button supports props.size size="2xl" */

snapshots[
  'cds-button Button with Icon variant should render the given icon within the <button> element'
] = `<button
  class="cds--btn cds--btn--lg cds--btn--primary cds--layout--size-lg cds-ce--btn--has-icon"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button Button with Icon variant should render the given icon within the <button> element */

snapshots['cds-button Icon Button variant should set the icon-only class'] =
  `<button
  class="cds--btn cds--btn--icon-only cds--btn--lg cds--btn--primary cds--layout--size-lg cds-ce--btn--has-icon"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button Icon Button variant should set the icon-only class */

snapshots['cds-button Icon Button variant should support badge indicator'] =
  `<button
  class="cds--btn cds--btn--ghost cds--btn--icon-only cds--btn--lg cds--layout--size-lg cds-ce--btn--has-icon"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button Icon Button variant should support badge indicator */

snapshots[
  'cds-button Icon Button variant should support badge indicator and truncate'
] = `<button
  class="cds--btn cds--btn--ghost cds--btn--icon-only cds--btn--lg cds--layout--size-lg cds-ce--btn--has-icon"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
  <slot
    id="badge-indicator"
    name="badge-indicator"
  >
  </slot>
</button>
`;
/* end snapshot cds-button Icon Button variant should support badge indicator and truncate */
