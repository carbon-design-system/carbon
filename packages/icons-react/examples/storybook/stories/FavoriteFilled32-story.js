import React from 'react';
import { storiesOf } from '@storybook/react';
import FavoriteFilled32 from '../../../es/favorite--filled/32.js';

storiesOf('FavoriteFilled32', module)
  .add('default', () => <FavoriteFilled32 />)
  .add('with accessibility label', () => (
    <FavoriteFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FavoriteFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </FavoriteFilled32>
  ));
