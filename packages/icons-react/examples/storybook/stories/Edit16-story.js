import React from 'react';
import { storiesOf } from '@storybook/react';
import Edit16 from '../../../es/edit/16.js';

storiesOf('Edit16', module)
  .add('default', () => <Edit16 />)
  .add('with accessibility label', () => (
    <Edit16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Edit16 aria-label="Icon label">
      <title>Icon title</title>
    </Edit16>
  ));
