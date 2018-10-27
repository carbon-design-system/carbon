import React from 'react';
import { storiesOf } from '@storybook/react';
import Favorite16 from '../../../lib/favorite/16';

storiesOf('Favorite16', module)
  .add('default', () => <Favorite16 />)
  .add('with accessibility label', () => (
    <Favorite16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Favorite16 focusable>
      <title>Icon title</title>
    </Favorite16>
  ));
