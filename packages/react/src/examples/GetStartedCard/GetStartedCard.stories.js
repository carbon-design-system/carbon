/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './example/styles/_story-styles.scss';
import DocsPage from './GetStartedCard.mdx';
import { Default } from './example/preview-components/Default';
import { WithSequence } from './example/preview-components/WithSequence';
import { WithMediaAndPictogram } from './example/preview-components/WithMediaAndPictogram';
import { WithMediaAndSequence } from './example/preview-components/WithMediaAndSequence';
import { WithHorizontalMedia } from './example/preview-components/WithHorizontalMedia';
import { WithAILabelAndActions } from './example/preview-components/WithAILabelAndActions';
import { WithDisabled } from './example/preview-components/WithDisabled';

export default {
  title: 'Examples/GetStartedCard',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

const DefaultTemplate = (args) => {
  return <Default {...args} />;
};

export const defaultCard = DefaultTemplate.bind({});
defaultCard.storyName = 'Default';
defaultCard.args = {
  label: 'Label',
  title: 'Title',
  disabled: false,
};

const WithSequenceTemplate = (args) => {
  return <WithSequence {...args} />;
};

export const withSequence = WithSequenceTemplate.bind({});
withSequence.storyName = 'With sequence';
withSequence.args = {
  label: 'Label',
  title: 'Title',
  sequence: 3,
  disabled: false,
};

const WithMediaAndPictogramTemplate = (args) => {
  return <WithMediaAndPictogram {...args} />;
};

export const withMediaAndPictogram = WithMediaAndPictogramTemplate.bind({});
withMediaAndPictogram.storyName = 'With media and pictogram';
withMediaAndPictogram.args = {
  label: 'Label',
  title: 'Title',
  disabled: false,
};

const WithMediaAndSequenceTemplate = (args) => {
  return <WithMediaAndSequence {...args} />;
};

export const withMediaAndSequence = WithMediaAndSequenceTemplate.bind({});
withMediaAndSequence.storyName = 'With media and sequence';
withMediaAndSequence.args = {
  label: 'Label',
  title: 'Title',
  sequence: 3,
  disabled: false,
};

const WithHorizontalMediaTemplate = (args) => {
  return <WithHorizontalMedia {...args} />;
};

export const withHorizontalMedia = WithHorizontalMediaTemplate.bind({});
withHorizontalMedia.storyName = 'With horizontal media';
withHorizontalMedia.args = {
  label: 'Label',
  title: 'Get start card example content goes here',
  disabled: false,
};

const WithAILabelAndActionsTemplate = (args) => {
  return <WithAILabelAndActions {...args} />;
};

export const withAILabelAndActions = WithAILabelAndActionsTemplate.bind({});
withAILabelAndActions.storyName = 'With AI label and actions';
withAILabelAndActions.args = {
  label: 'Label',
  title: 'Get start card example content goes here',
  disabled: false,
};

const WithDisabledTemplate = () => {
  return <WithDisabled />;
};

export const withDisabled = WithDisabledTemplate.bind({});
withDisabled.storyName = 'With disabled';
