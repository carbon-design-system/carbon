import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileCheck32 from '../../../lib/MobileCheck/32';

storiesOf('MobileCheck32', module)
  .add('default', () => <MobileCheck32 />)
  .add('with accessibility label', () => (
    <MobileCheck32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MobileCheck32 focusable>
      <title>Icon title</title>
    </MobileCheck32>
  ));
