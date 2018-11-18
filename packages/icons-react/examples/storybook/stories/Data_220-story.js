import React from 'react';
import { storiesOf } from '@storybook/react';
import Data_220 from '../../../es/data--2/20.js';

storiesOf('Data_220', module)
  .add('default', () => <Data_220 />)
  .add('with accessibility label', () => (
    <Data_220 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Data_220 aria-label="Icon label">
      <title>Icon title</title>
    </Data_220>
  ));
