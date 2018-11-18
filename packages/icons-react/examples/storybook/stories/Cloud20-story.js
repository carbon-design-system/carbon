import React from 'react';
import { storiesOf } from '@storybook/react';
import Cloud20 from '../../../es/cloud/20.js';

storiesOf('Cloud20', module)
  .add('default', () => <Cloud20 />)
  .add('with accessibility label', () => (
    <Cloud20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cloud20 aria-label="Icon label">
      <title>Icon title</title>
    </Cloud20>
  ));
