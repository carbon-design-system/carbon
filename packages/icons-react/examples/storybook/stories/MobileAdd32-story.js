import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileAdd32 from '../../../lib/MobileAdd/32';

storiesOf('MobileAdd32', module)
  .add('default', () => <MobileAdd32 />)
  .add('with accessibility label', () => (
    <MobileAdd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MobileAdd32 focusable>
      <title>Icon title</title>
    </MobileAdd32>
  ));
