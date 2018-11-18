import React from 'react';
import { storiesOf } from '@storybook/react';
import Partnership32 from '../../../es/partnership/32.js';

storiesOf('Partnership32', module)
  .add('default', () => <Partnership32 />)
  .add('with accessibility label', () => (
    <Partnership32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Partnership32 aria-label="Icon label">
      <title>Icon title</title>
    </Partnership32>
  ));
