import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextInput from '../TextInput';
import TextInputSkeleton from '../TextInput/TextInput.Skeleton';

const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Text Input label',
  onClick: action('onClick'),
  onChange: action('onChange'),
  placeholder: 'Placeholder text',
};

const introText = `
  Text fields enable the user to interact with and input data. A single line
  field is used when the input anticipated by the user is a single line of
  text as opposed to a paragraph.
`;

storiesOf('TextInput', module)
  .addWithInfo(
    'enabled',
    `
      ${introText}
      The example below shows an enabled Text Input component. The default type is 'text' and its
      value can be either 'string' or 'number'.
    `,
    () => <TextInput {...TextInputProps} />
  )
  .addWithInfo(
    'disabled',
    `
      ${introText}
      The example below shows a disabled Text Input component.
    `,
    () => <TextInput disabled {...TextInputProps} />
  )
  .addWithInfo(
    'email',
    `
      ${introText}
      The example below shows an enabled Text Input component with type 'email'.
    `,
    () => (
      <TextInput
        {...TextInputProps}
        type={'email'}
        placeholder={'Please enter an email'}
      />
    )
  )
  .addWithInfo(
    'password',
    `
      ${introText}
      The example below shows an enabled Text Input component with type 'password'.
    `,
    () => (
      <TextInput
        {...TextInputProps}
        type={'password'}
        placeholder={'Please enter a password'}
      />
    )
  )
  .addWithInfo(
    'invalid',
    `
      ${introText}
      The example below shows an invalid entry in the Text Input.
    `,
    () => (
      <TextInput
        {...TextInputProps}
        invalid={true}
        invalidText={'A valid value is required'}
      />
    )
  )
  .addWithInfo(
    'no Label',
    `
      ${introText}
      The example below shows an Text Input with a hidden Label.  Use this property to hide the label visually but still preserve accessibility.
    `,
    () => <TextInput {...TextInputProps} hideLabel={true} />
  )
  .addWithInfo(
    'light',
    `
      ${introText}
      The example below shows an enabled Text Input component. The default type is 'text' and its
      value can be either 'string' or 'number'.
    `,
    () => <TextInput light {...TextInputProps} />
  )
  .addWithInfo(
    'skeleton',
    `
    Placeholder skeleton state to use when content is loading.
    `,
    () => (
      <div>
        <TextInputSkeleton />
        <TextInputSkeleton hideLabel />
      </div>
    )
  );
