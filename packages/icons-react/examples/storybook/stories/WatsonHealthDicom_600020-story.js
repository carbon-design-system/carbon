import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthDicom_600020 from '../../../es/watson-health/dicom--6000/20.js';

storiesOf('WatsonHealthDicom_600020', module)
  .add('default', () => <WatsonHealthDicom_600020 />)
  .add('with accessibility label', () => (
    <WatsonHealthDicom_600020 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthDicom_600020 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthDicom_600020>
  ));
