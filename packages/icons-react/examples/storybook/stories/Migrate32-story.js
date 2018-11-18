import React from 'react';
import { storiesOf } from '@storybook/react';
import Migrate32 from '../../../es/migrate/32.js';

storiesOf('Migrate32', module)
  .add('default', () => <Migrate32 />)
  .add('with accessibility label', () => (
    <Migrate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Migrate32 aria-label="Icon label">
      <title>Icon title</title>
    </Migrate32>
  ));
