import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutlineFilled20 from '../../../es/play--outline--filled/20.js';

storiesOf('PlayOutlineFilled20', module)
  .add('default', () => <PlayOutlineFilled20 />)
  .add('with accessibility label', () => (
    <PlayOutlineFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutlineFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </PlayOutlineFilled20>
  ));
