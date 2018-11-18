import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthEditFilter24 from '../../../es/watson-health/edit-filter/24.js';

storiesOf('WatsonHealthEditFilter24', module)
  .add('default', () => <WatsonHealthEditFilter24 />)
  .add('with accessibility label', () => (
    <WatsonHealthEditFilter24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthEditFilter24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthEditFilter24>
  ));
