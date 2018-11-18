import React from 'react';
import { storiesOf } from '@storybook/react';
import Restaurant20 from '../../../es/restaurant/20.js';

storiesOf('Restaurant20', module)
  .add('default', () => <Restaurant20 />)
  .add('with accessibility label', () => (
    <Restaurant20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Restaurant20 aria-label="Icon label">
      <title>Icon title</title>
    </Restaurant20>
  ));
