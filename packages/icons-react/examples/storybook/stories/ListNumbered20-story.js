import React from 'react';
import { storiesOf } from '@storybook/react';
import ListNumbered20 from '../../../es/list--numbered/20.js';

storiesOf('ListNumbered20', module)
  .add('default', () => <ListNumbered20 />)
  .add('with accessibility label', () => (
    <ListNumbered20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListNumbered20 aria-label="Icon label">
      <title>Icon title</title>
    </ListNumbered20>
  ));
