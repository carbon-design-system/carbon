import React from 'react';
import { storiesOf } from '@storybook/react';
import Report32 from '../../../lib/report/32';

storiesOf('Report32', module)
  .add('default', () => <Report32 />)
  .add('with accessibility label', () => (
    <Report32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Report32 focusable>
      <title>Icon title</title>
    </Report32>
  ));
