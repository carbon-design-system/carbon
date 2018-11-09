import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDissatisfied32 from '../../../lib/FaceDissatisfied/32';

storiesOf('FaceDissatisfied32', module)
  .add('default', () => <FaceDissatisfied32 />)
  .add('with accessibility label', () => (
    <FaceDissatisfied32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDissatisfied32 focusable>
      <title>Icon title</title>
    </FaceDissatisfied32>
  ));
