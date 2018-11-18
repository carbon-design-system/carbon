import React from 'react';
import { storiesOf } from '@storybook/react';
import Data_124 from '../../../es/data--1/24.js';

storiesOf('Data_124', module)
  .add('default', () => <Data_124 />)
  .add('with accessibility label', () => (
    <Data_124 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Data_124 aria-label="Icon label">
      <title>Icon title</title>
    </Data_124>
  ));
