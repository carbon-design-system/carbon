import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthEditFilter32 from '../../../es/watson-health/edit-filter/32.js';

storiesOf('WatsonHealthEditFilter32', module)
  .add('default', () => <WatsonHealthEditFilter32 />)
  .add('with accessibility label', () => (
    <WatsonHealthEditFilter32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthEditFilter32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthEditFilter32>
  ));
