import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningSolid16 from '../../../lib/warning--solid/16';

storiesOf('WarningSolid16', module)
  .add('default', () => <WarningSolid16 />)
  .add('with accessibility label', () => (
    <WarningSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningSolid16 focusable>
      <title>Icon title</title>
    </WarningSolid16>
  ));
