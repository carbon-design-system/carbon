import React from 'react';
import {
  Coachmark,
  CoachmarkBeacon,
  CoachmarkButton,
  CoachmarkOverlayElements,
  CoachmarkOverlayElement,
  BEACON_KIND,
  COACHMARK_OVERLAY_KIND,
} from '@carbon/ibm-products';
import { Crossroads } from '@carbon/react/icons';

// Example 1: Basic Coachmark with Beacon and dark theme
export const Example1 = () => (
  <Coachmark
    align="bottom"
    closeIconDescription="Close"
    positionTune={{ x: 0, y: 0 }}
    target={
      <CoachmarkBeacon label="Show information" kind={BEACON_KIND.DEFAULT} />
    }
    theme="light">
    <CoachmarkOverlayElements closeButtonLabel="Done">
      <CoachmarkOverlayElement
        title="Hello World"
        description="this is a description test"
      />
    </CoachmarkOverlayElements>
  </Coachmark>
);

// Example 2: Coachmark with Button target and light theme
export const Example2 = () => (
  <Coachmark
    align="top"
    closeIconDescription="Close"
    positionTune={{ x: 10, y: 20 }}
    target={
      <CoachmarkButton
        kind="tertiary"
        size="md"
        label="Show information"
        renderIcon={Crossroads}>
        Click Me
      </CoachmarkButton>
    }
    theme="light">
    <CoachmarkOverlayElements closeButtonLabel="Got it">
      <CoachmarkOverlayElement
        title="Welcome"
        description="This is your dashboard"
      />
    </CoachmarkOverlayElements>
  </Coachmark>
);

// Example 3: Floating Coachmark
export const Example3 = () => (
  <Coachmark
    align="bottom-left"
    closeIconDescription="Dismiss"
    positionTune={{ x: 5, y: 5 }}
    overlayKind={COACHMARK_OVERLAY_KIND.FLOATING}
    target={<CoachmarkBeacon label="Learn more" kind={BEACON_KIND.DEFAULT} />}
    theme="dark">
    <CoachmarkOverlayElements closeButtonLabel="Close">
      <CoachmarkOverlayElement
        title="New Feature"
        description="Check out this new feature"
      />
    </CoachmarkOverlayElements>
  </Coachmark>
);
