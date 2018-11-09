import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderHamburger16 from '../../../lib/HeaderHamburger/16';

storiesOf('HeaderHamburger16', module)
  .add('default', () => <HeaderHamburger16 />)
  .add('with accessibility label', () => (
    <HeaderHamburger16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderHamburger16 focusable>
      <title>Icon title</title>
    </HeaderHamburger16>
  ));
