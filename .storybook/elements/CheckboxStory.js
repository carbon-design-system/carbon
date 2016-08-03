import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import Checkbox from '../../elements/Checkbox';

const checkboxEvents = {
  onBlur: () => { console.log('blur')},
  onClick: () => { console.log('click')},
  onFocus: () => { console.log('focus')},
  className: 'some-class',
  labelText: 'Checkbox',
  id: 'checkbox-1',
};

storiesOf('Checkbox', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('enabled checked', () => (
    <Checkbox checked {...checkboxEvents} />
  ))
  .add('enabled unchecked', () => (
    <Checkbox {...checkboxEvents} />
  ))
  .add('disabled unchecked', () => (
    <Checkbox disabled {...checkboxEvents} />
  ));
