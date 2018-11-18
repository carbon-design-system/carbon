import React from 'react';
import { storiesOf } from '@storybook/react';
import ListChecked24 from '../../../es/list--checked/24.js';

storiesOf('ListChecked24', module)
  .add('default', () => <ListChecked24 />)
  .add('with accessibility label', () => (
    <ListChecked24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListChecked24 aria-label="Icon label">
      <title>Icon title</title>
    </ListChecked24>
  ));
