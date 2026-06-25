/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// TODO: import action to handle events if required.
// import { action } from 'storybook/actions';
import { Link as CarbonLink } from '@carbon/react';
import { getSelectedCarbonTheme } from '../../global/js/utils/story-helper';

import {
  previewCandidate__CoachmarkOverlayElement as CoachmarkOverlayElement,
  previewCandidate__CoachmarkOverlayElements as CoachmarkOverlayElements,
} from '..';
import { CoachmarkFixed } from '.';
import mdx from './CoachmarkFixed.mdx';

import styles from './_storybook-styles.scss?inline';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Deprecated/Coachmark/CoachmarkFixed',
  component: CoachmarkFixed,
  tags: ['autodocs', 'Onboarding'],
  // TODO: Define argTypes for props not represented by standard JS types.
  argTypes: {
    children: {
      control: { type: null },
    },
    portalTarget: {
      control: { type: null },
    },
    theme: {
      control: { type: null },
    },
  },
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (story) => (
      <Annotation
        type="deprecation-notice"
        text={
          <div>
            This component is deprecated and will be removed in the next major
            version. This can be created as{' '}
            <a href="/?path=/docs/patterns-coachmark-fixed--overview">
              pattern
            </a>{' '}
            using new composable coachmark, carousel utility and other carbon
            components.
          </div>
        }
      >
        {story()}
      </Annotation>
    ),
  ],
};

/**
 * TODO: Declare template(s) for one or more scenarios.
 */
const Template = (args) => {
  const theme = getSelectedCarbonTheme();
  return (
    <CoachmarkFixed {...args} theme={theme}>
      <CoachmarkOverlayElements
        closeButtonLabel="Done"
        nextButtonText="Next"
        previousButtonLabel="Back"
      >
        <CoachmarkOverlayElement
          title="Hello World"
          description="Link opens in new tab."
          button={
            <CarbonLink href="https://www.ibm.com" target="_blank">
              Learn more
            </CarbonLink>
          }
        />
        <CoachmarkOverlayElement
          title="Hello World 2"
          description="Link opens on this page."
          button={
            <CarbonLink href="https://www.ibm.com">Learn more</CarbonLink>
          }
        />
      </CoachmarkOverlayElements>
    </CoachmarkFixed>
  );
};

/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */
export const coachmarkFixed = Template.bind({});
coachmarkFixed.args = {
  tagline: 'Why are there two types of severity scores?',
  onClose: () => console.log('CLOSE'),
  portalTarget: '#root:not([hidden="true"])',
  className: 'myCoachmarkFixed',
  closeIconDescription: 'Close',
};
