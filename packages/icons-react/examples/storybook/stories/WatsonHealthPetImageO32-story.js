import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPetImageO32 from '../../../lib/WatsonHealthPetImageO/32';

storiesOf('WatsonHealthPetImageO32', module)
  .add('default', () => <WatsonHealthPetImageO32 />)
  .add('with accessibility label', () => (
    <WatsonHealthPetImageO32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPetImageO32 focusable>
      <title>Icon title</title>
    </WatsonHealthPetImageO32>
  ));
