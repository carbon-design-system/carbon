import React from 'react';
import { storiesOf } from '@storybook/react';
import Arrows16 from '../../../es/arrows/16.js';

storiesOf('Arrows16', module)
  .add('default', () => <Arrows16 />)
  .add('with accessibility label', () => (
    <Arrows16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Arrows16 aria-label="Icon label">
      <title>Icon title</title>
    </Arrows16>
  ));
