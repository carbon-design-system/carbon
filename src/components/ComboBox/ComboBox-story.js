import React from 'react';
import { storiesOf, action } from '@storybook/react';
import ComboBox from '../ComboBox';

const items = [
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3',
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
];

storiesOf('ComboBox', module)
  .addWithInfo(
    'default',
    `
    ComboBox
  `,
    () => (
      <div style={{ width: 300 }}>
        <ComboBox
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - ComboBox')}
          placeholder="Filter..."
        />
      </div>
    )
  )
  .addWithInfo(
    'disabled',
    `
    Disabled ComboBox
  `,
    () => (
      <div style={{ width: 300 }}>
        <ComboBox
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - ComboBox')}
          placeholder="Filter..."
          disabled
        />
      </div>
    )
  );
