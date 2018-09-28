import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthDicom_600032 from '../../../lib/watson-health--dicom--6000/32';

storiesOf('WatsonHealthDicom_600032', module).add('default', () => (
  <WatsonHealthDicom_600032 />
));
