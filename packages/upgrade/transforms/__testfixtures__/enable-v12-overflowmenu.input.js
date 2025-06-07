//prettier-ignore
import React from 'react';
import { OverflowMenu, OverflowMenuItem, Button } from '@carbon/react';

function TestComponent({ menuProps }) {
  return (
    <div>
      {/* Old API usage - with explicit props */}
      <OverflowMenu
        aria-label="overflow-menu"
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
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu label="Already migrated">
          <MenuItem label="Option 1" />
          <MenuItemDivider />
          <MenuItem label="Delete" kind="danger" />
        </OverflowMenu>
      </FeatureFlags>

      {/* Other components - should not be transformed */}
      <Button>Normal button</Button>
    </div>
  );
}

export default TestComponent;
