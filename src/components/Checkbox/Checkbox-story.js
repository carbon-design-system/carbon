import React from 'react';
import { storiesOf, action } from '@storybook/react';
import Checkbox from '../Checkbox';

const checkboxEvents = {
  className: 'some-class',
  onChange: action('onChange'),
};

storiesOf('Checkbox', module)
  .addWithInfo(
    'enabled checked',
    `
      Checkboxes are used when there is a list of options and the user may select multiple options, including all or none.
      The example below shows how the Checkbox component can be used as an uncontrolled component that is initially checked
      by setting the defaultChecked property to true. To use the component in a controlled way, you should set the
      checked property instead.
    `,
    () => (
      <fieldset className="bx--fieldset">
        <legend className="bx--label">Favorite Colors</legend>
        <Checkbox defaultChecked {...checkboxEvents} id="red" labelText="Red" />
        <Checkbox defaultChecked {...checkboxEvents} id="blue" labelText="Blue" />
      </fieldset>
    ),
  )
  .addWithInfo(
    'enabled unchecked',
    `
      Checkboxes are used when there is a list of options and the user may select multiple options, including all or none.
      The example below shows how the Checkbox component can be used as an uncontrolled component that is initially
      unchecked. To use the component in a controlled way, you should set the checked property instead.
    `,
    () => (
      <fieldset className="bx--fieldset">
        <legend className="bx--label">Favorite Colors</legend>
        <Checkbox {...checkboxEvents} id="red" labelText="Red" />
        <Checkbox {...checkboxEvents} id="blue" labelText="Blue" />
      </fieldset>
    )
  )
  .addWithInfo(
    'disabled',
    `
      Checkboxes are used when there is a list of options and the user may select multiple options, including all or none.
      The example below shows a disabled Checkbox component.
    `,
    () => (
      <fieldset disabled className="bx--fieldset">
        <legend className="bx--label">Favorite Colors</legend>
        <Checkbox {...checkboxEvents} id="red" labelText="Red" />
        <Checkbox {...checkboxEvents} id="blue" labelText="Blue" />
      </fieldset>
  ));
