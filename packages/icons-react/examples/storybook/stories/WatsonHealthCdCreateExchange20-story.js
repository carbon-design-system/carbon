import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdCreateExchange20 from '../../../es/watson-health/cd--create-exchange/20.js';

storiesOf('WatsonHealthCdCreateExchange20', module)
  .add('default', () => <WatsonHealthCdCreateExchange20 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdCreateExchange20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdCreateExchange20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCdCreateExchange20>
  ));
