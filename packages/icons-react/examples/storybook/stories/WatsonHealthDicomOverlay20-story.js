import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthDicomOverlay20 from '../../../es/watson-health/dicom--overlay/20.js';

storiesOf('WatsonHealthDicomOverlay20', module)
  .add('default', () => <WatsonHealthDicomOverlay20 />)
  .add('with accessibility label', () => (
    <WatsonHealthDicomOverlay20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthDicomOverlay20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthDicomOverlay20>
  ));
