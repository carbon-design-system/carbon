import React from 'react';
import { storiesOf } from '@storybook/react';
import HdFilled24 from '../../../es/HD--filled/24.js';

storiesOf('HdFilled24', module)
  .add('default', () => <HdFilled24 />)
  .add('with accessibility label', () => (
    <HdFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HdFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </HdFilled24>
  ));
