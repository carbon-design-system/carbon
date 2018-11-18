import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdCreateExchange24 from '../../../es/watson-health/cd--create-exchange/24.js';

storiesOf('WatsonHealthCdCreateExchange24', module)
  .add('default', () => <WatsonHealthCdCreateExchange24 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdCreateExchange24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdCreateExchange24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCdCreateExchange24>
  ));
