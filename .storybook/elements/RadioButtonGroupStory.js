import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import RadioButtonGroup from '../../elements/RadioButtonGroup';
import RadioButton from '../../elements/RadioButton';

const radioProps = {
  className: 'some-class',
};

storiesOf('RadioButtonGroup', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addWithInfo(
    'radio button group',
    `
       The example below shows a RadioButtonGroup component with a default selected RadioButton.
       Although you can set the checked prop on the RadioButton, when using the RadioButton component as a child of the RadioButtonGroup,
       either set the defaultSelected or valueSelected which will automatically set the selected prop on the corresponding RadioButton component.

       Use defaultSelected when you want a radio button to be selected initially, but don't need to set it at a later time. If you do need to set
       it dynamically at a later time, then use the valueSelected property instead.
    `,
    () => (
      <RadioButtonGroup
        onChange={action('onChange')}
        name="radio-button-group"
        defaultSelected="default-selected"
      >
        <RadioButton
          value="standard"
          id="radio-1"
          labelText="Standard Radio Button"
          {...radioProps}
        />
        <RadioButton
          value="default-selected"
          labelText="Default Selected Radio Button"
          id="radio-2"
          {...radioProps}
        />
        <RadioButton
          value="disabled"
          labelText="Disabled Radio Button"
          id="radio-3"
          disabled
          {...radioProps}
        />
      </RadioButtonGroup>
    ),
  );
