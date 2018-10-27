import React from 'react';
import { storiesOf } from '@storybook/react';
import AppSwitcher32 from '../../../lib/app-switcher/32';

storiesOf('AppSwitcher32', module)
  .add('default', () => <AppSwitcher32 />)
  .add('with accessibility label', () => (
    <AppSwitcher32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AppSwitcher32 focusable>
      <title>Icon title</title>
    </AppSwitcher32>
  ));
