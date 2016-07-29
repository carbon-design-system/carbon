import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import Textarea from '../../elements/Textarea';

const textareaProps = {
  children: 'This is a Label',
  className: 'some-class',
  onBlur: () => { console.log('Blur'); },
  onChange: () => { console.log('Changed'); },
  onClick: () => { console.log('Clicked'); },
  onFocus: () => { console.log('Focus'); },
  placeholder: 'Hint text here',
  name: 'myTextarea',
  id: 'test2',
  cols: 50,
  rows: 4,
};

storiesOf('Textarea', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('enabled', () => (
    <Textarea {...textareaProps} />
  ))
  .add('disabled', () => (
    <Textarea disabled {...textareaProps} placeholder={'Disabled'} />
  ));

