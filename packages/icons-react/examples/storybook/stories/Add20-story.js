import React from 'react';
import { storiesOf } from '@storybook/react';
import Add20 from '../../../es/add/20.js';

storiesOf('Add20', module)
  .add('default', () => <Add20 />)
  .add('with accessibility label', () => (
    <Add20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Add20 aria-label="Icon label">
      <title>Icon title</title>
    </Add20>
  ));
