import React from 'react';
import { storiesOf } from '@storybook/react';
import Delete16 from '../../../es/delete/16.js';

storiesOf('Delete16', module)
  .add('default', () => <Delete16 />)
  .add('with accessibility label', () => (
    <Delete16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Delete16 aria-label="Icon label">
      <title>Icon title</title>
    </Delete16>
  ));
