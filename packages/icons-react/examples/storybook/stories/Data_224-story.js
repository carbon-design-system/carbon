import React from 'react';
import { storiesOf } from '@storybook/react';
import Data_224 from '../../../es/data--2/24.js';

storiesOf('Data_224', module)
  .add('default', () => <Data_224 />)
  .add('with accessibility label', () => (
    <Data_224 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Data_224 aria-label="Icon label">
      <title>Icon title</title>
    </Data_224>
  ));
