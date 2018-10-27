import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderNotification16 from '../../../lib/header--notification/16';

storiesOf('HeaderNotification16', module)
  .add('default', () => <HeaderNotification16 />)
  .add('with accessibility label', () => (
    <HeaderNotification16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderNotification16 focusable>
      <title>Icon title</title>
    </HeaderNotification16>
  ));
