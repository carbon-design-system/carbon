import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile20 from '../../../es/mobile/20.js';

storiesOf('Mobile20', module)
  .add('default', () => <Mobile20 />)
  .add('with accessibility label', () => (
    <Mobile20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Mobile20 aria-label="Icon label">
      <title>Icon title</title>
    </Mobile20>
  ));
