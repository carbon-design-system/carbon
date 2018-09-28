import React from 'react';
import { storiesOf } from '@storybook/react';
import FingerprintRecognition32 from '../../../lib/fingerprint-recognition/32';

storiesOf('FingerprintRecognition32', module).add('default', () => (
  <FingerprintRecognition32 />
));
