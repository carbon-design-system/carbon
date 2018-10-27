import React from 'react';
import { storiesOf } from '@storybook/react';
import Template32 from '../../../lib/template/32';

storiesOf('Template32', module)
  .add('default', () => <Template32 />)
  .add('with accessibility label', () => (
    <Template32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Template32 focusable>
      <title>Icon title</title>
    </Template32>
  ));
