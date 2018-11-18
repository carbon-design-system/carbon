import React from 'react';
import { storiesOf } from '@storybook/react';
import InformationFilled32 from '../../../es/information--filled/32.js';

storiesOf('InformationFilled32', module)
  .add('default', () => <InformationFilled32 />)
  .add('with accessibility label', () => (
    <InformationFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <InformationFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </InformationFilled32>
  ));
