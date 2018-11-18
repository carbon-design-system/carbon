import React from 'react';
import { storiesOf } from '@storybook/react';
import PresentationFile20 from '../../../es/presentation-file/20.js';

storiesOf('PresentationFile20', module)
  .add('default', () => <PresentationFile20 />)
  .add('with accessibility label', () => (
    <PresentationFile20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PresentationFile20 aria-label="Icon label">
      <title>Icon title</title>
    </PresentationFile20>
  ));
