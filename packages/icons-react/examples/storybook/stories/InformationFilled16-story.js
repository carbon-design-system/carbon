import React from 'react';
import { storiesOf } from '@storybook/react';
import InformationFilled16 from '../../../es/information--filled/16.js';

storiesOf('InformationFilled16', module)
  .add('default', () => <InformationFilled16 />)
  .add('with accessibility label', () => (
    <InformationFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <InformationFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </InformationFilled16>
  ));
