import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile24 from '../../../es/mobile/24.js';

storiesOf('Mobile24', module)
  .add('default', () => <Mobile24 />)
  .add('with accessibility label', () => (
    <Mobile24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Mobile24 aria-label="Icon label">
      <title>Icon title</title>
    </Mobile24>
  ));
