import React from 'react';
import { storiesOf } from '@storybook/react';
import Settings16 from '../../../lib/settings/16';

storiesOf('Settings16', module)
  .add('default', () => <Settings16 />)
  .add('with accessibility label', () => (
    <Settings16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Settings16 focusable>
      <title>Icon title</title>
    </Settings16>
  ));
