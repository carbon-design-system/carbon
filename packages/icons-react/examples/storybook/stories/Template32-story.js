import React from 'react';
import { storiesOf } from '@storybook/react';
import Template32 from '../../../es/template/32.js';

storiesOf('Template32', module)
  .add('default', () => <Template32 />)
  .add('with accessibility label', () => (
    <Template32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Template32 aria-label="Icon label">
      <title>Icon title</title>
    </Template32>
  ));
