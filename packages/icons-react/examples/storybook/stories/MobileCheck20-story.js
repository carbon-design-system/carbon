import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileCheck20 from '../../../es/mobile--check/20.js';

storiesOf('MobileCheck20', module)
  .add('default', () => <MobileCheck20 />)
  .add('with accessibility label', () => (
    <MobileCheck20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MobileCheck20 aria-label="Icon label">
      <title>Icon title</title>
    </MobileCheck20>
  ));
