import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCad24 from '../../../es/watson-health/CAD/24.js';

storiesOf('WatsonHealthCad24', module)
  .add('default', () => <WatsonHealthCad24 />)
  .add('with accessibility label', () => (
    <WatsonHealthCad24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCad24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCad24>
  ));
