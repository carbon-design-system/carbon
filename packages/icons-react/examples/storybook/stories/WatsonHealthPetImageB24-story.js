import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPetImageB24 from '../../../es/watson-health/pet-image--B/24.js';

storiesOf('WatsonHealthPetImageB24', module)
  .add('default', () => <WatsonHealthPetImageB24 />)
  .add('with accessibility label', () => (
    <WatsonHealthPetImageB24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPetImageB24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPetImageB24>
  ));
