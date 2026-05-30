/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { action } from 'storybook/actions';
import { useReducedMotion } from 'motion/react';
import { animate } from 'motion';
import { durationModerate01, motion as carbonMotion } from '@carbon/motion';
import '../story.scss';
import { default as Accordion, AccordionItem, AccordionSkeleton } from '..';
import Button from '../../Button';
import ButtonSet from '../../ButtonSet';
import { FeatureFlags, useFeatureFlag } from '../../FeatureFlags';
import { WithFeatureFlags } from '../../../../.storybook/templates/WithFeatureFlags';

const sharedArgTypes = {
  align: {
    options: ['start', 'end'],
    control: { type: 'select' },
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  ordered: {
    control: {
      type: 'boolean',
    },
  },
  isFlush: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  onHeadingClick: {
    action: 'onHeadingClick',
    control: false,
  },
};

const sharedArgs = {
  align: 'end',
  disabled: false,
  isFlush: false,
  ordered: false,
  size: 'md',
  onHeadingClick: ({ isOpen, event }) => {
    action('onHeadingClick')({
      isOpen,
      type: event.type,
    });
  },
};

const toSeconds = (durationValue) => Number.parseInt(durationValue, 10) / 1000;
const toMilliseconds = (durationValue) => Number.parseInt(durationValue, 10);
const productiveEntranceBezier = [0, 0, 0.38, 0.9];
const productiveEntranceEasing = carbonMotion('entrance', 'productive');
const revealDelay = 700;
const revealOffset = 8;
const contentOpenDelay = toMilliseconds(durationModerate01);

const baseAccordionItems = (onHeadingClick) => (
  <>
    <AccordionItem title="Choose your plan" onHeadingClick={onHeadingClick}>
      <p>
        Compare plan features and select the option that best matches your
        team&apos;s expected usage.
      </p>
    </AccordionItem>
    <AccordionItem title="Add team members" onHeadingClick={onHeadingClick}>
      <p>
        Invite collaborators by email and assign their workspace roles before
        launch.
      </p>
    </AccordionItem>
    <AccordionItem title="Set payment details" onHeadingClick={onHeadingClick}>
      <p>
        Add billing information and choose whether to receive invoices by email.
      </p>
    </AccordionItem>
    <AccordionItem title="Review and confirm" onHeadingClick={onHeadingClick}>
      <p>
        Check your setup summary, then confirm to create the workspace for your
        team.
      </p>
    </AccordionItem>
  </>
);

const ResearchDemo = ({ args, strategy }) => {
  const enableAccordionMotion = useFeatureFlag('enable-accordion-motion');
  const timeoutRef = React.useRef(null);
  const settleRef = React.useRef(null);
  const openRef = React.useRef(null);
  const runIdRef = React.useRef(0);
  const animationRef = React.useRef([]);
  const skeletonPanelRef = React.useRef(null);
  const accordionPanelRef = React.useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const motionDuration = prefersReducedMotion
    ? 0
    : toSeconds(durationModerate01);
  const motionDurationMs = toMilliseconds(durationModerate01);

  const clearTimers = React.useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (settleRef.current) {
      window.clearTimeout(settleRef.current);
      settleRef.current = null;
    }
    if (openRef.current) {
      window.clearTimeout(openRef.current);
      openRef.current = null;
    }
  }, []);

  const clearAnimations = React.useCallback(() => {
    animationRef.current.forEach((animation) => {
      animation.cancel?.();
    });
    animationRef.current = [];
  }, []);

  const resetInlineStyles = React.useCallback(() => {
    const skeletonPanel = skeletonPanelRef.current;
    const accordionPanel = accordionPanelRef.current;

    if (skeletonPanel) {
      skeletonPanel.style.opacity = '';
      skeletonPanel.style.transform = '';
    }
    if (accordionPanel) {
      accordionPanel.style.opacity = '';
      accordionPanel.style.transform = '';
    }
  }, []);

  const showSkeletonOnly = React.useCallback(() => {
    const skeletonPanel = skeletonPanelRef.current;
    const accordionPanel = accordionPanelRef.current;

    if (!skeletonPanel || !accordionPanel) {
      return;
    }

    skeletonPanel.hidden = false;
    skeletonPanel.classList.add('is-active');
    skeletonPanel.classList.remove('is-hidden');

    accordionPanel.hidden = true;
    accordionPanel.classList.add('is-hidden');
    accordionPanel.classList.remove('is-active');
  }, []);

  const showContentOnly = React.useCallback(() => {
    const skeletonPanel = skeletonPanelRef.current;
    const accordionPanel = accordionPanelRef.current;

    if (!skeletonPanel || !accordionPanel) {
      return;
    }

    skeletonPanel.hidden = true;
    skeletonPanel.classList.add('is-hidden');
    skeletonPanel.classList.remove('is-active');

    accordionPanel.hidden = false;
    accordionPanel.classList.add('is-active');
    accordionPanel.classList.remove('is-hidden');
  }, []);

  const closeOpenAccordionItems = React.useCallback(() => {
    const accordionPanel = accordionPanelRef.current;
    if (!accordionPanel) {
      return;
    }

    accordionPanel
      .querySelectorAll('button[aria-expanded="true"]')
      .forEach((button) => {
        button.click();
      });
  }, []);

  const openFirstAccordionItem = React.useCallback((runId) => {
    const accordionPanel = accordionPanelRef.current;
    if (!accordionPanel || runId !== runIdRef.current) {
      return;
    }

    const firstHeading = accordionPanel.querySelector('button[aria-expanded]');
    if (
      !firstHeading ||
      firstHeading.getAttribute('aria-expanded') === 'true'
    ) {
      return;
    }
    firstHeading.click();
  }, []);

  const runNativeReveal = React.useCallback(
    (runId) => {
      const skeletonPanel = skeletonPanelRef.current;
      const accordionPanel = accordionPanelRef.current;

      if (!skeletonPanel || !accordionPanel || runId !== runIdRef.current) {
        return;
      }

      if (prefersReducedMotion) {
        showContentOnly();
        openFirstAccordionItem(runId);
        return;
      }

      skeletonPanel.hidden = false;
      accordionPanel.hidden = false;

      window.requestAnimationFrame(() => {
        if (runId !== runIdRef.current) {
          return;
        }

        skeletonPanel.classList.remove('is-active');
        skeletonPanel.classList.add('is-hidden');

        accordionPanel.classList.remove('is-hidden');
        accordionPanel.classList.add('is-active');
      });

      settleRef.current = window.setTimeout(() => {
        if (runId !== runIdRef.current) {
          return;
        }
        skeletonPanel.hidden = true;
      }, motionDurationMs);
      openRef.current = window.setTimeout(() => {
        openFirstAccordionItem(runId);
        openRef.current = null;
      }, contentOpenDelay);
    },
    [
      motionDurationMs,
      openFirstAccordionItem,
      prefersReducedMotion,
      showContentOnly,
    ]
  );

  const runMotionReveal = React.useCallback(
    (runId) => {
      const skeletonPanel = skeletonPanelRef.current;
      const accordionPanel = accordionPanelRef.current;

      if (!skeletonPanel || !accordionPanel || runId !== runIdRef.current) {
        return;
      }

      if (prefersReducedMotion) {
        showContentOnly();
        openFirstAccordionItem(runId);
        return;
      }

      const transition = {
        duration: motionDuration,
        ease: productiveEntranceBezier,
      };

      skeletonPanel.hidden = false;
      accordionPanel.hidden = false;
      skeletonPanel.classList.add('is-active');
      skeletonPanel.classList.remove('is-hidden');
      accordionPanel.classList.remove('is-active');
      accordionPanel.classList.add('is-hidden');

      const exitAnimation = animate(
        skeletonPanel,
        {
          opacity: [1, 0],
          transform: ['translateY(0px)', `translateY(-${revealOffset}px)`],
        },
        transition
      );
      animationRef.current.push(exitAnimation);

      exitAnimation.then(() => {
        if (runId !== runIdRef.current) {
          return;
        }

        skeletonPanel.hidden = true;
        skeletonPanel.classList.add('is-hidden');
        skeletonPanel.classList.remove('is-active');

        accordionPanel.classList.remove('is-hidden');
        accordionPanel.classList.add('is-active');

        const enterAnimation = animate(
          accordionPanel,
          {
            opacity: [0, 1],
            transform: [`translateY(${revealOffset}px)`, 'translateY(0px)'],
          },
          transition
        );
        animationRef.current.push(enterAnimation);

        openRef.current = window.setTimeout(() => {
          openFirstAccordionItem(runId);
          openRef.current = null;
        }, contentOpenDelay);
      });
    },
    [
      motionDuration,
      openFirstAccordionItem,
      prefersReducedMotion,
      showContentOnly,
    ]
  );

  const replay = React.useCallback(() => {
    runIdRef.current += 1;
    const runId = runIdRef.current;
    clearTimers();
    clearAnimations();
    resetInlineStyles();
    showSkeletonOnly();
    closeOpenAccordionItems();

    timeoutRef.current = window.setTimeout(() => {
      if (runId !== runIdRef.current) {
        return;
      }
      if (strategy === 'motion') {
        runMotionReveal(runId);
      } else {
        runNativeReveal(runId);
      }
      timeoutRef.current = null;
    }, revealDelay);
  }, [
    clearAnimations,
    clearTimers,
    closeOpenAccordionItems,
    resetInlineStyles,
    runMotionReveal,
    runNativeReveal,
    showSkeletonOnly,
    strategy,
  ]);

  React.useEffect(() => {
    showSkeletonOnly();
    return () => {
      clearTimers();
      clearAnimations();
    };
  }, [clearAnimations, clearTimers, showSkeletonOnly]);

  const { onHeadingClick, ...restArgs } = args;

  if (!enableAccordionMotion) {
    return (
      <p>
        This story requires the <code>enable-accordion-motion</code> feature
        flag.
      </p>
    );
  }

  return (
    <div className="accordion-research-demo">
      <ButtonSet className="accordion-research-controls">
        <Button kind="secondary" onClick={replay}>
          Replay transition
        </Button>
      </ButtonSet>

      <div
        className="accordion-research-stage"
        style={{
          '--accordion-research-duration': durationModerate01,
          '--accordion-research-easing': productiveEntranceEasing,
        }}>
        <div className="accordion-native-demo">
          <div
            ref={skeletonPanelRef}
            className="accordion-native-panel is-active"
            data-skeleton-panel>
            <AccordionSkeleton open count={4} align={restArgs.align} />
          </div>
          <div
            ref={accordionPanelRef}
            className="accordion-native-panel is-hidden"
            data-accordion-panel
            hidden>
            <Accordion {...restArgs}>
              {baseAccordionItems(onHeadingClick)}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

ResearchDemo.propTypes = {
  args: PropTypes.shape({
    onHeadingClick: PropTypes.func,
  }).isRequired,
  strategy: PropTypes.oneOf(['motion', 'native']).isRequired,
};

export default {
  title: 'Components/Accordion/Feature Flag',
  component: Accordion,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <FeatureFlags enableAccordionMotion>
          <Story />
        </FeatureFlags>
      </WithFeatureFlags>
    ),
  ],
};

export const MotionLibrary = (args) => (
  <ResearchDemo args={args} strategy="motion" />
);

MotionLibrary.storyName = 'Motion Library';
MotionLibrary.args = { ...sharedArgs };
MotionLibrary.argTypes = { ...sharedArgTypes };
MotionLibrary.parameters = {
  controls: {
    include: ['align'],
  },
};

export const NativeCSS = (args) => (
  <ResearchDemo args={args} strategy="native" />
);

NativeCSS.storyName = 'Native CSS';
NativeCSS.args = { ...sharedArgs };
NativeCSS.argTypes = { ...sharedArgTypes };
NativeCSS.parameters = {
  controls: {
    include: ['align'],
  },
};
