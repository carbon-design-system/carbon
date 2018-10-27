import React from 'react';
import { storiesOf } from '@storybook/react';
import HelpSolid16 from '../../../lib/help--solid/16';

storiesOf('HelpSolid16', module)
  .add('default', () => <HelpSolid16 />)
  .add('with accessibility label', () => (
    <HelpSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HelpSolid16 focusable>
      <title>Icon title</title>
    </HelpSolid16>
  ));
