import React from 'react';
import { storiesOf } from '@storybook/react';
import HelpFilled32 from '../../../es/help--filled/32.js';

storiesOf('HelpFilled32', module)
  .add('default', () => <HelpFilled32 />)
  .add('with accessibility label', () => (
    <HelpFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HelpFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </HelpFilled32>
  ));
