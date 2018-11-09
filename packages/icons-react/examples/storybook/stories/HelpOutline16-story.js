import React from 'react';
import { storiesOf } from '@storybook/react';
import HelpOutline16 from '../../../lib/HelpOutline/16';

storiesOf('HelpOutline16', module)
  .add('default', () => <HelpOutline16 />)
  .add('with accessibility label', () => (
    <HelpOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HelpOutline16 focusable>
      <title>Icon title</title>
    </HelpOutline16>
  ));
