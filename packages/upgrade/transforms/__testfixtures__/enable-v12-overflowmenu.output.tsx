//prettier-ignore
import React from 'react';
import { FeatureFlags } from '@carbon/feature-flags';
import type { FC } from 'react';
import { MenuItem, MenuItemDivider, OverflowMenu, OverflowMenuItem } from '@carbon/react';

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
    (<div>
      {/* Old API usage - mapped items */}
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
      {/* Old API - explicit props */}
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu direction="top" size="lg" flipped={true}>
          <MenuItemDivider /><MenuItem kind='danger' label="TypeScript Item" />
        </OverflowMenu>
      </FeatureFlags>
    </div>)
  );
};

export default TestComponent;
