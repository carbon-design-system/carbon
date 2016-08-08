import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import Select from '../../elements/Select';
import SelectItem from '../../internal/SelectItem';

const selectProps = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('Select', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('select', () => (
    <Select {...selectProps} id="select-1" labelText="Select">
      <SelectItem disabled hidden value="placeholder-item" selectItemText="Pick an option" />
      <SelectItem value="option-1" selectItemText="Option 1" />
      <SelectItem value="option-2" selectItemText="Option 2" />
      <SelectItem value="option-3" selectItemText="Option 3" />
    </Select>
  ))
  .add('disabled', () => (
    <Select disabled {...selectProps}>
      <SelectItem disabled hidden value="placeholder-item" selectItemText="Pick an option" />
      <SelectItem value="option-1" selectItemText="Option 1" />
      <SelectItem value="option-2" selectItemText="Option 2" />
      <SelectItem value="option-3" selectItemText="Option 3" />
    </Select>
  ));
