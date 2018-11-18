import React from 'react';
import { storiesOf } from '@storybook/react';
import Movement24 from '../../../es/movement/24.js';

storiesOf('Movement24', module)
  .add('default', () => <Movement24 />)
  .add('with accessibility label', () => (
    <Movement24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Movement24 aria-label="Icon label">
      <title>Icon title</title>
    </Movement24>
  ));
