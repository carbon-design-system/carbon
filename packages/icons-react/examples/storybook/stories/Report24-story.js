import React from 'react';
import { storiesOf } from '@storybook/react';
import Report24 from '../../../es/report/24.js';

storiesOf('Report24', module)
  .add('default', () => <Report24 />)
  .add('with accessibility label', () => (
    <Report24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Report24 aria-label="Icon label">
      <title>Icon title</title>
    </Report24>
  ));
