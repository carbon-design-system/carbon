import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowsVertical20 from '../../../es/arrows--vertical/20.js';

storiesOf('ArrowsVertical20', module)
  .add('default', () => <ArrowsVertical20 />)
  .add('with accessibility label', () => (
    <ArrowsVertical20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowsVertical20 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowsVertical20>
  ));
