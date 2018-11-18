import React from 'react';
import { storiesOf } from '@storybook/react';
import PresentationFile24 from '../../../es/presentation-file/24.js';

storiesOf('PresentationFile24', module)
  .add('default', () => <PresentationFile24 />)
  .add('with accessibility label', () => (
    <PresentationFile24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PresentationFile24 aria-label="Icon label">
      <title>Icon title</title>
    </PresentationFile24>
  ));
