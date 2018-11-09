import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderSearch16 from '../../../lib/HeaderSearch/16';

storiesOf('HeaderSearch16', module)
  .add('default', () => <HeaderSearch16 />)
  .add('with accessibility label', () => (
    <HeaderSearch16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderSearch16 focusable>
      <title>Icon title</title>
    </HeaderSearch16>
  ));
