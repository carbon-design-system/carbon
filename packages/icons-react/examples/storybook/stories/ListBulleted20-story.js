import React from 'react';
import { storiesOf } from '@storybook/react';
import ListBulleted20 from '../../../es/list--bulleted/20.js';

storiesOf('ListBulleted20', module)
  .add('default', () => <ListBulleted20 />)
  .add('with accessibility label', () => (
    <ListBulleted20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListBulleted20 aria-label="Icon label">
      <title>Icon title</title>
    </ListBulleted20>
  ));
