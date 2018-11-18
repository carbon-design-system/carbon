import React from 'react';
import { storiesOf } from '@storybook/react';
import LightFilled32 from '../../../es/light--filled/32.js';

storiesOf('LightFilled32', module)
  .add('default', () => <LightFilled32 />)
  .add('with accessibility label', () => (
    <LightFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LightFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </LightFilled32>
  ));
