import React from 'react';
import { storiesOf } from '@storybook/react';
import Scan20 from '../../../es/scan/20.js';

storiesOf('Scan20', module)
  .add('default', () => <Scan20 />)
  .add('with accessibility label', () => (
    <Scan20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Scan20 aria-label="Icon label">
      <title>Icon title</title>
    </Scan20>
  ));
