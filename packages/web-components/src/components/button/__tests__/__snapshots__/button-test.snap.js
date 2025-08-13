/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots[
  'cds-button should support rendering elements within the button through the `children` prop'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should support rendering elements within the button through the `children` prop */

snapshots['cds-button should support a custom tabIndex through props'] =
  `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should support a custom tabIndex through props */

snapshots[
  'cds-button should support a custom className on the outermost element'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should support a custom className on the outermost element */

snapshots['cds-button should render an element with the button role'] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should render an element with the button role */

snapshots[
  'cds-button should use the disabled prop to set disabled on the <button>'
] = `<button
  aria-describedby="badge-indicator"
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
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should use the disabled prop to set disabled on the <button> */

snapshots['cds-button should render with a default button type of button'] =
  `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should render with a default button type of button */

snapshots[
  'cds-button should support changing the button type to button with the `type` prop'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should support changing the button type to button with the `type` prop */

snapshots[
  'cds-button should support changing the button type to submit with the `type` prop'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should support changing the button type to submit with the `type` prop */

snapshots[
  'cds-button should support changing the button type to reset with the `type` prop'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
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
</a>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should render as an element with the role of `link` when the `href` prop is used */

snapshots[
  'cds-button should not error on tooltipAlignment even when hasIconOnly=false'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should not error on tooltipAlignment even when hasIconOnly=false */

snapshots[
  'cds-button should set the expected classes for the button of kind: primary'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of kind: primary */

snapshots[
  'cds-button should set the expected classes for the button of kind: secondary'
] = `<button
  aria-describedby="badge-indicator"
  class="cds--btn cds--btn--lg cds--btn--secondary cds--layout--size-lg"
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
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of kind: secondary */

snapshots[
  'cds-button should set the expected classes for the button of kind: ghost'
] = `<button
  aria-describedby="badge-indicator"
  class="cds--btn cds--btn--ghost cds--btn--lg cds--layout--size-lg"
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
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of kind: ghost */

snapshots[
  'cds-button should set the expected classes for the button of kind: danger'
] = `<button
  aria-describedby="badge-indicator"
  class="cds--btn cds--btn--danger cds--btn--lg cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <span class="cds--visually-hidden">
  </span>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of kind: danger */

snapshots[
  'cds-button should set the expected classes for the button of kind: danger--primary'
] = `<button
  aria-describedby="badge-indicator"
  class="cds--btn cds--btn--danger--primary cds--btn--lg cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <span class="cds--visually-hidden">
  </span>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of kind: danger--primary */

snapshots[
  'cds-button should set the expected classes for the button of kind: danger--ghost'
] = `<button
  aria-describedby="badge-indicator"
  class="cds--btn cds--btn--lg cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <span class="cds--visually-hidden">
  </span>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of kind: danger--ghost */

snapshots[
  'cds-button should set the expected classes for the button of kind: danger--tertiary'
] = `<button
  aria-describedby="badge-indicator"
  class="cds--btn cds--btn--lg cds--layout--size-lg"
  id="button"
  part="button"
  tabindex="0"
  type="button"
>
  <span class="cds--visually-hidden">
  </span>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of kind: danger--tertiary */

snapshots[
  'cds-button should set the expected classes for the button of kind: tertiary'
] = `<button
  aria-describedby="badge-indicator"
  class="cds--btn cds--btn--lg cds--btn--tertiary cds--layout--size-lg"
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
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of kind: tertiary */

snapshots[
  'cds-button should set the expected classes for the button of size: sm'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of size: sm */

snapshots[
  'cds-button should set the expected classes for the button of size: md'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of size: md */

snapshots[
  'cds-button should set the expected classes for the button of size: lg'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of size: lg */

snapshots[
  'cds-button should set the expected classes for the button of size: xl'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of size: xl */

snapshots[
  'cds-button should set the expected classes for the button of size: 2xl'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of size: 2xl */

snapshots[
  'cds-button Button with Icon variant should render the given icon within the <button> element'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button Button with Icon variant should render the given icon within the <button> element */

snapshots['cds-button Icon Button variant should set the icon-only class'] =
  `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button Icon Button variant should set the icon-only class */

snapshots['cds-button Icon Button variant should support badge indicator'] =
  `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button Icon Button variant should support badge indicator */

snapshots[
  'cds-button Icon Button variant should support badge indicator and truncate'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button Icon Button variant should support badge indicator and truncate */

snapshots[
  'cds-button should set the expected classes for the button of size: `sm`'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of size: `sm` */

snapshots[
  'cds-button should set the expected classes for the button of size: `md`'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of size: `md` */

snapshots[
  'cds-button should set the expected classes for the button of size: `lg`'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of size: `lg` */

snapshots[
  'cds-button should set the expected classes for the button of size: `xl`'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of size: `xl` */

snapshots[
  'cds-button should set the expected classes for the button of size: `2xl`'
] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button should set the expected classes for the button of size: `2xl` */

snapshots['cds-button supports props.size size="sm"'] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button supports props.size size="sm" */

snapshots['cds-button supports props.size size="md"'] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button supports props.size size="md" */

snapshots['cds-button supports props.size size="lg"'] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button supports props.size size="lg" */

snapshots['cds-button supports props.size size="xl"'] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button supports props.size size="xl" */

snapshots['cds-button supports props.size size="2xl"'] = `<button
  aria-describedby="badge-indicator"
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
</button>
<slot
  id="badge-indicator"
  name="badge-indicator"
>
</slot>
`;
/* end snapshot cds-button supports props.size size="2xl" */
