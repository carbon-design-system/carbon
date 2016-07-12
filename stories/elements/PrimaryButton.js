import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import PrimaryButton from '../../elements/PrimaryButton';

storiesOf('PrimaryButton', module)
  .add('button', () => (
    <PrimaryButton className="user-prodvided-class">Primary Button</PrimaryButton>
  ))
  .add('link', () => (
    <PrimaryButton href="#" className="link">Primary Link</PrimaryButton>
  ))
  .add('disabled', () => (
    <PrimaryButton disabled={true}>Disabled</PrimaryButton>
  ))
