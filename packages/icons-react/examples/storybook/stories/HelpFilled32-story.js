import React from 'react';
import { storiesOf } from '@storybook/react';
import HelpFilled32 from '../../../lib/help--filled/32';

storiesOf('HelpFilled32', module)
  .add('default', () => <HelpFilled32 />)
  .add('with accessibility label', () => (
    <HelpFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HelpFilled32 focusable>
      <title>Icon title</title>
    </HelpFilled32>
  ));
