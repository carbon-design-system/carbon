import React from 'react';
import { storiesOf } from '@storybook/react';
import ListBulleted32 from '../../../es/list--bulleted/32.js';

storiesOf('ListBulleted32', module)
  .add('default', () => <ListBulleted32 />)
  .add('with accessibility label', () => (
    <ListBulleted32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListBulleted32 aria-label="Icon label">
      <title>Icon title</title>
    </ListBulleted32>
  ));
