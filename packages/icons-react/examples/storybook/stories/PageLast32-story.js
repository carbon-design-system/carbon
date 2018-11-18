import React from 'react';
import { storiesOf } from '@storybook/react';
import PageLast32 from '../../../es/page--last/32.js';

storiesOf('PageLast32', module)
  .add('default', () => <PageLast32 />)
  .add('with accessibility label', () => (
    <PageLast32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PageLast32 aria-label="Icon label">
      <title>Icon title</title>
    </PageLast32>
  ));
