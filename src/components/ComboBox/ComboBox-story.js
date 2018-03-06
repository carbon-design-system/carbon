import React from 'react';
import { storiesOf, action } from '@storybook/react';
import ComboBox from '../ComboBox';
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
  )
  .addWithInfo(
    'custom text input handling',
    `Sometimes you want to perform an async action to trigger a backend call on input change.`,
    () => (
      <WithState initialState={{ inputText: '' }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <ComboBox
              items={items}
              itemToString={item =>
                item ? `${item.text} queried with ${state.inputText}` : ''
              }
              onChange={action('onChange - ComboBox')}
              placeholder="Filter..."
              shouldFilterItem={() => true}
              onInputChange={text => setState({ inputText: text })}
            />
          </div>
        )}
      </WithState>
    )
  );
