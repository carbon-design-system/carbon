import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPetImageB20 from '../../../es/watson-health/pet-image--B/20.js';

storiesOf('WatsonHealthPetImageB20', module)
  .add('default', () => <WatsonHealthPetImageB20 />)
  .add('with accessibility label', () => (
    <WatsonHealthPetImageB20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPetImageB20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPetImageB20>
  ));
