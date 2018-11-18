import React from 'react';
import { storiesOf } from '@storybook/react';
import Zip24 from '../../../es/ZIP/24.js';

storiesOf('Zip24', module)
  .add('default', () => <Zip24 />)
  .add('with accessibility label', () => (
    <Zip24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Zip24 aria-label="Icon label">
      <title>Icon title</title>
    </Zip24>
  ));
