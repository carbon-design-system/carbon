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
import { CoachmarkStack } from '.';

import mdx from './CoachmarkStack.mdx';

import styles from './_storybook-styles.scss?inline';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Deprecated/Coachmark/CoachmarkStack',
  component: CoachmarkStack,
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
            <a href="/?path=/docs/patterns-coachmark-stacked--overview">
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

const Template = (args) => {
  const theme = getSelectedCarbonTheme();
  return (
    <CoachmarkStack {...args} theme={theme}>
      <CoachmarkOverlayElements closeButtonLabel={'Got it'}>
        <CoachmarkOverlayElement
          title="Short Coachmark"
          description="As small as it gets."
        />
      </CoachmarkOverlayElements>

      <CoachmarkOverlayElements
        closeButtonLabel="Close"
        nextButtonText="Next"
        previousButtonLabel="Back"
      >
        <CoachmarkOverlayElement
          title="Mid-height Coachmark"
          description={
            <>
              This should be about the same height as the base stack item.
              <br />
              <br />
              This is known as the enrichment phase. Enrichment supports you by
              emulating how an analyst would evaluate a finding—for example, by
              adding context, such as whether a certain piece of data is known
              to be malicious, or is linked...
            </>
          }
          button={
            <CarbonLink href="https://www.ibm.com">Learn more</CarbonLink>
          }
        />
        <CoachmarkOverlayElement
          title="Hello World"
          description="Link opens in new tab."
          button={
            <CarbonLink href="https://www.ibm.com" target="_blank">
              Learn more
            </CarbonLink>
          }
        />
      </CoachmarkOverlayElements>

      <CoachmarkOverlayElements
        closeButtonLabel="Done"
        nextButtonText="Next"
        previousButtonLabel="Back"
      >
        <CoachmarkOverlayElement
          title="Tall Coachmark"
          description="These alerts contain data gathered from your connected security systems."
        />
        <CoachmarkOverlayElement
          title="Alerts contain evidence, known as artifacts"
          description="These help to determine whether the alert is good or bad. And as alerts are added to a case, they become findings."
        />
        <CoachmarkOverlayElement
          title="Findings are enriched with more information and context"
          description={
            <>
              This is known as the enrichment phase. Enrichment supports you by
              emulating how an analyst would evaluate a finding—for example, by
              adding context, such as whether a certain piece of data is known
              to be malicious, or is linked to a known threat.
              <br />
              <br />
              Lets
              <br />
              <br />
              make
              <br />
              <br />
              this
              <br />
              <br />
              one
              <br />
              <br />
              really
              <br />
              <br />
              tall.
            </>
          }
        />
        <CoachmarkOverlayElement
          title="Next, the correlation process takes place"
          description="Based on the results of the enrichment process, findings that are potentially related are grouped together, and then evaluated."
        />
        <CoachmarkOverlayElement
          title="Between enrichment and correlation, the severity of a case is determined"
          description="And once you know the severity, you can easily choose which case to pick up next."
        />
      </CoachmarkOverlayElements>
    </CoachmarkStack>
  );
};

/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */
export const coachmarkStack = Template.bind({});
coachmarkStack.args = {
  className: 'myCoachmarkStack',
  closeButtonLabel: 'Close',
  description: 'This is an example of a description',
  title: 'Example title',
  navLinkLabels: ['Example 1', 'Example 2', 'Example 3'],
  onClose: () => console.log('CLOSE'),
  tagline: 'Why are there two types of severity scores?',
  portalTarget: '#root:not([hidden="true"]) .preview-position-fix',
  closeIconDescription: 'Close',
};
