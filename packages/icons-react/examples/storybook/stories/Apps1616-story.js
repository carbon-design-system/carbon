import React from 'react';
import { storiesOf } from '@storybook/react';
import Apps1616 from '../../../lib/apps16/16';

storiesOf('Apps1616', module)
  .add('default', () => <Apps1616 />)
  .add('with accessibility label', () => (
    <Apps1616 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Apps1616 focusable>
      <title>Icon title</title>
    </Apps1616>
  ));
