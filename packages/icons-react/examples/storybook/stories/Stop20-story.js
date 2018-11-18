import React from 'react';
import { storiesOf } from '@storybook/react';
import Stop20 from '../../../es/stop/20.js';

storiesOf('Stop20', module)
  .add('default', () => <Stop20 />)
  .add('with accessibility label', () => (
    <Stop20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Stop20 aria-label="Icon label">
      <title>Icon title</title>
    </Stop20>
  ));
