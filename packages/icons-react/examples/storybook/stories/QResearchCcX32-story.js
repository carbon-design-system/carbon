import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchCcX32 from '../../../lib/QResearchCcX/32';

storiesOf('QResearchCcX32', module)
  .add('default', () => <QResearchCcX32 />)
  .add('with accessibility label', () => (
    <QResearchCcX32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchCcX32 focusable>
      <title>Icon title</title>
    </QResearchCcX32>
  ));
