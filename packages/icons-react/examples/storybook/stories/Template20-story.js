import React from 'react';
import { storiesOf } from '@storybook/react';
import Template20 from '../../../es/template/20.js';

storiesOf('Template20', module)
  .add('default', () => <Template20 />)
  .add('with accessibility label', () => (
    <Template20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Template20 aria-label="Icon label">
      <title>Icon title</title>
    </Template20>
  ));
