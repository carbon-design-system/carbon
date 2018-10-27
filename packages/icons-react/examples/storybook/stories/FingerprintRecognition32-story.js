import React from 'react';
import { storiesOf } from '@storybook/react';
import FingerprintRecognition32 from '../../../lib/fingerprint-recognition/32';

storiesOf('FingerprintRecognition32', module)
  .add('default', () => <FingerprintRecognition32 />)
  .add('with accessibility label', () => (
    <FingerprintRecognition32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FingerprintRecognition32 focusable>
      <title>Icon title</title>
    </FingerprintRecognition32>
  ));
