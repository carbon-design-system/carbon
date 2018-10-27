import React from 'react';
import { storiesOf } from '@storybook/react';
import Trash16 from '../../../lib/trash/16';

storiesOf('Trash16', module)
  .add('default', () => <Trash16 />)
  .add('with accessibility label', () => (
    <Trash16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Trash16 focusable>
      <title>Icon title</title>
    </Trash16>
  ));
