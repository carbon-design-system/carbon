import React from 'react';
import { storiesOf } from '@storybook/react';
import Touch_132 from '../../../lib/Touch_1/32';

storiesOf('Touch_132', module)
  .add('default', () => <Touch_132 />)
  .add('with accessibility label', () => (
    <Touch_132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Touch_132 focusable>
      <title>Icon title</title>
    </Touch_132>
  ));
