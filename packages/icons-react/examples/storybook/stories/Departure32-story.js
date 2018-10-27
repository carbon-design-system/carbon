import React from 'react';
import { storiesOf } from '@storybook/react';
import Departure32 from '../../../lib/departure/32';

storiesOf('Departure32', module)
  .add('default', () => <Departure32 />)
  .add('with accessibility label', () => (
    <Departure32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Departure32 focusable>
      <title>Icon title</title>
    </Departure32>
  ));
