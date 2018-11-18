import React from 'react';
import { storiesOf } from '@storybook/react';
import RequestQuote24 from '../../../es/request-quote/24.js';

storiesOf('RequestQuote24', module)
  .add('default', () => <RequestQuote24 />)
  .add('with accessibility label', () => (
    <RequestQuote24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RequestQuote24 aria-label="Icon label">
      <title>Icon title</title>
    </RequestQuote24>
  ));
