import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import RadioButton from '../../elements/RadioButton';

const radioProps = {
  className: 'some-class',
};

storiesOf('RadioButton', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addWithInfo(
    'radio button',
    () => (
      <RadioButton
        name="test"
        onChange={action('onChange')}
        value="standard"
        labelText="Standard Radio Button"
        id="radio-1"
        {...radioProps}
      />
    )
  )
  .addWithInfo('disabled', () => (
    <RadioButton
      name="test-2"
      value="disabled"
      labelText="Disabled Radio Button"
      id="radio-2"
      disabled
      {...radioProps}
    />
  ));
