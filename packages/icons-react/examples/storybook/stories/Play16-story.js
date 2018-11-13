import React from 'react';
import { storiesOf } from '@storybook/react';
import Play16 from '../../../lib/Play/16';

storiesOf('Play16', module)
  .add('default', () => <Play16 />)
  .add('with accessibility label', () => (
    <Play16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Play16 focusable>
      <title>Icon title</title>
    </Play16>
  ));
