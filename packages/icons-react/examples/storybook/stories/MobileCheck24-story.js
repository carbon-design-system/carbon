import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileCheck24 from '../../../es/mobile--check/24.js';

storiesOf('MobileCheck24', module)
  .add('default', () => <MobileCheck24 />)
  .add('with accessibility label', () => (
    <MobileCheck24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MobileCheck24 aria-label="Icon label">
      <title>Icon title</title>
    </MobileCheck24>
  ));
