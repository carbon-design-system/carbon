import React from 'react';
import { storiesOf } from '@storybook/react';
import Phone20 from '../../../es/phone/20.js';

storiesOf('Phone20', module)
  .add('default', () => <Phone20 />)
  .add('with accessibility label', () => (
    <Phone20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Phone20 aria-label="Icon label">
      <title>Icon title</title>
    </Phone20>
  ));
