import React from 'react';
import { storiesOf } from '@storybook/react';
import Add16 from '../../../lib/add/16';

storiesOf('Add16', module)
  .add('default', () => <Add16 />)
  .add('with accessibility label', () => (
    <Add16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Add16 focusable>
      <title>Icon title</title>
    </Add16>
  ));
