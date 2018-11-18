import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPetImageO24 from '../../../es/watson-health/pet-image--O/24.js';

storiesOf('WatsonHealthPetImageO24', module)
  .add('default', () => <WatsonHealthPetImageO24 />)
  .add('with accessibility label', () => (
    <WatsonHealthPetImageO24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPetImageO24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPetImageO24>
  ));
