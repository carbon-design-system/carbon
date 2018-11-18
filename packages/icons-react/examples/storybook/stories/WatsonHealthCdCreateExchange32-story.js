import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdCreateExchange32 from '../../../es/watson-health/cd--create-exchange/32.js';

storiesOf('WatsonHealthCdCreateExchange32', module)
  .add('default', () => <WatsonHealthCdCreateExchange32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdCreateExchange32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdCreateExchange32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCdCreateExchange32>
  ));
