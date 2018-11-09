import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningOutline16 from '../../../lib/WarningOutline/16';

storiesOf('WarningOutline16', module)
  .add('default', () => <WarningOutline16 />)
  .add('with accessibility label', () => (
    <WarningOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningOutline16 focusable>
      <title>Icon title</title>
    </WarningOutline16>
  ));
