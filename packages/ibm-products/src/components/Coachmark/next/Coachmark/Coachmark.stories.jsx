/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState, useRef } from 'react';
import { action } from 'storybook/actions';
import { Coachmark } from '.';
import mdx from './Coachmark.mdx';
import styles from './_storybook-styles.scss?inline';
import { Button, Theme } from '@carbon/react';
import { CoachmarkBeacon } from './CoachmarkBeacon';
import { Crossroads } from '@carbon/react/icons';
import { pkg } from '../../../../settings';
import { CoachmarkTagline } from './CoachmarkTagline';

export default {
  title: 'Preview/Onboarding/Coachmark',
  component: Coachmark,
  subcomponents: {
    CoachmarkContent: Coachmark.Content,
    CoachmarkContentHeader: Coachmark.ContentHeader,
    CoachmarkContentBody: Coachmark.ContentBody,
    CoachmarkBeacon,
    CoachmarkTagline,
  },
  tags: ['autodocs', 'Onboarding'],
  argTypes: {
    children: {
      control: { type: null },
    },
    onClose: {
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
  },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

/**
 * TODO: Declare template(s) for one or more scenarios.
 */

//fetching theme
function useCarbonTheme() {
  const [themeValue, setThemeValue] = useState(() =>
    document.documentElement.getAttribute('data-carbon-theme')
  );

  useEffect(() => {
    const target = document.documentElement;

    // function to read the current theme
    const readTheme = () => {
      const newTheme = target.getAttribute('data-carbon-theme');
      setThemeValue((prev) => (prev !== newTheme ? newTheme : prev));
    };

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-carbon-theme'
        ) {
          readTheme();
        }
      }
    });

    observer.observe(target, {
      attributes: true,
      attributeFilter: ['data-carbon-theme'],
    });

    //fallback - check readTheme in every 200ms
    const interval = setInterval(readTheme, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return themeValue;
}

//Tooltip variant
const TooltipTemplate = ({ ...args }, context) => {
  const sbDocs = context.viewMode !== 'docs';
  const carbonTheme = sbDocs ? useCarbonTheme() : 'white';
  const [isOpen, setIsOpen] = useState(true);
  const beaconButtonRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    // Return focus to the beacon button after closing
    setTimeout(() => {
      beaconButtonRef.current?.focus();
    }, 0);
  };

  const handleBeaconClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <Theme theme={carbonTheme}>
      <main>
        <Coachmark
          position={{ x: 151, y: 155 }}
          open={isOpen}
          onClose={handleClose}
          {...args}
        >
          <CoachmarkBeacon
            label="Show information"
            buttonProps={{
              onClick: handleBeaconClick,
              id: 'CoachmarkBtn',
              ref: beaconButtonRef,
            }}
          ></CoachmarkBeacon>
          <Coachmark.Content aria-label="Coachmark content">
            <Coachmark.ContentHeader closeIconDescription="Close"></Coachmark.ContentHeader>
            <Coachmark.ContentBody>
              <h2>Hello World</h2>
              <p>this is a description test</p>
              <Button
                size="sm"
                className="coachmark-done-button"
                onClick={action('Done button clicked')}
              >
                Done
              </Button>
            </Coachmark.ContentBody>
          </Coachmark.Content>
        </Coachmark>
      </main>
    </Theme>
  );
};

//Floating variant
const FloatingTemplate = ({ ...args }, context) => {
  const sbDocs = context.viewMode !== 'docs';
  const carbonTheme = sbDocs ? useCarbonTheme() : 'white';
  const [isOpen, setIsOpen] = useState(true);
  const triggerButtonRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    // Return focus to the trigger button after closing
    setTimeout(() => {
      triggerButtonRef.current?.focus();
    }, 0);
  };

  const handleButtonClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <Theme theme={carbonTheme}>
      <main style={{ marginLeft: '100px' }}>
        <Coachmark
          open={isOpen}
          onClose={handleClose}
          floating={true}
          selectorPrimaryFocus={`.${pkg.prefix}--coachmark__next--content-header--drag-icon`}
          {...args}
        >
          <Button
            id="CoachmarkBtn"
            kind="tertiary"
            size="md"
            label="Show information"
            renderIcon={Crossroads}
            onClick={handleButtonClick}
            ref={triggerButtonRef}
          >
            Show information
          </Button>
          <Coachmark.Content aria-label="Coachmark content">
            <Coachmark.ContentHeader
              closeIconDescription="Close"
              dragIconDescription="Drag"
              dragAriaLabel="Coachmark is being dragged"
            ></Coachmark.ContentHeader>
            <Coachmark.ContentBody>
              <h2>Hello World</h2>
              <p>this is a description test</p>
              <Button size="sm" onClick={action('Done button clicked')}>
                Done
              </Button>
            </Coachmark.ContentBody>
          </Coachmark.Content>
        </Coachmark>
      </main>
    </Theme>
  );
};

/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */
export const Tooltip = TooltipTemplate.bind({});
Tooltip.args = {
  align: 'top',
};

export const Floating = FloatingTemplate.bind({});
Floating.args = {
  align: 'bottom',
};
