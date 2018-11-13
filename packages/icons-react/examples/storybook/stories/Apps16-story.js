import React from 'react';
import { storiesOf } from '@storybook/react';
import Apps16 from '../../../lib/Apps/16';

storiesOf('Apps16', module)
  .add('default', () => <Apps16 />)
  .add('with accessibility label', () => (
    <Apps16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Apps16 focusable>
      <title>Icon title</title>
    </Apps16>
  ));
