import React from 'react';
import { storiesOf } from '@storybook/react';
import Migrate24 from '../../../es/migrate/24.js';

storiesOf('Migrate24', module)
  .add('default', () => <Migrate24 />)
  .add('with accessibility label', () => (
    <Migrate24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Migrate24 aria-label="Icon label">
      <title>Icon title</title>
    </Migrate24>
  ));
