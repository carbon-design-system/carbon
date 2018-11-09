import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderHelp16 from '../../../lib/HeaderHelp/16';

storiesOf('HeaderHelp16', module)
  .add('default', () => <HeaderHelp16 />)
  .add('with accessibility label', () => (
    <HeaderHelp16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderHelp16 focusable>
      <title>Icon title</title>
    </HeaderHelp16>
  ));
