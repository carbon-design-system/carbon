import React from 'react';
import { storiesOf } from '@storybook/react';
import ListChecked20 from '../../../es/list--checked/20.js';

storiesOf('ListChecked20', module)
  .add('default', () => <ListChecked20 />)
  .add('with accessibility label', () => (
    <ListChecked20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListChecked20 aria-label="Icon label">
      <title>Icon title</title>
    </ListChecked20>
  ));
