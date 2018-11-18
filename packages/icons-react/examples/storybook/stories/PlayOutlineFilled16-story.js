import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutlineFilled16 from '../../../es/play--outline--filled/16.js';

storiesOf('PlayOutlineFilled16', module)
  .add('default', () => <PlayOutlineFilled16 />)
  .add('with accessibility label', () => (
    <PlayOutlineFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutlineFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </PlayOutlineFilled16>
  ));
