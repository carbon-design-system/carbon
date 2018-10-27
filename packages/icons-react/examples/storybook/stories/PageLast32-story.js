import React from 'react';
import { storiesOf } from '@storybook/react';
import PageLast32 from '../../../lib/page--last/32';

storiesOf('PageLast32', module)
  .add('default', () => <PageLast32 />)
  .add('with accessibility label', () => (
    <PageLast32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PageLast32 focusable>
      <title>Icon title</title>
    </PageLast32>
  ));
