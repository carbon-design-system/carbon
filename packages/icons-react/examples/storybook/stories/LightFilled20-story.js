import React from 'react';
import { storiesOf } from '@storybook/react';
import LightFilled20 from '../../../es/light--filled/20.js';

storiesOf('LightFilled20', module)
  .add('default', () => <LightFilled20 />)
  .add('with accessibility label', () => (
    <LightFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LightFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </LightFilled20>
  ));
