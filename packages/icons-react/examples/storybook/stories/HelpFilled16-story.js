import React from 'react';
import { storiesOf } from '@storybook/react';
import HelpFilled16 from '../../../lib/HelpFilled/16';

storiesOf('HelpFilled16', module)
  .add('default', () => <HelpFilled16 />)
  .add('with accessibility label', () => (
    <HelpFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HelpFilled16 focusable>
      <title>Icon title</title>
    </HelpFilled16>
  ));
