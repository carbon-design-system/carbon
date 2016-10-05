import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import Select from '../../elements/Select';
import SelectItem from '../../elements/SelectItem';

const selectProps = {
  onBlur: () => { action('blur'); }, // eslint-disable-line no-console
  onClick: () => { action('click'); }, // eslint-disable-line no-console
  onFocus: () => { action('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { action('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { action('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { action('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { action('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('Select', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('select', () => (
    <Select
      {...selectProps}
      onChange={action('onChange')} // eslint-disable-line no-console
      id="select-1"
      defaultValue="placeholder-item"
    >
      <SelectItem disabled hidden value="placeholder-item" text="Pick an option" />
      <SelectItem value="option-1" text="Option 1" />
      <SelectItem value="option-2" text="Option 2" />
      <SelectItem value="option-3" text="Option 3" />
    </Select>
  ))
  .add('disabled', () => (
    <Select disabled {...selectProps}>
      <SelectItem disabled hidden value="placeholder-item" text="Pick an option" />
      <SelectItem value="option-1" text="Option 1" />
      <SelectItem value="option-2" text="Option 2" />
      <SelectItem value="option-3" text="Option 3" />
    </Select>
  ));
