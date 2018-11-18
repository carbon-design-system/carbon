import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoFlickr20 from '../../../es/logo--flickr/20.js';

storiesOf('LogoFlickr20', module)
  .add('default', () => <LogoFlickr20 />)
  .add('with accessibility label', () => (
    <LogoFlickr20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoFlickr20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoFlickr20>
  ));
