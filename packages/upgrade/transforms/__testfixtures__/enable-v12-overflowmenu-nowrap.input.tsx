//prettier-ignore
import React from 'react';
import type { FC } from 'react';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';

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
        <OverflowMenuItem hasDivider isDelete itemText="TypeScript Item" />
      </OverflowMenu>
    </div>
  );
};

export default TestComponent;
