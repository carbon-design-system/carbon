import React from 'react';
import { action } from '@storybook/addon-actions';
import { InlineNotification } from '../Notification';

import {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuRadioGroup,
  MenuSelectableItem,
} from '../Menu';

const InfoBanner = () => (
  <InlineNotification
    kind="info"
    title="Experimental component"
    subtitle="This component is considered experimental. Its API may change until the stable version is released."
    lowContrast
    hideCloseButton
  />
);

// eslint-disable-next-line react/prop-types
export const StoryFrame = ({ children }) => (
  <div style={{ height: 'calc(100vh - 6.25rem)' }}>
    <InfoBanner />
    {children}
  </div>
);

function renderItem(item, i) {
  switch (item.type) {
    case 'item':
      return (
        <MenuItem
          key={i}
          label={item.label}
          shortcut={item.shortcut}
          disabled={item.disabled}
          kind={item.kind}
          onClick={!item.children ? action('onClick') : null}>
          {item.children && item.children.map(renderItem)}
        </MenuItem>
      );
    case 'divider':
      return <MenuDivider key={i} />;
    case 'selectable':
      return (
        <MenuSelectableItem
          key={i}
          label={item.label}
          initialChecked={item.initialChecked}
          onChange={action('onChange')}
        />
      );
    case 'radiogroup':
      return (
        <MenuRadioGroup
          key={i}
          label={item.label}
          items={item.items}
          initialSelectedItem={item.initialSelectedItem}
          onChange={action('onChange')}
        />
      );
    case 'group':
      return (
        <MenuGroup key={i} label={item.label}>
          {item.children && item.children.map(renderItem)}
        </MenuGroup>
      );
  }
}

export const buildMenu = (items) => items.map(renderItem);
