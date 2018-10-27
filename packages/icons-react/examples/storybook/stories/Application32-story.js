import React from 'react';
import { storiesOf } from '@storybook/react';
import Application32 from '../../../lib/application/32';

storiesOf('Application32', module)
  .add('default', () => <Application32 />)
  .add('with accessibility label', () => (
    <Application32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Application32 focusable>
      <title>Icon title</title>
    </Application32>
  ));
