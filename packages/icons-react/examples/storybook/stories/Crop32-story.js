import React from 'react';
import { storiesOf } from '@storybook/react';
import Crop32 from '../../../lib/crop/32';

storiesOf('Crop32', module)
  .add('default', () => <Crop32 />)
  .add('with accessibility label', () => (
    <Crop32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Crop32 focusable>
      <title>Icon title</title>
    </Crop32>
  ));
