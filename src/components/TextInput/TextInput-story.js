import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import TextInput from '../TextInput';
import TextInputSkeleton from '../TextInput/TextInput.Skeleton';

const types = {
  '': 'None',
  email: 'For email (email)',
  password: 'For password (password)',
};

const TextInputProps = () => ({
  className: 'some-class',
  id: 'test2',
  labelText: text('Label text (labelText)', 'Text Input label'),
  type: select('Form control type (type)', types, ''),
  placeholder: text('Placeholder text (placeholder)', 'Placeholder text'),
  light: boolean('Light variant (light)', false),
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('No label (hideLabel)', false),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Form validation UI content (invalidText)',
    'A valid value is required'
  ),
  helperText: text('Helper text (helperText)', 'Optional helper text.'),
  onClick: action('onClick'),
  onChange: action('onChange'),
});

storiesOf('TextInput', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    withInfo({
      text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
    })(() => <TextInput {...TextInputProps()} />)
  )
  .add(
    'skeleton',
    withInfo({
      text: `
        Placeholder skeleton state to use when content is loading.
        `,
    })(() => (
      <div>
        <TextInputSkeleton />
        <br />
        <TextInputSkeleton hideLabel />
      </div>
    ))
  );
