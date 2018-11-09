import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderNotifciation16 from '../../../lib/HeaderNotifciation/16';

storiesOf('HeaderNotifciation16', module)
  .add('default', () => <HeaderNotifciation16 />)
  .add('with accessibility label', () => (
    <HeaderNotifciation16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderNotifciation16 focusable>
      <title>Icon title</title>
    </HeaderNotifciation16>
  ));
