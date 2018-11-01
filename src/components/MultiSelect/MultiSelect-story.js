import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import MultiSelect from '../MultiSelect';

const items = [
  {
    id: 'item-1',
    text: 'Item 1',
  },
  {
    id: 'item-2',
    text: 'Item 2',
  },
];

const defaultLabel = 'MultiSelect Label';
const defaultPlaceholder = 'Filter';

const types = {
  default: 'Default (default)',
  inline: 'Inline (inline)',
};

const props = () => ({
  filterable: boolean(
    'Filterable (`<MultiSelect.Filterable>` instead of `<MultiSelect>`)',
    false
  ),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  useTitleInItem: boolean('Show tooltip on hover', false),
  type: select('UI type (Only for `<MultiSelect>`) (type)', types, 'default'),
  label: text('Label (label)', defaultLabel),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Form validation UI content (invalidText)',
    'Invalid Selection'
  ),
  onChange: action('onChange'),
});

storiesOf('MultiSelect', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withInfo({
      text: `
        MultiSelect
      `,
    })(() => {
      const { filterable, ...multiSelectProps } = props();
      const ComponentToUse = !filterable ? MultiSelect : MultiSelect.Filterable;
      const placeholder = !filterable ? undefined : defaultPlaceholder;
      return (
        <div style={{ width: 300 }}>
          <ComponentToUse
            {...multiSelectProps}
            items={items}
            itemToString={item => (item ? item.text : '')}
            placeholder={placeholder}
          />
        </div>
      );
    })
  )
  .add(
    'with initial selected items',
    withInfo({
      text: `
        Provide a set of items to initially select in the control
      `,
    })(() => {
      const { filterable, ...multiSelectProps } = props();
      const ComponentToUse = !filterable ? MultiSelect : MultiSelect.Filterable;
      const placeholder = !filterable ? undefined : defaultPlaceholder;
      return (
        <div style={{ width: 300 }}>
          <ComponentToUse
            {...multiSelectProps}
            items={items}
            itemToString={item => (item ? item.text : '')}
            initialSelectedItems={[items[0], items[1]]}
            placeholder={placeholder}
          />
        </div>
      );
    })
  );
