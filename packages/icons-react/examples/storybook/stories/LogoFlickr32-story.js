import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoFlickr32 from '../../../lib/LogoFlickr/32';

storiesOf('LogoFlickr32', module)
  .add('default', () => <LogoFlickr32 />)
  .add('with accessibility label', () => (
    <LogoFlickr32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoFlickr32 focusable>
      <title>Icon title</title>
    </LogoFlickr32>
  ));
