import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutlineFilled32 from '../../../es/play--outline--filled/32.js';

storiesOf('PlayOutlineFilled32', module)
  .add('default', () => <PlayOutlineFilled32 />)
  .add('with accessibility label', () => (
    <PlayOutlineFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutlineFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </PlayOutlineFilled32>
  ));
