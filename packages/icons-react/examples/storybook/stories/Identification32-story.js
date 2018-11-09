import React from 'react';
import { storiesOf } from '@storybook/react';
import Identification32 from '../../../lib/Identification/32';

storiesOf('Identification32', module)
  .add('default', () => <Identification32 />)
  .add('with accessibility label', () => (
    <Identification32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Identification32 focusable>
      <title>Icon title</title>
    </Identification32>
  ));
