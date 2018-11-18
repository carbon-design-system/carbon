import React from 'react';
import { storiesOf } from '@storybook/react';
import Power20 from '../../../es/power/20.js';

storiesOf('Power20', module)
  .add('default', () => <Power20 />)
  .add('with accessibility label', () => (
    <Power20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Power20 aria-label="Icon label">
      <title>Icon title</title>
    </Power20>
  ));
