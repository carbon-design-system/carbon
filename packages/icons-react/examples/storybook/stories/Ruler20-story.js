import React from 'react';
import { storiesOf } from '@storybook/react';
import Ruler20 from '../../../es/ruler/20.js';

storiesOf('Ruler20', module)
  .add('default', () => <Ruler20 />)
  .add('with accessibility label', () => (
    <Ruler20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Ruler20 aria-label="Icon label">
      <title>Icon title</title>
    </Ruler20>
  ));
