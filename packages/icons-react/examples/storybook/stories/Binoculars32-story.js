import React from 'react';
import { storiesOf } from '@storybook/react';
import Binoculars32 from '../../../lib/binoculars/32';

storiesOf('Binoculars32', module)
  .add('default', () => <Binoculars32 />)
  .add('with accessibility label', () => (
    <Binoculars32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Binoculars32 focusable>
      <title>Icon title</title>
    </Binoculars32>
  ));
