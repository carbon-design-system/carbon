import React from 'react';
import { storiesOf } from '@storybook/react';
import Cloud24 from '../../../es/cloud/24.js';

storiesOf('Cloud24', module)
  .add('default', () => <Cloud24 />)
  .add('with accessibility label', () => (
    <Cloud24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cloud24 aria-label="Icon label">
      <title>Icon title</title>
    </Cloud24>
  ));
