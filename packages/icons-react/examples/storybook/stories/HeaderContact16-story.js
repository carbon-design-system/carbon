import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderContact16 from '../../../lib/HeaderContact/16';

storiesOf('HeaderContact16', module)
  .add('default', () => <HeaderContact16 />)
  .add('with accessibility label', () => (
    <HeaderContact16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderContact16 focusable>
      <title>Icon title</title>
    </HeaderContact16>
  ));
