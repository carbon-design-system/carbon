import React from 'react';
import { storiesOf } from '@storybook/react';
import FavoriteFilled24 from '../../../es/favorite--filled/24.js';

storiesOf('FavoriteFilled24', module)
  .add('default', () => <FavoriteFilled24 />)
  .add('with accessibility label', () => (
    <FavoriteFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FavoriteFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </FavoriteFilled24>
  ));
