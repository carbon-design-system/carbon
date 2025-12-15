/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['cds-menu-button should render and match snapshot'] =
  `<cds-menu-button
  kind="primary"
  label="Actions"
  menu-alignment="bottom"
  size="lg"
  tab-index="0"
>
  <cds-menu
    size="lg"
    style="inset-inline-start: 8px; inset-inline-end: initial; inset-block-start: 8px;"
  >
    <cds-menu-item
      label="First action"
      role="menuitem"
      tabindex="0"
    >
    </cds-menu-item>
    <cds-menu-item
      label="Second action"
      role="menuitem"
      tabindex="0"
    >
    </cds-menu-item>
    <cds-menu-item
      aria-disabled="true"
      disabled=""
      label="Third action"
      role="menuitem"
      tabindex="-1"
    >
    </cds-menu-item>
  </cds-menu>
</cds-menu-button>
`;
/* end snapshot cds-menu-button should render and match snapshot */

snapshots[
  'cds-menu-button Children/slots and special menu content Snapshot variants should render with divider and danger and match snapshot'
] = `<cds-menu-button
  kind="primary"
  label="Test"
  menu-alignment="bottom"
  size="lg"
  tab-index="0"
>
  <cds-menu
    size="lg"
    style="inset-inline-start: 8px; inset-inline-end: initial; inset-block-start: 8px;"
  >
    <cds-menu-item
      label="First action"
      role="menuitem"
      tabindex="0"
    >
    </cds-menu-item>
    <cds-menu-item-divider role="separator">
    </cds-menu-item-divider>
    <cds-menu-item
      class="cds--menu-item--danger"
      kind="danger"
      label="Danger"
      role="menuitem"
      tabindex="0"
    >
    </cds-menu-item>
  </cds-menu>
</cds-menu-button>
`;
/* end snapshot cds-menu-button Children/slots and special menu content Snapshot variants should render with divider and danger and match snapshot */

snapshots[
  'cds-menu-button Children/slots and special menu content Snapshot variants should render with nested menu and match snapshot'
] = `<cds-menu-button
  kind="primary"
  label="Nested"
  menu-alignment="bottom"
  size="lg"
  tab-index="0"
>
  <cds-menu
    size="lg"
    style="inset-inline-start: 8px; inset-inline-end: initial; inset-block-start: 8px;"
  >
    <cds-menu-item
      aria-expanded="true"
      aria-haspopup="true"
      label="Export as"
      role="menuitem"
      tabindex="0"
    >
      <cds-menu-item-group slot="submenu">
        <cds-menu-item
          label="PDF"
          role="menuitem"
          tabindex="0"
        >
        </cds-menu-item>
      </cds-menu-item-group>
    </cds-menu-item>
  </cds-menu>
</cds-menu-button>
`;
/* end snapshot cds-menu-button Children/slots and special menu content Snapshot variants should render with nested menu and match snapshot */

snapshots['cds-menu-button should support xs size'] = `<cds-button
  has-main-content=""
  kind="primary"
  size="xs"
  tab-index="0"
  tooltip-alignment=""
  tooltip-position="top"
  type="button"
>
  Actions
</cds-button>
<slot>
</slot>
`;
/* end snapshot cds-menu-button should support xs size */
snapshots['cds-menu-button should render and match snapshot'] =
  `<cds-menu-button
  kind="primary"
  label="Actions"
  menu-alignment="bottom"
  menu-background-token="layer"
  size="lg"
  tab-index="0"
>
  <cds-menu
    size="lg"
    style="inset-inline-start: 8px; inset-inline-end: initial; inset-block-start: 8px;"
  >
    <cds-menu-item
      label="First action"
      role="menuitem"
      tabindex="0"
    >
    </cds-menu-item>
    <cds-menu-item
      label="Second action"
      role="menuitem"
      tabindex="0"
    >
    </cds-menu-item>
    <cds-menu-item
      aria-disabled="true"
      disabled=""
      label="Third action"
      role="menuitem"
      tabindex="-1"
    >
    </cds-menu-item>
  </cds-menu>
</cds-menu-button>
`;
/* end snapshot cds-menu-button should render and match snapshot */

snapshots[
  'cds-menu-button Children/slots and special menu content Snapshot variants should render with divider and danger and match snapshot'
] = `<cds-menu-button
  kind="primary"
  label="Test"
  menu-alignment="bottom"
  menu-background-token="layer"
  size="lg"
  tab-index="0"
>
  <cds-menu
    size="lg"
    style="inset-inline-start: 8px; inset-inline-end: initial; inset-block-start: 8px;"
  >
    <cds-menu-item
      label="First action"
      role="menuitem"
      tabindex="0"
    >
    </cds-menu-item>
    <cds-menu-item-divider role="separator">
    </cds-menu-item-divider>
    <cds-menu-item
      class="cds--menu-item--danger"
      kind="danger"
      label="Danger"
      role="menuitem"
      tabindex="0"
    >
    </cds-menu-item>
  </cds-menu>
</cds-menu-button>
`;
/* end snapshot cds-menu-button Children/slots and special menu content Snapshot variants should render with divider and danger and match snapshot */

snapshots[
  'cds-menu-button Children/slots and special menu content Snapshot variants should render with nested menu and match snapshot'
] = `<cds-menu-button
  kind="primary"
  label="Nested"
  menu-alignment="bottom"
  menu-background-token="layer"
  size="lg"
  tab-index="0"
>
  <cds-menu
    size="lg"
    style="inset-inline-start: 8px; inset-inline-end: initial; inset-block-start: 8px;"
  >
    <cds-menu-item
      aria-expanded="true"
      aria-haspopup="true"
      label="Export as"
      role="menuitem"
      tabindex="0"
    >
      <cds-menu-item-group slot="submenu">
        <cds-menu-item
          label="PDF"
          role="menuitem"
          tabindex="0"
        >
        </cds-menu-item>
      </cds-menu-item-group>
    </cds-menu-item>
  </cds-menu>
</cds-menu-button>
`;
/* end snapshot cds-menu-button Children/slots and special menu content Snapshot variants should render with nested menu and match snapshot */
