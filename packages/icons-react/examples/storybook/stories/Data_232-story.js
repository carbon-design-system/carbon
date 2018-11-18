import React from 'react';
import { storiesOf } from '@storybook/react';
import Data_232 from '../../../es/data--2/32.js';

storiesOf('Data_232', module)
  .add('default', () => <Data_232 />)
  .add('with accessibility label', () => (
    <Data_232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Data_232 aria-label="Icon label">
      <title>Icon title</title>
    </Data_232>
  ));
