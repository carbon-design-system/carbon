import React from 'react';
import { storiesOf } from '@storybook/react';
import Warning16 from '../../../lib/Warning/16';

storiesOf('Warning16', module)
  .add('default', () => <Warning16 />)
  .add('with accessibility label', () => (
    <Warning16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Warning16 focusable>
      <title>Icon title</title>
    </Warning16>
  ));
