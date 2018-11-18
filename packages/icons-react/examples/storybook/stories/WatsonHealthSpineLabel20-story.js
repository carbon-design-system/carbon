import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSpineLabel20 from '../../../es/watson-health/spine-label/20.js';

storiesOf('WatsonHealthSpineLabel20', module)
  .add('default', () => <WatsonHealthSpineLabel20 />)
  .add('with accessibility label', () => (
    <WatsonHealthSpineLabel20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSpineLabel20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSpineLabel20>
  ));
