import React from 'react';
import { storiesOf } from '@storybook/react';
import LightFilled24 from '../../../es/light--filled/24.js';

storiesOf('LightFilled24', module)
  .add('default', () => <LightFilled24 />)
  .add('with accessibility label', () => (
    <LightFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LightFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </LightFilled24>
  ));
