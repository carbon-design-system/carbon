/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
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

const props = () => ({
  disabled: boolean('Disabled (disabled)', false),
  placeholder: text('Placeholder text (placeholder)', 'Filter...'),
  onChange: action('onChange'),
});

storiesOf('ComboBox', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <div style={{ width: 300 }}>
        <ComboBox
          items={items}
          itemToString={item => (item ? item.text : '')}
          {...props()}
        />
      </div>
    ),
    {
      info: {
        text: 'ComboBox',
      },
    }
  )
  .add(
    'custom text input handling',
    () => (
      <WithState initialState={{ inputText: '' }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <ComboBox
              items={items}
              itemToString={item =>
                item ? `${item.text} queried with ${state.inputText}` : ''
              }
              shouldFilterItem={() => true}
              onInputChange={text => setState({ inputText: text })}
              {...props()}
            />
          </div>
        )}
      </WithState>
    ),
    {
      info: {
        text: `Sometimes you want to perform an async action to trigger a backend call on input change.`,
      },
    }
  );
