import React from 'react';
import { storiesOf } from '@storybook/react';
import Svg24 from '../../../es/SVG/24.js';

storiesOf('Svg24', module)
  .add('default', () => <Svg24 />)
  .add('with accessibility label', () => (
    <Svg24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Svg24 aria-label="Icon label">
      <title>Icon title</title>
    </Svg24>
  ));
