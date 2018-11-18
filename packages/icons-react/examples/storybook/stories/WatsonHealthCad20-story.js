import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCad20 from '../../../es/watson-health/CAD/20.js';

storiesOf('WatsonHealthCad20', module)
  .add('default', () => <WatsonHealthCad20 />)
  .add('with accessibility label', () => (
    <WatsonHealthCad20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCad20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCad20>
  ));
