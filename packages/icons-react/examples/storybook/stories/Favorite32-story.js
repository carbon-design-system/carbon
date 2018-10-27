import React from 'react';
import { storiesOf } from '@storybook/react';
import Favorite32 from '../../../lib/favorite/32';

storiesOf('Favorite32', module)
  .add('default', () => <Favorite32 />)
  .add('with accessibility label', () => (
    <Favorite32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Favorite32 focusable>
      <title>Icon title</title>
    </Favorite32>
  ));
