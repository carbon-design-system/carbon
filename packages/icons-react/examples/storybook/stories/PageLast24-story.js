import React from 'react';
import { storiesOf } from '@storybook/react';
import PageLast24 from '../../../es/page--last/24.js';

storiesOf('PageLast24', module)
  .add('default', () => <PageLast24 />)
  .add('with accessibility label', () => (
    <PageLast24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PageLast24 aria-label="Icon label">
      <title>Icon title</title>
    </PageLast24>
  ));
