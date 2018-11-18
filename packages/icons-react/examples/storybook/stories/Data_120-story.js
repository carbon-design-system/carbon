import React from 'react';
import { storiesOf } from '@storybook/react';
import Data_120 from '../../../es/data--1/20.js';

storiesOf('Data_120', module)
  .add('default', () => <Data_120 />)
  .add('with accessibility label', () => (
    <Data_120 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Data_120 aria-label="Icon label">
      <title>Icon title</title>
    </Data_120>
  ));
