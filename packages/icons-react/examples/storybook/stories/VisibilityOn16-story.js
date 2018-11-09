import React from 'react';
import { storiesOf } from '@storybook/react';
import VisibilityOn16 from '../../../lib/VisibilityOn/16';

storiesOf('VisibilityOn16', module)
  .add('default', () => <VisibilityOn16 />)
  .add('with accessibility label', () => (
    <VisibilityOn16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VisibilityOn16 focusable>
      <title>Icon title</title>
    </VisibilityOn16>
  ));
