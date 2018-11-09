import React from 'react';
import { storiesOf } from '@storybook/react';
import PageFirst32 from '../../../lib/PageFirst/32';

storiesOf('PageFirst32', module)
  .add('default', () => <PageFirst32 />)
  .add('with accessibility label', () => (
    <PageFirst32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PageFirst32 focusable>
      <title>Icon title</title>
    </PageFirst32>
  ));
