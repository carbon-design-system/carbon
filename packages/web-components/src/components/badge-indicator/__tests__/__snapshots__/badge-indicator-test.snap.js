/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['cds-badge-indicator should render'] =
  `<cds-badge-indicator slot="badge-indicator">
</cds-badge-indicator>
`;
/* end snapshot cds-badge-indicator should render */

snapshots['cds-badge-indicator should set a count'] = `<cds-badge-indicator
  count="3"
  slot="badge-indicator"
>
</cds-badge-indicator>
`;
/* end snapshot cds-badge-indicator should set a count */

snapshots['cds-badge-indicator should truncate the count over 999'] =
  `<cds-badge-indicator
  count="2342"
  slot="badge-indicator"
>
</cds-badge-indicator>
`;
/* end snapshot cds-badge-indicator should truncate the count over 999 */

snapshots['cds-badge-indicator should have the default slot value'] =
  `<cds-badge-indicator slot="badge-indicator">
</cds-badge-indicator>
`;
/* end snapshot cds-badge-indicator should have the default slot value */
