import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoFlickr24 from '../../../es/logo--flickr/24.js';

storiesOf('LogoFlickr24', module)
  .add('default', () => <LogoFlickr24 />)
  .add('with accessibility label', () => (
    <LogoFlickr24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoFlickr24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoFlickr24>
  ));
