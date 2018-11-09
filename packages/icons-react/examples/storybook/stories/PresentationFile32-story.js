import React from 'react';
import { storiesOf } from '@storybook/react';
import PresentationFile32 from '../../../lib/PresentationFile/32';

storiesOf('PresentationFile32', module)
  .add('default', () => <PresentationFile32 />)
  .add('with accessibility label', () => (
    <PresentationFile32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PresentationFile32 focusable>
      <title>Icon title</title>
    </PresentationFile32>
  ));
