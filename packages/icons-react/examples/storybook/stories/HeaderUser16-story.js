import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderUser16 from '../../../lib/HeaderUser/16';

storiesOf('HeaderUser16', module)
  .add('default', () => <HeaderUser16 />)
  .add('with accessibility label', () => (
    <HeaderUser16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderUser16 focusable>
      <title>Icon title</title>
    </HeaderUser16>
  ));
