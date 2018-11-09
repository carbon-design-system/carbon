import React from 'react';
import { storiesOf } from '@storybook/react';
import RequestQuote32 from '../../../lib/RequestQuote/32';

storiesOf('RequestQuote32', module)
  .add('default', () => <RequestQuote32 />)
  .add('with accessibility label', () => (
    <RequestQuote32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RequestQuote32 focusable>
      <title>Icon title</title>
    </RequestQuote32>
  ));
