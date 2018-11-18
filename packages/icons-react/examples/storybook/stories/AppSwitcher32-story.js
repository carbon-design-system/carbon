import React from 'react';
import { storiesOf } from '@storybook/react';
import AppSwitcher32 from '../../../es/app-switcher/32.js';

storiesOf('AppSwitcher32', module)
  .add('default', () => <AppSwitcher32 />)
  .add('with accessibility label', () => (
    <AppSwitcher32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AppSwitcher32 aria-label="Icon label">
      <title>Icon title</title>
    </AppSwitcher32>
  ));
