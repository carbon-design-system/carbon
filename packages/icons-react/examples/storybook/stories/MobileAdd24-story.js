import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileAdd24 from '../../../es/mobile--add/24.js';

storiesOf('MobileAdd24', module)
  .add('default', () => <MobileAdd24 />)
  .add('with accessibility label', () => (
    <MobileAdd24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MobileAdd24 aria-label="Icon label">
      <title>Icon title</title>
    </MobileAdd24>
  ));
