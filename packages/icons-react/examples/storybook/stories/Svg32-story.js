import React from 'react';
import { storiesOf } from '@storybook/react';
import Svg32 from '../../../es/SVG/32.js';

storiesOf('Svg32', module)
  .add('default', () => <Svg32 />)
  .add('with accessibility label', () => (
    <Svg32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Svg32 aria-label="Icon label">
      <title>Icon title</title>
    </Svg32>
  ));
