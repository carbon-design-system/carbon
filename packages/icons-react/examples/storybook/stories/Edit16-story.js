import React from 'react';
import { storiesOf } from '@storybook/react';
import Edit16 from '../../../lib/Edit/16';

storiesOf('Edit16', module)
  .add('default', () => <Edit16 />)
  .add('with accessibility label', () => (
    <Edit16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Edit16 focusable>
      <title>Icon title</title>
    </Edit16>
  ));
