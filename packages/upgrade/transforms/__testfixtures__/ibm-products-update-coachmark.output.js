import { Theme, Button } from "@carbon/react";
import React, { useState } from 'react';
import {
  preview__Coachmark as Coachmark,
  preview__CoachmarkBeacon as CoachmarkBeacon,
} from '@carbon/ibm-products';
import { Crossroads } from '@carbon/react/icons';

// Example 1: Basic Coachmark with Beacon and dark theme
export const Example1 = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleBeaconClick = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <Theme theme="white"><Coachmark align="bottom" position={{ x: 0, y: 0 }} open={isOpen}><CoachmarkBeacon
          label="Show information"
          buttonProps={{
            onClick: handleBeaconClick,
            id: "CoachmarkBtn"
          }} /><Coachmark.Content><Coachmark.Content.Header closeIconDescription="Close" /><Coachmark.Content.Body><h2>Hello World</h2><p>this is a description test</p><Button size="sm">Done</Button></Coachmark.Content.Body></Coachmark.Content></Coachmark></Theme>
  );
};

// Example 2: Coachmark with Button target and light theme
export const Example2 = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleButtonClick = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <Theme theme="white"><Coachmark align="top" position={{ x: 10, y: 20 }} open={isOpen}><Button
          id="CoachmarkTriggerRefBtn"
          onClick={handleButtonClick}
          kind="tertiary"
          size="md"
          renderIcon={Crossroads}>Click Me
                </Button><Coachmark.Content><Coachmark.Content.Header closeIconDescription="Close" /><Coachmark.Content.Body><h2>Welcome</h2><p>This is your dashboard</p><Button size="sm">Got it</Button></Coachmark.Content.Body></Coachmark.Content></Coachmark></Theme>
  );
};

// Example 3: Floating Coachmark
export const Example3 = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleBeaconClick = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <Theme theme="g90"><Coachmark
        align="bottom-left"
        position={{ x: 5, y: 5 }}
        open={isOpen}
        floating={true}><CoachmarkBeacon
          label="Learn more"
          buttonProps={{
            onClick: handleBeaconClick,
            id: "CoachmarkBtn"
          }} /><Coachmark.Content><Coachmark.Content.Header closeIconDescription="Dismiss" /><Coachmark.Content.Body><h2>New Feature</h2><p>Check out this new feature</p><Button size="sm">Close</Button></Coachmark.Content.Body></Coachmark.Content></Coachmark></Theme>
  );
};
