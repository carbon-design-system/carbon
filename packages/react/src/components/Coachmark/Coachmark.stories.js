/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import React, { useEffect, useRef, useState } from 'react';
import { action } from 'storybook/actions';
import { Coachmark } from '.';
import { CoachmarkBeacon } from './CoachmarkBeacon';
import { CoachmarkTagline } from './CoachmarkTagline';
import Button from '../Button';
import { Theme } from '../Theme';
import { Crossroads } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import mdx from './Coachmark.mdx';

// Reads the data-carbon-theme attribute so each story honours theme switching.
function useCarbonTheme() {
  const [themeValue, setThemeValue] = useState(() =>
    document.documentElement.getAttribute('data-carbon-theme')
  );

  useEffect(() => {
    const target = document.documentElement;

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

    const interval = setInterval(readTheme, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return themeValue;
}

export default {
  title: 'Components/Coachmark',
  component: Coachmark,
  subcomponents: {
    CoachmarkContent: Coachmark.Content,
    CoachmarkContentHeader: Coachmark.ContentHeader,
    CoachmarkContentBody: Coachmark.ContentBody,
    CoachmarkBeacon,
    CoachmarkTagline,
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
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
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
};

// Tooltip (beacon-triggered) variant
export const Tooltip = (args, context) => {
  const sbDocs = context.viewMode !== 'docs';
  const carbonTheme = sbDocs ? useCarbonTheme() : 'white';
  const [isOpen, setIsOpen] = useState(true);
  const beaconButtonRef = useRef(null);

  const handleClose = () => setIsOpen(false);
  const handleBeaconClick = () => setIsOpen((prev) => !prev);

  return (
    <Theme theme={carbonTheme}>
      <main>
        <Coachmark
          position={{ x: 151, y: 155 }}
          open={isOpen}
          onClose={handleClose}
          launcherButtonRef={beaconButtonRef}
          {...args}>
          <CoachmarkBeacon
            label="Show information"
            buttonProps={{
              onClick: handleBeaconClick,
              id: 'CoachmarkBtn',
              ref: beaconButtonRef,
            }}
          />
          <Coachmark.Content>
            <Coachmark.ContentHeader closeIconDescription="Close" />
            <Coachmark.ContentBody>
              <h2>Hello World</h2>
              <p>this is a description test</p>
              <Button
                size="sm"
                className="coachmark-done-button"
                onClick={action('Done button clicked')}>
                Done
              </Button>
            </Coachmark.ContentBody>
          </Coachmark.Content>
        </Coachmark>
      </main>
    </Theme>
  );
};
Tooltip.args = {
  align: 'top',
};

// Floating (draggable) variant
export const Floating = (args, context) => {
  const sbDocs = context.viewMode !== 'docs';
  const carbonTheme = sbDocs ? useCarbonTheme() : 'white';
  const [isOpen, setIsOpen] = useState(true);
  const triggerButtonRef = useRef(null);
  const prefix = usePrefix();

  const handleClose = () => setIsOpen(false);
  const handleButtonClick = () => setIsOpen((prev) => !prev);

  return (
    <Theme theme={carbonTheme}>
      <main style={{ marginLeft: '100px', paddingBlockStart: '50vh' }}>
        <Coachmark
          open={isOpen}
          onClose={handleClose}
          floating={true}
          selectorPrimaryFocus={`.${prefix}--coachmark--content-header--drag-icon`}
          launcherButtonRef={triggerButtonRef}
          {...args}>
          <Button
            id="CoachmarkBtn"
            kind="tertiary"
            size="md"
            renderIcon={Crossroads}
            onClick={handleButtonClick}
            ref={triggerButtonRef}>
            Show information
          </Button>
          <Coachmark.Content>
            <Coachmark.ContentHeader
              closeIconDescription="Close"
              dragIconDescription="Drag"
              dragAriaLabel="Coachmark is being dragged"
            />
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
Floating.args = {
  align: 'bottom',
};
