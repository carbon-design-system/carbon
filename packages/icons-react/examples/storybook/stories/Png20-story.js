import React from 'react';
import { storiesOf } from '@storybook/react';
import Png20 from '../../../es/PNG/20.js';

storiesOf('Png20', module)
  .add('default', () => <Png20 />)
  .add('with accessibility label', () => (
    <Png20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Png20 aria-label="Icon label">
      <title>Icon title</title>
    </Png20>
  ));
