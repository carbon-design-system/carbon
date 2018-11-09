import React from 'react';
import { storiesOf } from '@storybook/react';
import Power16 from '../../../lib/Power/16';

storiesOf('Power16', module)
  .add('default', () => <Power16 />)
  .add('with accessibility label', () => (
    <Power16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Power16 focusable>
      <title>Icon title</title>
    </Power16>
  ));
