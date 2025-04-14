/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['cds-copy-button should add extra classes via button-class-name'] =
  `<cds-copy
  align="bottom"
  button-class-name="cds--copy-btn extra-class"
  feedback="Copied!"
  feedback-timeout="2000"
  kind="primary"
  size="md"
  tooltip-alignment=""
  tooltip-position="top"
  type="button"
>
  <slot slot="tooltip-content">
  </slot>
</cds-copy>
`;
/* end snapshot cds-copy-button should add extra classes via button-class-name */

snapshots[
  'cds-copy-button should disable the button when disabled prop is set'
] = `<cds-copy
  align="bottom"
  button-class-name="cds--copy-btn"
  disabled=""
  feedback="Copied!"
  feedback-timeout="2000"
  kind="primary"
  size="md"
  tooltip-alignment=""
  tooltip-position="top"
  type="button"
>
  <slot slot="tooltip-content">
  </slot>
</cds-copy>
`;
/* end snapshot cds-copy-button should disable the button when disabled prop is set */

snapshots['cds-copy-button should trigger click handler on button click'] =
  `<cds-copy
  align="bottom"
  button-class-name="cds--copy-btn"
  feedback="Copied!"
  feedback-timeout="2000"
  kind="primary"
  size="md"
  tooltip-alignment=""
  tooltip-position="top"
  type="button"
>
  <slot slot="tooltip-content">
  </slot>
</cds-copy>
`;
/* end snapshot cds-copy-button should trigger click handler on button click */

snapshots['cds-copy-button should show feedback for a limited time'] =
  `<cds-copy
  align="bottom"
  button-class-name="cds--copy-btn"
  feedback="Copied!"
  feedback-timeout="500"
  kind="primary"
  size="md"
  tooltip-alignment=""
  tooltip-position="top"
  type="button"
>
  <slot slot="tooltip-content">
  </slot>
</cds-copy>
`;
/* end snapshot cds-copy-button should show feedback for a limited time */

snapshots[
  'cds-copy-button should render custom feedback message and clear it after timeout'
] = `<cds-copy
  align="bottom"
  button-class-name="cds--copy-btn"
  feedback="Custom feedback message"
  feedback-timeout="200"
  kind="primary"
  size="md"
  tooltip-alignment=""
  tooltip-position="top"
  type="button"
>
  <slot slot="tooltip-content">
  </slot>
</cds-copy>
`;
/* end snapshot cds-copy-button should render custom feedback message and clear it after timeout */

snapshots['cds-copy-button should respect custom feedback-timeout prop'] =
  `<cds-copy
  align="bottom"
  button-class-name="cds--copy-btn"
  feedback="Copied!"
  feedback-timeout="100"
  kind="primary"
  size="md"
  tooltip-alignment=""
  tooltip-position="top"
  type="button"
>
  <slot slot="tooltip-content">
  </slot>
</cds-copy>
`;
/* end snapshot cds-copy-button should respect custom feedback-timeout prop */
