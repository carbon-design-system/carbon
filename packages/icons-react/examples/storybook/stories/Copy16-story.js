import React from 'react';
import { storiesOf } from '@storybook/react';
import Copy16 from '../../../lib/Copy/16';

storiesOf('Copy16', module)
  .add('default', () => <Copy16 />)
  .add('with accessibility label', () => (
    <Copy16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Copy16 focusable>
      <title>Icon title</title>
    </Copy16>
  ));
