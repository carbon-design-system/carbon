import React from 'react';
import { storiesOf } from '@storybook/react';
import Maximize20 from '../../../es/maximize/20.js';

storiesOf('Maximize20', module)
  .add('default', () => <Maximize20 />)
  .add('with accessibility label', () => (
    <Maximize20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Maximize20 aria-label="Icon label">
      <title>Icon title</title>
    </Maximize20>
  ));
