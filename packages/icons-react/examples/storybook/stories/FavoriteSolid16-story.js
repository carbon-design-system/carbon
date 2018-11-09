import React from 'react';
import { storiesOf } from '@storybook/react';
import FavoriteSolid16 from '../../../lib/FavoriteSolid/16';

storiesOf('FavoriteSolid16', module)
  .add('default', () => <FavoriteSolid16 />)
  .add('with accessibility label', () => (
    <FavoriteSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FavoriteSolid16 focusable>
      <title>Icon title</title>
    </FavoriteSolid16>
  ));
