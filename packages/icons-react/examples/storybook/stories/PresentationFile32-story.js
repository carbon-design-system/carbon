import React from 'react';
import { storiesOf } from '@storybook/react';
import PresentationFile32 from '../../../es/presentation-file/32.js';

storiesOf('PresentationFile32', module)
  .add('default', () => <PresentationFile32 />)
  .add('with accessibility label', () => (
    <PresentationFile32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PresentationFile32 aria-label="Icon label">
      <title>Icon title</title>
    </PresentationFile32>
  ));
