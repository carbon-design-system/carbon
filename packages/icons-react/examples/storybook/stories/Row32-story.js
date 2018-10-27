import React from 'react';
import { storiesOf } from '@storybook/react';
import Row32 from '../../../lib/row/32';

storiesOf('Row32', module)
  .add('default', () => <Row32 />)
  .add('with accessibility label', () => (
    <Row32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Row32 focusable>
      <title>Icon title</title>
    </Row32>
  ));
