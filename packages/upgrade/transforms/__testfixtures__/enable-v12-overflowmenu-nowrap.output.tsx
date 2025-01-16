import React from 'react';
import { FeatureFlags } from '@carbon/feature-flags';
import type { FC } from 'react';
import {
  MenuItem,
  MenuItemDivider,
  OverflowMenu,
  OverflowMenuItem,
} from '@carbon/react';

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
      {/* Old API usage - mapped items */}
      <OverflowMenu aria-label="mapped-menu">
        {items.map((item) => (
          <OverflowMenuItem
            key={item.id}
            itemText={item.label}
            onClick={item.action}
          />
        ))}
      </OverflowMenu>
      {/* Old API - explicit props */}
      <OverflowMenu direction="top" size="lg" flipped={true}>
        <MenuItemDivider />
        <MenuItem kind="danger" label="TypeScript Item" />
      </OverflowMenu>
    </div>
  );
};

export default TestComponent;
