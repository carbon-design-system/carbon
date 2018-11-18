import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomIn20 from '../../../es/zoom--in/20.js';

storiesOf('ZoomIn20', module)
  .add('default', () => <ZoomIn20 />)
  .add('with accessibility label', () => (
    <ZoomIn20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomIn20 aria-label="Icon label">
      <title>Icon title</title>
    </ZoomIn20>
  ));
