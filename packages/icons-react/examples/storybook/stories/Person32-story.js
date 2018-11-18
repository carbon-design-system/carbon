import React from 'react';
import { storiesOf } from '@storybook/react';
import Person32 from '../../../es/person/32.js';

storiesOf('Person32', module)
  .add('default', () => <Person32 />)
  .add('with accessibility label', () => (
    <Person32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Person32 aria-label="Icon label">
      <title>Icon title</title>
    </Person32>
  ));
