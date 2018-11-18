import React from 'react';
import { storiesOf } from '@storybook/react';
import PageFirst32 from '../../../es/page--first/32.js';

storiesOf('PageFirst32', module)
  .add('default', () => <PageFirst32 />)
  .add('with accessibility label', () => (
    <PageFirst32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PageFirst32 aria-label="Icon label">
      <title>Icon title</title>
    </PageFirst32>
  ));
