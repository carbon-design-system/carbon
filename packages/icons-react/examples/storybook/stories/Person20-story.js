import React from 'react';
import { storiesOf } from '@storybook/react';
import Person20 from '../../../es/person/20.js';

storiesOf('Person20', module)
  .add('default', () => <Person20 />)
  .add('with accessibility label', () => (
    <Person20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Person20 aria-label="Icon label">
      <title>Icon title</title>
    </Person20>
  ));
