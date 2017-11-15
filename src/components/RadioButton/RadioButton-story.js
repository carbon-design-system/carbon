import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RadioButton from '../RadioButton';

const radioProps = {
  className: 'some-class',
};

storiesOf('RadioButton', module)
  .addWithInfo(
    'enabled',
    `
      Radio buttons are used when a list of two or more options are mutually exclusive,
      meaning the user must select only one option. The example below shows how the Radio Button component
      can be used as an uncontrolled component that is initially checked by setting the defaultChecked property
      to true. To use the component in a controlled way, set the checked property instead.
    `,
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
  .addWithInfo(
    'disabled',
    `
      Radio buttons are used when a list of two or more options are mutually exclusive,
      meaning the user must select only one option. The example below shows a disabled Radio Button component.
    `,
    () => (
      <RadioButton
        name="test-2"
        value="disabled"
        labelText="Disabled Radio Button"
        id="radio-2"
        disabled
        {...radioProps}
      />
    )
  );
