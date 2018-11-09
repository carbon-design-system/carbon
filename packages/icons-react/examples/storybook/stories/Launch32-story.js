import React from 'react';
import { storiesOf } from '@storybook/react';
import Launch32 from '../../../lib/Launch/32';

storiesOf('Launch32', module)
  .add('default', () => <Launch32 />)
  .add('with accessibility label', () => (
    <Launch32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Launch32 focusable>
      <title>Icon title</title>
    </Launch32>
  ));
