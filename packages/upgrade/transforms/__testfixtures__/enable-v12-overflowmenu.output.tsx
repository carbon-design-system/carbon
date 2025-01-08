import React from 'react';
import { FeatureFlags } from '@carbon/feature-flags';
import type { FC } from 'react';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';

interface MenuItem {
  id: string;
  label: string;
}

interface Props {
  items: MenuItem[];
}

const TestComponent: FC<Props> = ({ items }) => {
  return (
    <div>
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu>
          {items.map((item) => (
            <OverflowMenuItem key={item.id}>{item.label}</OverflowMenuItem>
          ))}
        </OverflowMenu>
      </FeatureFlags>
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu direction="top" size="lg">
          <OverflowMenuItem>TypeScript Item</OverflowMenuItem>
        </OverflowMenu>
      </FeatureFlags>
    </div>
  );
};

export default TestComponent;
