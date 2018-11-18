import React from 'react';
import { storiesOf } from '@storybook/react';
import Translate20 from '../../../es/translate/20.js';

storiesOf('Translate20', module)
  .add('default', () => <Translate20 />)
  .add('with accessibility label', () => (
    <Translate20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Translate20 aria-label="Icon label">
      <title>Icon title</title>
    </Translate20>
  ));
