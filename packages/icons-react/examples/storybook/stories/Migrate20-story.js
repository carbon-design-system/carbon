import React from 'react';
import { storiesOf } from '@storybook/react';
import Migrate20 from '../../../es/migrate/20.js';

storiesOf('Migrate20', module)
  .add('default', () => <Migrate20 />)
  .add('with accessibility label', () => (
    <Migrate20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Migrate20 aria-label="Icon label">
      <title>Icon title</title>
    </Migrate20>
  ));
