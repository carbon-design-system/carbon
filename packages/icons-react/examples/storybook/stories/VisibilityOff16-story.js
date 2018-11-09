import React from 'react';
import { storiesOf } from '@storybook/react';
import VisibilityOff16 from '../../../lib/VisibilityOff/16';

storiesOf('VisibilityOff16', module)
  .add('default', () => <VisibilityOff16 />)
  .add('with accessibility label', () => (
    <VisibilityOff16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VisibilityOff16 focusable>
      <title>Icon title</title>
    </VisibilityOff16>
  ));
