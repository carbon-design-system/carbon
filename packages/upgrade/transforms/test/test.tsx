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
      {/* Basic OverflowMenu */}
      <OverflowMenu aria-label="menu-1">
        <OverflowMenuItem itemText="Option 1" />
        <OverflowMenuItem
          hasDivider
          isDelete
          itemText="Delete"
          disabled
          onClick={() => {}}
          className="custom"
          wrapperClassName="wrapper"
        />
      </OverflowMenu>

      {/* With spread props */}
      <OverflowMenu
        {...{
          'aria-label': 'spread-menu',
          direction: 'top',
          size: 'lg',
        }}>
        <OverflowMenuItem itemText="Spread Option" />
      </OverflowMenu>

      {/* Mapped items */}
      <OverflowMenu aria-label="mapped-menu">
        {items.map((item) => (
          <OverflowMenuItem
            key={item.id}
            itemText={item.label}
            onClick={item.action}
          />
        ))}
      </OverflowMenu>
    </div>
  );
};

export default TestComponent;
