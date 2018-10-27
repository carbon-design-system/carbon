import React from 'react';
import { storiesOf } from '@storybook/react';
import Restart16 from '../../../lib/restart/16';

storiesOf('Restart16', module)
  .add('default', () => <Restart16 />)
  .add('with accessibility label', () => (
    <Restart16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Restart16 focusable>
      <title>Icon title</title>
    </Restart16>
  ));
