import React from 'react';
import { storiesOf } from '@storybook/react';
import Partnership20 from '../../../es/partnership/20.js';

storiesOf('Partnership20', module)
  .add('default', () => <Partnership20 />)
  .add('with accessibility label', () => (
    <Partnership20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Partnership20 aria-label="Icon label">
      <title>Icon title</title>
    </Partnership20>
  ));
