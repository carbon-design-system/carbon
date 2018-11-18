import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewFilled24 from '../../../es/view--filled/24.js';

storiesOf('ViewFilled24', module)
  .add('default', () => <ViewFilled24 />)
  .add('with accessibility label', () => (
    <ViewFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </ViewFilled24>
  ));
