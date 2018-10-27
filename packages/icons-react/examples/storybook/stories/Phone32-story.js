import React from 'react';
import { storiesOf } from '@storybook/react';
import Phone32 from '../../../lib/phone/32';

storiesOf('Phone32', module)
  .add('default', () => <Phone32 />)
  .add('with accessibility label', () => (
    <Phone32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Phone32 focusable>
      <title>Icon title</title>
    </Phone32>
  ));
