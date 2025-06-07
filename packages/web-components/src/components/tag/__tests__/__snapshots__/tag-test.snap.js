/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['cds-tag should render'] = `<cds-tag
  open=""
  size="md"
  type="red"
>
  test-tag
</cds-tag>
`;
/* end snapshot cds-tag should render */

snapshots['cds-tag cds-dismissible-tag should render'] = `<cds-dismissible-tag
  open=""
  size="md"
  tag-title="Close tag"
  text="Tag content"
  type="gray"
>
</cds-dismissible-tag>
`;
/* end snapshot cds-tag cds-dismissible-tag should render */

snapshots['cds-tag cds-selectable-tag should render a selectable tag'] =
  `<cds-selectable-tag
  size="md"
  text="Tag content"
>
</cds-selectable-tag>
`;
/* end snapshot cds-tag cds-selectable-tag should render a selectable tag */

snapshots['cds-tag cds-skeleton-tag should render a skeleton state'] =
  `<cds-tag-skeleton size="sm">
</cds-tag-skeleton>
`;
/* end snapshot cds-tag cds-skeleton-tag should render a skeleton state */

snapshots['cds-tag cds-operational-tag should render a operational state'] =
  `<cds-operational-tag
  size="md"
  text="Tag content"
  type="red"
>
</cds-operational-tag>
`;
/* end snapshot cds-tag cds-operational-tag should render a operational state */
