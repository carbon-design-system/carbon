import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchBarrier32 from '../../../lib/Q-research--barrier/32';

storiesOf('QResearchBarrier32', module)
  .add('default', () => <QResearchBarrier32 />)
  .add('with accessibility label', () => (
    <QResearchBarrier32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchBarrier32 focusable>
      <title>Icon title</title>
    </QResearchBarrier32>
  ));
