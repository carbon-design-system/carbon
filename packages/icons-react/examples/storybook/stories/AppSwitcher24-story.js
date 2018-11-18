import React from 'react';
import { storiesOf } from '@storybook/react';
import AppSwitcher24 from '../../../es/app-switcher/24.js';

storiesOf('AppSwitcher24', module)
  .add('default', () => <AppSwitcher24 />)
  .add('with accessibility label', () => (
    <AppSwitcher24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AppSwitcher24 aria-label="Icon label">
      <title>Icon title</title>
    </AppSwitcher24>
  ));
