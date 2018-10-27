import React from 'react';
import { storiesOf } from '@storybook/react';
import InfoSolid16 from '../../../lib/info--solid/16';

storiesOf('InfoSolid16', module)
  .add('default', () => <InfoSolid16 />)
  .add('with accessibility label', () => (
    <InfoSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <InfoSolid16 focusable>
      <title>Icon title</title>
    </InfoSolid16>
  ));
