import React from 'react';
import { storiesOf } from '@storybook/react';
import Report32 from '../../../es/report/32.js';

storiesOf('Report32', module)
  .add('default', () => <Report32 />)
  .add('with accessibility label', () => (
    <Report32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Report32 aria-label="Icon label">
      <title>Icon title</title>
    </Report32>
  ));
