import React from 'react';
import { storiesOf } from '@storybook/react';
import ListNumbered24 from '../../../es/list--numbered/24.js';

storiesOf('ListNumbered24', module)
  .add('default', () => <ListNumbered24 />)
  .add('with accessibility label', () => (
    <ListNumbered24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListNumbered24 aria-label="Icon label">
      <title>Icon title</title>
    </ListNumbered24>
  ));
