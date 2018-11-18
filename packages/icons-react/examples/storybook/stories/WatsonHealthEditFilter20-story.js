import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthEditFilter20 from '../../../es/watson-health/edit-filter/20.js';

storiesOf('WatsonHealthEditFilter20', module)
  .add('default', () => <WatsonHealthEditFilter20 />)
  .add('with accessibility label', () => (
    <WatsonHealthEditFilter20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthEditFilter20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthEditFilter20>
  ));
