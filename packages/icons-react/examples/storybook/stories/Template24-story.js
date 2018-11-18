import React from 'react';
import { storiesOf } from '@storybook/react';
import Template24 from '../../../es/template/24.js';

storiesOf('Template24', module)
  .add('default', () => <Template24 />)
  .add('with accessibility label', () => (
    <Template24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Template24 aria-label="Icon label">
      <title>Icon title</title>
    </Template24>
  ));
