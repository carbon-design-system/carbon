import React from 'react';
import { storiesOf } from '@storybook/react';
import InformationFilled24 from '../../../es/information--filled/24.js';

storiesOf('InformationFilled24', module)
  .add('default', () => <InformationFilled24 />)
  .add('with accessibility label', () => (
    <InformationFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <InformationFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </InformationFilled24>
  ));
