import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Select from '../Select';
import SelectItem from '../SelectItem';
import SelectItemGroup from '../SelectItemGroup';

const selectProps = {
  onChange: action('onChange'),
  className: 'some-class',
};

storiesOf('Select', module)
  .addWithInfo(
    'enabled',
    `
      Select dropdowns display a list below its title when selected. They are used primarily in forms,
      where a user chooses one option from a list. Once the user selects an item, the dropdown will
      dissapear and the field will reflect the user's choice. Create Select Item components for each
      option in the list. The example below shows an enabled Select component with three items.
    `,
    () =>
      <Select {...selectProps} id="select-1" defaultValue="placeholder-item">
        <SelectItem disabled hidden value="placeholder-item" text="Pick an option" />
        <SelectItemGroup label="Starter">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </SelectItemGroup>
        <SelectItemGroup label="Advanced">
          <SelectItem value="option-3" text="Option 3" />
        </SelectItemGroup>
      </Select>
  )
  .addWithInfo(
    'inline',
    `
      Inline select is for use when there will be multiple elements in a row
    `,
    () =>
      <Select {...selectProps} inline id="select-1" defaultValue="placeholder-item">
        <SelectItem disabled hidden value="placeholder-item" text="Pick an option" />
        <SelectItemGroup label="Starter">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </SelectItemGroup>
        <SelectItemGroup label="Advanced">
          <SelectItem value="option-3" text="Option 3" />
        </SelectItemGroup>
      </Select>
  )
  .addWithInfo(
    'disabled',
    `
      Select dropdowns display a list below its title when selected. They are used primarily in forms,
      where a user chooses one option from a list. Once the user selects an item, the dropdown will
      dissapear and the field will reflect the user's choice. Create SelectItem components for each
      option in the list. The example below shows an disabled Select component.
    `,
    () =>
      <Select disabled {...selectProps} id="select-2">
        <SelectItem disabled hidden value="placeholder-item" text="Pick an option" />
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
        <SelectItem value="option-3" text="Option 3" />
      </Select>
  )
  .addWithInfo(
    'no label',
    `
      Select dropdowns display a list below its title when selected. They are used primarily in forms,
      where a user chooses one option from a list. Once the user selects an item, the dropdown will
      dissapear and the field will reflect the user's choice. Create SelectItem components for each
      option in the list. The example below shows a Select component without a label.
    `,
    () =>
      <Select {...selectProps} id="select-3" defaultValue="placeholder-item" hideLabel>
        <SelectItem disabled hidden value="placeholder-item" text="Pick an option" />
        <SelectItemGroup label="Starter">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </SelectItemGroup>
        <SelectItemGroup label="Advanced">
          <SelectItem value="option-3" text="Option 3" />
        </SelectItemGroup>
      </Select>
  );
