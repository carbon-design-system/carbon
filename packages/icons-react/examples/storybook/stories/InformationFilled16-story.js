import React from 'react';
import { storiesOf } from '@storybook/react';
import InformationFilled16 from '../../../lib/InformationFilled/16';

storiesOf('InformationFilled16', module)
  .add('default', () => <InformationFilled16 />)
  .add('with accessibility label', () => (
    <InformationFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <InformationFilled16 focusable>
      <title>Icon title</title>
    </InformationFilled16>
  ));
