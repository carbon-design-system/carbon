import React from 'react';
import { storiesOf } from '@storybook/react';
import Data_132 from '../../../lib/data--1/32';

storiesOf('Data_132', module)
  .add('default', () => <Data_132 />)
  .add('with accessibility label', () => (
    <Data_132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Data_132 focusable>
      <title>Icon title</title>
    </Data_132>
  ));
