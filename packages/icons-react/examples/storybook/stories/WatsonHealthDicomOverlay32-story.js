import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthDicomOverlay32 from '../../../es/watson-health/dicom--overlay/32.js';

storiesOf('WatsonHealthDicomOverlay32', module)
  .add('default', () => <WatsonHealthDicomOverlay32 />)
  .add('with accessibility label', () => (
    <WatsonHealthDicomOverlay32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthDicomOverlay32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthDicomOverlay32>
  ));
