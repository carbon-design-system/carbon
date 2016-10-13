import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import Textarea from '../../elements/TextArea';
import centered from '@kadira/react-storybook-decorator-centered';

const textareaProps = {
  children: 'This is a Label',
  className: 'some-class',
  onChange: action('onChange'),
  onClick: action('onClick'),
  placeholder: 'Hint text here',
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
  .addDecorator(centered)
  .add('enabled', () => (
    <Textarea {...textareaProps} />
  ))
  .add('disabled', () => (
    <Textarea disabled {...textareaProps} placeholder={'Disabled'} />
  ));
