import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthEditFilter32 from '../../../lib/watson-health--edit-filter/32';

storiesOf('WatsonHealthEditFilter32', module)
  .add('default', () => <WatsonHealthEditFilter32 />)
  .add('with accessibility label', () => (
    <WatsonHealthEditFilter32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthEditFilter32 focusable>
      <title>Icon title</title>
    </WatsonHealthEditFilter32>
  ));
