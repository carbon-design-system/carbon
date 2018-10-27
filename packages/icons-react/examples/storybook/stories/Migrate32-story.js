import React from 'react';
import { storiesOf } from '@storybook/react';
import Migrate32 from '../../../lib/migrate/32';

storiesOf('Migrate32', module)
  .add('default', () => <Migrate32 />)
  .add('with accessibility label', () => (
    <Migrate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Migrate32 focusable>
      <title>Icon title</title>
    </Migrate32>
  ));
