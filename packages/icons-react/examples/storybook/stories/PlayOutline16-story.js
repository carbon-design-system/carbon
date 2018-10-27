import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutline16 from '../../../lib/play--outline/16';

storiesOf('PlayOutline16', module)
  .add('default', () => <PlayOutline16 />)
  .add('with accessibility label', () => (
    <PlayOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutline16 focusable>
      <title>Icon title</title>
    </PlayOutline16>
  ));
