import React from 'react';
import { storiesOf } from '@storybook/react';
import HelpFilled24 from '../../../es/help--filled/24.js';

storiesOf('HelpFilled24', module)
  .add('default', () => <HelpFilled24 />)
  .add('with accessibility label', () => (
    <HelpFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HelpFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </HelpFilled24>
  ));
