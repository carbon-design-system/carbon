import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
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

const types = {
  default: 'Default (default)',
  inline: 'Inline (inline)',
};

const props = () => ({
  type: select('Dropdown type (type)', types, 'default'),
  label: text('Label (label)', 'Label'),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
});

storiesOf('DropdownV2', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withInfo({
      text: 'DropdownV2',
    })(() => (
      <div style={{ width: 300 }}>
        <DropdownV2
          {...props()}
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
        />
      </div>
    ))
  )
  .add(
    'fully controlled',
    withInfo({
      text: `
        Sometimes you want to control everything.
      `,
    })(() => (
      <WithState initialState={{ selectedItem: items[0] }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <DropdownV2
              {...props()}
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
    ))
  )
  .add(
    'skeleton',
    withInfo({
      text: `
        Placeholder skeleton state to use when content is loading.
      `,
    })(() => (
      <div style={{ width: 300 }}>
        <DropdownSkeleton />&nbsp;
        <DropdownSkeleton inline />
      </div>
    ))
  );
