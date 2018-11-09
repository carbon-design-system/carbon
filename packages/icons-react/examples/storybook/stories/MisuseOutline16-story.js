import React from 'react';
import { storiesOf } from '@storybook/react';
import MisuseOutline16 from '../../../lib/MisuseOutline/16';

storiesOf('MisuseOutline16', module)
  .add('default', () => <MisuseOutline16 />)
  .add('with accessibility label', () => (
    <MisuseOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MisuseOutline16 focusable>
      <title>Icon title</title>
    </MisuseOutline16>
  ));
