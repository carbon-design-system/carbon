import React from 'react';
import { storiesOf } from '@storybook/react';
import Svg32 from '../../../lib/Svg/32';

storiesOf('Svg32', module)
  .add('default', () => <Svg32 />)
  .add('with accessibility label', () => (
    <Svg32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Svg32 focusable>
      <title>Icon title</title>
    </Svg32>
  ));
