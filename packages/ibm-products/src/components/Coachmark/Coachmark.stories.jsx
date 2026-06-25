/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
// TODO: import action to handle events if required.
// import { action } from 'storybook/actions';
import { Crossroads } from '@carbon/react/icons';
import { getSelectedCarbonTheme } from '../../global/js/utils/story-helper';

import {
  previewCandidate__Coachmark as Coachmark,
  previewCandidate__CoachmarkOverlayElement as CoachmarkOverlayElement,
  previewCandidate__CoachmarkOverlayElements as CoachmarkOverlayElements,
  previewCandidate__CoachmarkBeacon as CoachmarkBeacon,
  previewCandidate__CoachmarkButton as CoachmarkButton,
} from '..';

import { BEACON_KIND, COACHMARK_OVERLAY_KIND } from './utils/enums';

import mdx from './Coachmark.mdx';

import styles from './_storybook-styles.scss?inline';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Deprecated/Coachmark/Coachmark',
  component: Coachmark,
  tags: ['autodocs', 'Onboarding'],
  argTypes: {
    theme: {
      control: { type: null },
    },
    target: {
      control: { type: null },
    },
    children: {
      control: { type: null },
    },
    onClose: {
      control: { type: null },
    },
    overlayKind: {
      control: { type: null },
    },
    overlayRef: {
      control: { type: null },
    },
    portalTarget: {
      control: { type: null },
    },
    overlayClassName: {
      control: { type: null },
    },
    align: {
      options: [
        'top',
        'top-left',
        'top-right',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'left-bottom',
        'left-top',
        'right',
        'right-bottom',
        'right-top',
      ],
      control: { type: 'select' },
    },
    className: {
      control: { type: null },
    },
    closeIconDescription: {
      control: { type: 'text' },
      description: 'Tooltip text and aria label for the Close button icon.',
    },
  },
  decorators: [
    (story) => (
      <Annotation
        type="deprecation-notice"
        text={
          <div>
            This component is deprecated and will be removed in the next major
            version. Please migrate to {/* cspell:disable-next-line */}
            <a href="/?path=/docs/preview-onboarding-coachmark--overview">
              composable Coachmark
            </a>
            .
          </div>
        }
      >
        {story()}
      </Annotation>
    ),
  ],
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: mdx,
    },
  },
};

/**
 * TODO: Declare template(s) for one or more scenarios.
 */
const Template = (args) => {
  const ref = useRef(undefined);

  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
  });
  const theme = getSelectedCarbonTheme();
  const content = (
    <Coachmark {...args} theme={theme}>
      <CoachmarkOverlayElements closeButtonLabel="Done">
        <CoachmarkOverlayElement
          title="Hello World"
          description="this is a description test"
        />
      </CoachmarkOverlayElements>
    </Coachmark>
  );

  return !['fixed', 'floating', 'stacked'].includes(args.overlayKind) ? (
    <div style={{ width: '1000px', height: '500px' }}>
      <div
        style={{
          position: 'absolute',
          top: '250px',
          left: '150px',
        }}
        ref={ref}
      >
        {content}
      </div>
    </div>
  ) : (
    content
  );
};

/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */
export const tooltip = Template.bind({});
tooltip.args = {
  theme: 'dark',
  align: 'bottom',
  closeIconDescription: 'Close',
  positionTune: { x: 0, y: 0 },
  target: (
    <CoachmarkBeacon label="Show information" kind={BEACON_KIND.DEFAULT} />
  ),
};

export const floating = Template.bind({});
floating.args = {
  theme: 'dark',
  align: 'bottom',
  closeIconDescription: 'Close',
  overlayKind: COACHMARK_OVERLAY_KIND.FLOATING,
  target: (
    <CoachmarkButton
      kind="tertiary"
      size="md"
      label="Show information"
      renderIcon={Crossroads}
    >
      Click Me
    </CoachmarkButton>
  ),
};
