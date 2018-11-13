import React from 'react';
import { storiesOf } from '@storybook/react';
import Help16 from '../../../lib/Help/16';

storiesOf('Help16', module)
  .add('default', () => <Help16 />)
  .add('with accessibility label', () => (
    <Help16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Help16 focusable>
      <title>Icon title</title>
    </Help16>
  ));
