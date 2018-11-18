import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutlineFilled24 from '../../../es/play--outline--filled/24.js';

storiesOf('PlayOutlineFilled24', module)
  .add('default', () => <PlayOutlineFilled24 />)
  .add('with accessibility label', () => (
    <PlayOutlineFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutlineFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </PlayOutlineFilled24>
  ));
