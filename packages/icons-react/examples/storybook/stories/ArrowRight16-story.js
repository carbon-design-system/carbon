import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowRight16 from '../../../lib/arrow--right/16';

storiesOf('ArrowRight16', module)
  .add('default', () => <ArrowRight16 />)
  .add('with accessibility label', () => (
    <ArrowRight16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowRight16 focusable>
      <title>Icon title</title>
    </ArrowRight16>
  ));
