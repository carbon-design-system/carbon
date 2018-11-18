import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileAdd20 from '../../../es/mobile--add/20.js';

storiesOf('MobileAdd20', module)
  .add('default', () => <MobileAdd20 />)
  .add('with accessibility label', () => (
    <MobileAdd20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MobileAdd20 aria-label="Icon label">
      <title>Icon title</title>
    </MobileAdd20>
  ));
