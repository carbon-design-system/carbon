import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPetImageO32 from '../../../es/watson-health/pet-image--O/32.js';

storiesOf('WatsonHealthPetImageO32', module)
  .add('default', () => <WatsonHealthPetImageO32 />)
  .add('with accessibility label', () => (
    <WatsonHealthPetImageO32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPetImageO32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPetImageO32>
  ));
