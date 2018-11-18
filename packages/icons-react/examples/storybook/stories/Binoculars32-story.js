import React from 'react';
import { storiesOf } from '@storybook/react';
import Binoculars32 from '../../../es/binoculars/32.js';

storiesOf('Binoculars32', module)
  .add('default', () => <Binoculars32 />)
  .add('with accessibility label', () => (
    <Binoculars32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Binoculars32 aria-label="Icon label">
      <title>Icon title</title>
    </Binoculars32>
  ));
