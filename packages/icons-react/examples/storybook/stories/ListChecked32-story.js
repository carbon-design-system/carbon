import React from 'react';
import { storiesOf } from '@storybook/react';
import ListChecked32 from '../../../lib/list--checked/32';

storiesOf('ListChecked32', module)
  .add('default', () => <ListChecked32 />)
  .add('with accessibility label', () => (
    <ListChecked32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListChecked32 focusable>
      <title>Icon title</title>
    </ListChecked32>
  ));
