import React from 'react';
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
      <OverflowMenu>
        {items.map((item) => (
          <OverflowMenuItem key={item.id}>{item.label}</OverflowMenuItem>
        ))}
      </OverflowMenu>

      <OverflowMenu direction="top" size="lg">
        <OverflowMenuItem>TypeScript Item</OverflowMenuItem>
      </OverflowMenu>
    </div>
  );
};

export default TestComponent;
