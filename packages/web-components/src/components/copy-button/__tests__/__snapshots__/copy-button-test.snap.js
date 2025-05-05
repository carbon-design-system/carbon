/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['CopyButton should set tabIndex if one is passed via props'] =
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
/* end snapshot CopyButton should set tabIndex if one is passed via props */

snapshots['Button props should call the click handler'] = `<cds-copy
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
/* end snapshot Button props should call the click handler */

snapshots['Button props should disable button if disabled prop is passed'] =
  `<cds-copy
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
/* end snapshot Button props should disable button if disabled prop is passed */

snapshots[
  'Feedback should make the feedback visible for a limited amount of time'
] = `<cds-copy
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
/* end snapshot Feedback should make the feedback visible for a limited amount of time */

snapshots['Feedback should be able to specify the feedback message'] =
  `<cds-copy
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
/* end snapshot Feedback should be able to specify the feedback message */

snapshots[
  'Feedback should allow users to override default feedback timeout via prop'
] = `<cds-copy
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
/* end snapshot Feedback should allow users to override default feedback timeout via prop */

snapshots['CopyButton should add extra classes via passed button-class-name'] =
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
/* end snapshot CopyButton should add extra classes via passed button-class-name */
