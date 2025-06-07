//prettier-ignore
import React from 'react';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';

function TestComponent({ menuProps }) {
  return (
    <div>
      {/* Old API usage - with explicit props */}
      <OverflowMenu
        aria-label="overflow-menu"
        align="bottom"
        flipped={true}
        light={true}
        size="xl">
        <OverflowMenuItem
          className="test-class"
          itemText="Stop app"
          disabled={false}
          onClick={() => {}}
        />
        <OverflowMenuItem itemText="Restart app" />
        <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
      </OverflowMenu>

      {/* Old API with spread props */}
      <OverflowMenu {...menuProps}>
        <OverflowMenuItem itemText="Dynamic item" />
        <OverflowMenuItem hasDivider isDelete itemText="Remove" />
      </OverflowMenu>

      {/* Already using new API - should not be transformed */}
      <OverflowMenu label="Already migrated">
        <MenuItem label="Option 1" />
        <MenuItemDivider />
        <MenuItem label="Delete" kind="danger" />
      </OverflowMenu>
    </div>
  );
}

export default TestComponent;
