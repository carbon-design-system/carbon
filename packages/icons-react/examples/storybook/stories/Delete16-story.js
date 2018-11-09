import React from 'react';
import { storiesOf } from '@storybook/react';
import Delete16 from '../../../lib/Delete/16';

storiesOf('Delete16', module)
  .add('default', () => <Delete16 />)
  .add('with accessibility label', () => (
    <Delete16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Delete16 focusable>
      <title>Icon title</title>
    </Delete16>
  ));
