import React from 'react';
import { storiesOf } from '@storybook/react';
import Star16 from '../../../lib/Star/16';

storiesOf('Star16', module)
  .add('default', () => <Star16 />)
  .add('with accessibility label', () => (
    <Star16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Star16 focusable>
      <title>Icon title</title>
    </Star16>
  ));
