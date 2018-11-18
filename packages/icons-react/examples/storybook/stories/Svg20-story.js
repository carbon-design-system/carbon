import React from 'react';
import { storiesOf } from '@storybook/react';
import Svg20 from '../../../es/SVG/20.js';

storiesOf('Svg20', module)
  .add('default', () => <Svg20 />)
  .add('with accessibility label', () => (
    <Svg20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Svg20 aria-label="Icon label">
      <title>Icon title</title>
    </Svg20>
  ));
