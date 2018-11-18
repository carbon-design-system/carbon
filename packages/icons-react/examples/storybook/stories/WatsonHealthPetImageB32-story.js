import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPetImageB32 from '../../../es/watson-health/pet-image--B/32.js';

storiesOf('WatsonHealthPetImageB32', module)
  .add('default', () => <WatsonHealthPetImageB32 />)
  .add('with accessibility label', () => (
    <WatsonHealthPetImageB32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPetImageB32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPetImageB32>
  ));
