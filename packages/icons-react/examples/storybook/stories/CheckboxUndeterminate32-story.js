import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxUndeterminate32 from '../../../lib/CheckboxUndeterminate/32';

storiesOf('CheckboxUndeterminate32', module)
  .add('default', () => <CheckboxUndeterminate32 />)
  .add('with accessibility label', () => (
    <CheckboxUndeterminate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxUndeterminate32 focusable>
      <title>Icon title</title>
    </CheckboxUndeterminate32>
  ));
