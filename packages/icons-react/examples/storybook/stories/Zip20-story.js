import React from 'react';
import { storiesOf } from '@storybook/react';
import Zip20 from '../../../es/ZIP/20.js';

storiesOf('Zip20', module)
  .add('default', () => <Zip20 />)
  .add('with accessibility label', () => (
    <Zip20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Zip20 aria-label="Icon label">
      <title>Icon title</title>
    </Zip20>
  ));
