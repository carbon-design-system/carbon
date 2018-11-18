import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile32 from '../../../es/mobile/32.js';

storiesOf('Mobile32', module)
  .add('default', () => <Mobile32 />)
  .add('with accessibility label', () => (
    <Mobile32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Mobile32 aria-label="Icon label">
      <title>Icon title</title>
    </Mobile32>
  ));
