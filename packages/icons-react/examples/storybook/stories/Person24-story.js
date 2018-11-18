import React from 'react';
import { storiesOf } from '@storybook/react';
import Person24 from '../../../es/person/24.js';

storiesOf('Person24', module)
  .add('default', () => <Person24 />)
  .add('with accessibility label', () => (
    <Person24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Person24 aria-label="Icon label">
      <title>Icon title</title>
    </Person24>
  ));
