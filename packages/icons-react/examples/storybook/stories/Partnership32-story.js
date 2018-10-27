import React from 'react';
import { storiesOf } from '@storybook/react';
import Partnership32 from '../../../lib/partnership/32';

storiesOf('Partnership32', module)
  .add('default', () => <Partnership32 />)
  .add('with accessibility label', () => (
    <Partnership32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Partnership32 focusable>
      <title>Icon title</title>
    </Partnership32>
  ));
