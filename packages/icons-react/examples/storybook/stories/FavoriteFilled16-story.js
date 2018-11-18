import React from 'react';
import { storiesOf } from '@storybook/react';
import FavoriteFilled16 from '../../../es/favorite--filled/16.js';

storiesOf('FavoriteFilled16', module)
  .add('default', () => <FavoriteFilled16 />)
  .add('with accessibility label', () => (
    <FavoriteFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FavoriteFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </FavoriteFilled16>
  ));
