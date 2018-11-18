import React from 'react';
import { storiesOf } from '@storybook/react';
import Identification20 from '../../../es/identification/20.js';

storiesOf('Identification20', module)
  .add('default', () => <Identification20 />)
  .add('with accessibility label', () => (
    <Identification20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Identification20 aria-label="Icon label">
      <title>Icon title</title>
    </Identification20>
  ));
