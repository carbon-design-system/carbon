import React from 'react';
import { storiesOf } from '@storybook/react';
import Partnership24 from '../../../es/partnership/24.js';

storiesOf('Partnership24', module)
  .add('default', () => <Partnership24 />)
  .add('with accessibility label', () => (
    <Partnership24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Partnership24 aria-label="Icon label">
      <title>Icon title</title>
    </Partnership24>
  ));
