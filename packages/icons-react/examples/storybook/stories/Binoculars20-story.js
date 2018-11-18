import React from 'react';
import { storiesOf } from '@storybook/react';
import Binoculars20 from '../../../es/binoculars/20.js';

storiesOf('Binoculars20', module)
  .add('default', () => <Binoculars20 />)
  .add('with accessibility label', () => (
    <Binoculars20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Binoculars20 aria-label="Icon label">
      <title>Icon title</title>
    </Binoculars20>
  ));
