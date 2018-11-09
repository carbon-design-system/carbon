import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderClose16 from '../../../lib/HeaderClose/16';

storiesOf('HeaderClose16', module)
  .add('default', () => <HeaderClose16 />)
  .add('with accessibility label', () => (
    <HeaderClose16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderClose16 focusable>
      <title>Icon title</title>
    </HeaderClose16>
  ));
