import React from 'react';
import { storiesOf } from '@storybook/react';
import Error20 from '../../../es/error/20.js';

storiesOf('Error20', module)
  .add('default', () => <Error20 />)
  .add('with accessibility label', () => (
    <Error20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Error20 aria-label="Icon label">
      <title>Icon title</title>
    </Error20>
  ));
