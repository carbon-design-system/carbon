import React from 'react';
import { storiesOf } from '@storybook/react';
import InformationFilled32 from '../../../lib/information--filled/32';

storiesOf('InformationFilled32', module)
  .add('default', () => <InformationFilled32 />)
  .add('with accessibility label', () => (
    <InformationFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <InformationFilled32 focusable>
      <title>Icon title</title>
    </InformationFilled32>
  ));
