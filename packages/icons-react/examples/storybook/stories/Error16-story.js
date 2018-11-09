import React from 'react';
import { storiesOf } from '@storybook/react';
import Error16 from '../../../lib/Error/16';

storiesOf('Error16', module)
  .add('default', () => <Error16 />)
  .add('with accessibility label', () => (
    <Error16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Error16 focusable>
      <title>Icon title</title>
    </Error16>
  ));
