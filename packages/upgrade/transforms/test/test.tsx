import React from 'react';
import type { FC } from 'react';
import {
  MenuItem,
  MenuItemDivider,
  OverflowMenu,
  OverflowMenuItem,
} from '@carbon/react';
import { FeatureFlags } from '@carbon/feature-flags';

interface MenuItem {
  id: string;
  label: string;
  action?: () => void;
}

interface Props {
  items: MenuItem[];
}

const TestComponent: FC<Props> = ({ items }) => {
  return (
    <div>
      {/* Basic OverflowMenu */}
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu aria-label="menu-1">
          <MenuItem label="Option 1" />
          <MenuItemDivider />
          <MenuItem
            kind="danger"
            label="Delete"
            disabled
            onClick={() => {}}
            className="custom wrapper"
          />
        </OverflowMenu>
      </FeatureFlags>
      {/* With spread props */}
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu
          {...{
            'aria-label': 'spread-menu',
            direction: 'top',
            size: 'lg',
          }}>
          <MenuItem label="Spread Option" />
        </OverflowMenu>
      </FeatureFlags>
      {/* Already using new API in FeatureFlags */}
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu label="menu-2">
          <MenuItem label="New API 1" />
          <MenuItem label="New API 2" />
        </OverflowMenu>
      </FeatureFlags>
      {/* Mapped items */}
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu aria-label="mapped-menu">
          {items.map((item) => (
            <OverflowMenuItem
              key={item.id}
              itemText={item.label}
              onClick={item.action}
            />
          ))}
        </OverflowMenu>
      </FeatureFlags>
    </div>
  );
};

export default TestComponent;
