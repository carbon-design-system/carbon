import React from 'react';
import { storiesOf } from '@storybook/react';
import Phone32 from '../../../es/phone/32.js';

storiesOf('Phone32', module)
  .add('default', () => <Phone32 />)
  .add('with accessibility label', () => (
    <Phone32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Phone32 aria-label="Icon label">
      <title>Icon title</title>
    </Phone32>
  ));
