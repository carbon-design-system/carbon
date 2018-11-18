import React from 'react';
import { storiesOf } from '@storybook/react';
import FavoriteFilled20 from '../../../es/favorite--filled/20.js';

storiesOf('FavoriteFilled20', module)
  .add('default', () => <FavoriteFilled20 />)
  .add('with accessibility label', () => (
    <FavoriteFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FavoriteFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </FavoriteFilled20>
  ));
