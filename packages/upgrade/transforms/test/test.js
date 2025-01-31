import React from 'react';
import { OverflowMenu, OverflowMenuItem, MenuItem } from '@carbon/react';
import { FeatureFlags } from '@carbon/feature-flags';

function TestComponent({ items, menuProps }) {
  return (
    <div>
      {/* Basic OverflowMenu */}
      <OverflowMenu aria-label="menu-1">
        <OverflowMenuItem itemText="Option 1" />
        <OverflowMenuItem
          hasDivider
          isDelete
          itemText="Delete"
          className="custom"
          wrapperClassName="wrapper"
          disabled
          onClick={() => {}}
        />
      </OverflowMenu>

      {/* With spread props */}
      <OverflowMenu {...menuProps}>
        <OverflowMenuItem itemText="Spread Option" />
      </OverflowMenu>

      {/* Already using new API in FeatureFlags */}
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu label="menu-2">
          <MenuItem label="New API 1" />
          <MenuItem label="New API 2" />
        </OverflowMenu>
      </FeatureFlags>
    </div>
  );
}

export default TestComponent;
