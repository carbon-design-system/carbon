import React from 'react';
import { storiesOf } from '@storybook/react';
import AppSwitcher20 from '../../../es/app-switcher/20.js';

storiesOf('AppSwitcher20', module)
  .add('default', () => <AppSwitcher20 />)
  .add('with accessibility label', () => (
    <AppSwitcher20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AppSwitcher20 aria-label="Icon label">
      <title>Icon title</title>
    </AppSwitcher20>
  ));
