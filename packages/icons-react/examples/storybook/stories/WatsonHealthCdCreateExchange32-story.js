import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCdCreateExchange32 from '../../../lib/WatsonHealthCdCreateExchange/32';

storiesOf('WatsonHealthCdCreateExchange32', module)
  .add('default', () => <WatsonHealthCdCreateExchange32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCdCreateExchange32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCdCreateExchange32 focusable>
      <title>Icon title</title>
    </WatsonHealthCdCreateExchange32>
  ));
