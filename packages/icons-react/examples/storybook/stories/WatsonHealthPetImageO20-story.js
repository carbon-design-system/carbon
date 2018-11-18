import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPetImageO20 from '../../../es/watson-health/pet-image--O/20.js';

storiesOf('WatsonHealthPetImageO20', module)
  .add('default', () => <WatsonHealthPetImageO20 />)
  .add('with accessibility label', () => (
    <WatsonHealthPetImageO20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPetImageO20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPetImageO20>
  ));
