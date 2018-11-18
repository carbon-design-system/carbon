import React from 'react';
import { storiesOf } from '@storybook/react';
import Ruler24 from '../../../es/ruler/24.js';

storiesOf('Ruler24', module)
  .add('default', () => <Ruler24 />)
  .add('with accessibility label', () => (
    <Ruler24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Ruler24 aria-label="Icon label">
      <title>Icon title</title>
    </Ruler24>
  ));
