import React from 'react';
import { storiesOf } from '@storybook/react';
import HelpFilled20 from '../../../es/help--filled/20.js';

storiesOf('HelpFilled20', module)
  .add('default', () => <HelpFilled20 />)
  .add('with accessibility label', () => (
    <HelpFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HelpFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </HelpFilled20>
  ));
