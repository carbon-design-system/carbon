import React from 'react';
import { storiesOf } from '@storybook/react';
import Binoculars24 from '../../../es/binoculars/24.js';

storiesOf('Binoculars24', module)
  .add('default', () => <Binoculars24 />)
  .add('with accessibility label', () => (
    <Binoculars24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Binoculars24 aria-label="Icon label">
      <title>Icon title</title>
    </Binoculars24>
  ));
