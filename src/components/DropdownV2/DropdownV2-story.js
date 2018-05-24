import React from 'react';
import { storiesOf, action } from '@storybook/react';
import DropdownV2 from '../DropdownV2';
import DropdownSkeleton from '../DropdownV2/Dropdown.Skeleton';
import WithState from '../../tools/withState';

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

storiesOf('DropdownV2', module)
  .addWithInfo(
    'default',
    `
    DropdownV2
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .addWithInfo(
    'inline',
    `
    Disabled DropdownV2
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          type="inline"
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .addWithInfo(
    'disabled',
    `
    Disabled DropdownV2
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
          disabled
        />
      </div>
    )
  )
  .addWithInfo(
    'disabled - inline',
    `
    Disabled Inline DropdownV2
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          type="inline"
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
          disabled
        />
      </div>
    )
  )
  .addWithInfo(
    'fully controlled',
    `
    Sometimes you want to control everything.
  `,
    () => (
      <WithState initialState={{ selectedItem: items[0] }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <DropdownV2
              type="inline"
              label="Label"
              items={items}
              itemToString={item => (item ? item.text : '')}
              onChange={({ selectedItem }) =>
                setTimeout(() => setState({ selectedItem }), 1000)
              }
              selectedItem={state.selectedItem}
            />
          </div>
        )}
      </WithState>
    )
  )
  .addWithInfo(
    'light',
    `
    DropdownV2
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          light
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .addWithInfo(
    'skeleton',
    `
    Placeholder skeleton state to use when content is loading.
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownSkeleton />&nbsp;
        <DropdownSkeleton inline />
      </div>
    )
  );
