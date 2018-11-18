import React from 'react';
import { storiesOf } from '@storybook/react';
import InformationFilled20 from '../../../es/information--filled/20.js';

storiesOf('InformationFilled20', module)
  .add('default', () => <InformationFilled20 />)
  .add('with accessibility label', () => (
    <InformationFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <InformationFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </InformationFilled20>
  ));
