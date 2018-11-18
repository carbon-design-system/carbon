import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewFilled20 from '../../../es/view--filled/20.js';

storiesOf('ViewFilled20', module)
  .add('default', () => <ViewFilled20 />)
  .add('with accessibility label', () => (
    <ViewFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </ViewFilled20>
  ));
