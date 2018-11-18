import React from 'react';
import { storiesOf } from '@storybook/react';
import PageLast20 from '../../../es/page--last/20.js';

storiesOf('PageLast20', module)
  .add('default', () => <PageLast20 />)
  .add('with accessibility label', () => (
    <PageLast20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PageLast20 aria-label="Icon label">
      <title>Icon title</title>
    </PageLast20>
  ));
