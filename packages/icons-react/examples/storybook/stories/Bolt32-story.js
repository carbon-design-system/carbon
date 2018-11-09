import React from 'react';
import { storiesOf } from '@storybook/react';
import Bolt32 from '../../../lib/Bolt/32';

storiesOf('Bolt32', module)
  .add('default', () => <Bolt32 />)
  .add('with accessibility label', () => (
    <Bolt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bolt32 focusable>
      <title>Icon title</title>
    </Bolt32>
  ));
