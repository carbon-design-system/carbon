import React from 'react';
import { storiesOf } from '@storybook/react';
import RequestQuote20 from '../../../es/request-quote/20.js';

storiesOf('RequestQuote20', module)
  .add('default', () => <RequestQuote20 />)
  .add('with accessibility label', () => (
    <RequestQuote20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RequestQuote20 aria-label="Icon label">
      <title>Icon title</title>
    </RequestQuote20>
  ));
