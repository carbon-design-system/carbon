import React from 'react';
import { storiesOf } from '@storybook/react';
import SplitScreen24 from '../../../es/split-screen/24.js';

storiesOf('SplitScreen24', module)
  .add('default', () => <SplitScreen24 />)
  .add('with accessibility label', () => (
    <SplitScreen24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SplitScreen24 aria-label="Icon label">
      <title>Icon title</title>
    </SplitScreen24>
  ));
