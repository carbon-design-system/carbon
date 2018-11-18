import React from 'react';
import { storiesOf } from '@storybook/react';
import Power16 from '../../../es/power/16.js';

storiesOf('Power16', module)
  .add('default', () => <Power16 />)
  .add('with accessibility label', () => (
    <Power16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Power16 aria-label="Icon label">
      <title>Icon title</title>
    </Power16>
  ));
