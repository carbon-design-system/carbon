import React from 'react';
import { storiesOf } from '@storybook/react';
import FavoriteFilled16 from '../../../lib/FavoriteFilled/16';

storiesOf('FavoriteFilled16', module)
  .add('default', () => <FavoriteFilled16 />)
  .add('with accessibility label', () => (
    <FavoriteFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FavoriteFilled16 focusable>
      <title>Icon title</title>
    </FavoriteFilled16>
  ));
