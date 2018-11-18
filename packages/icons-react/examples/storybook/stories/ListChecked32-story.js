import React from 'react';
import { storiesOf } from '@storybook/react';
import ListChecked32 from '../../../es/list--checked/32.js';

storiesOf('ListChecked32', module)
  .add('default', () => <ListChecked32 />)
  .add('with accessibility label', () => (
    <ListChecked32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListChecked32 aria-label="Icon label">
      <title>Icon title</title>
    </ListChecked32>
  ));
