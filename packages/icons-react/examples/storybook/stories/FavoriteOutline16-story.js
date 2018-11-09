import React from 'react';
import { storiesOf } from '@storybook/react';
import FavoriteOutline16 from '../../../lib/FavoriteOutline/16';

storiesOf('FavoriteOutline16', module)
  .add('default', () => <FavoriteOutline16 />)
  .add('with accessibility label', () => (
    <FavoriteOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FavoriteOutline16 focusable>
      <title>Icon title</title>
    </FavoriteOutline16>
  ));
