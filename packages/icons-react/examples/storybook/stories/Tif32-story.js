import React from 'react';
import { storiesOf } from '@storybook/react';
import Tif32 from '../../../lib/Tif/32';

storiesOf('Tif32', module)
  .add('default', () => <Tif32 />)
  .add('with accessibility label', () => (
    <Tif32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tif32 focusable>
      <title>Icon title</title>
    </Tif32>
  ));
