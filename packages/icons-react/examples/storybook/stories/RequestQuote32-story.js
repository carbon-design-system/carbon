import React from 'react';
import { storiesOf } from '@storybook/react';
import RequestQuote32 from '../../../es/request-quote/32.js';

storiesOf('RequestQuote32', module)
  .add('default', () => <RequestQuote32 />)
  .add('with accessibility label', () => (
    <RequestQuote32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RequestQuote32 aria-label="Icon label">
      <title>Icon title</title>
    </RequestQuote32>
  ));
