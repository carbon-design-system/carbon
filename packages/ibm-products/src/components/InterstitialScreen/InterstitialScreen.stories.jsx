/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import { Button, ButtonSet } from '@carbon/react';

import { InterstitialScreen } from '.';
import mdx from './InterstitialScreen.mdx';
import styles from './_storybook-styles.scss?inline';
import { clamp } from '../../global/js/utils/clamp';
import { ArrowRight } from '@carbon/react/icons';
import { pkg } from '../../settings';
import { InterstitialScreenViewModule } from './_story-assets/InterstitialScreenViewModule/InterstitialScreenViewModule';
import { InterstitialScreenView } from './InterstitialScreenView';
const storyClass = 'interstitial-stories';

// cspell:words Terminé Partiel Actuel valide

const blockClass = `${pkg.prefix}--interstitial-screen`;

export default {
  title: 'Components/Onboarding/InterstitialScreen',
  component: InterstitialScreen,
  tags: ['autodocs', 'Onboarding'],
  subcomponents: {
    Header: InterstitialScreen.Header,
    Body: InterstitialScreen.Body,
    Footer: InterstitialScreen.Footer,
    InterstitialScreenView: InterstitialScreenView,
  },
  decorators: [
    (Story) => {
      return <div className={`${storyClass}__viewport`}>{Story()}</div>;
    },
  ],
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};
const translations = {
  'carbon.progress-step.complete': 'Terminé',
  'carbon.progress-step.incomplete': 'Partiel',
  'carbon.progress-step.current': 'Actuel',
  'carbon.progress-step.invalid': 'Non valide',
};

const getMultipleContent = ({ handleGotoStep }) => {
  return (
    <>
      <InterstitialScreenView
        stepTitle="Step 1"
        translateWithId={(id) => translations[id] ?? id}
      >
        <InterstitialScreenViewModule
          size="md"
          title="Use case-specific heading 1"
          description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
        />
      </InterstitialScreenView>
      <InterstitialScreenView
        stepTitle="Step 2"
        translateWithId={(id) => translations[id] ?? id}
      >
        <InterstitialScreenViewModule
          size="md"
          title="Use case-specific heading 2"
          description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
        />
      </InterstitialScreenView>
      <InterstitialScreenView
        stepTitle="Step 3"
        translateWithId={(id) => translations[id] ?? id}
      >
        <InterstitialScreenViewModule
          size="md"
          title="Use case-specific heading 3"
          description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
        />
      </InterstitialScreenView>
      <InterstitialScreenView
        stepTitle="Step 4"
        translateWithId={(id) => translations[id] ?? id}
      >
        <InterstitialScreenViewModule
          size="md"
          title="Use case-specific heading 4"
          description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
        />
      </InterstitialScreenView>
      <InterstitialScreenView
        stepTitle="Step 5"
        translateWithId={(id) => translations[id] ?? id}
      >
        <InterstitialScreenViewModule
          size="md"
          title="Use case-specific heading 5"
          description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
        />
      </InterstitialScreenView>
    </>
  );
};

const getSingleContent = (
  { handleGotoStep, disableActionButton },
  includeDisableButton,
  isFullScreen
) => {
  return (
    <>
      <InterstitialScreenView stepTitle="Step 1">
        <InterstitialScreenViewModule
          className={isFullScreen ? 'GenericView' : ''}
          title="Use case-specific heading"
          description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
          disableActionButton={
            includeDisableButton ? disableActionButton : null
          }
        />
      </InterstitialScreenView>
    </>
  );
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * | STORIES | * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const defaultProps = {
  headerTitle: 'Use case-specific title',
  headerSubTitle: 'Use case-specific sub title',
  ariaLabel: 'Interstitial Screen',
};
export const Modal = () => {
  const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
  const launcherButtonRef = useRef(null);
  return (
    <>
      <Button
        onClick={() => {
          setShowInterstitialScreen(true);
        }}
        ref={launcherButtonRef}
      >
        Show Interstitial modal
      </Button>

      <InterstitialScreen
        open={showInterstitialScreen}
        onClose={() => {
          setShowInterstitialScreen(false);
        }}
        ariaLabel={defaultProps.ariaLabel}
        launcherButtonRef={launcherButtonRef}
      >
        <InterstitialScreen.Header
          headerTitle={defaultProps.headerTitle}
          headerSubTitle={defaultProps.headerSubTitle}
          hideProgressIndicator={true}
        ></InterstitialScreen.Header>
        <InterstitialScreen.Body
          contentRenderer={(internalConfig) => {
            return getSingleContent(internalConfig, true);
          }}
        />
        <InterstitialScreen.Footer />
      </InterstitialScreen>
    </>
  );
};

export const ModalWithMultipleSteps = () => {
  const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
  const launcherButtonRef = useRef(null);
  return (
    <>
      <Button
        onClick={() => {
          setShowInterstitialScreen(true);
        }}
        ref={launcherButtonRef}
      >
        Show Interstitial modal
      </Button>

      <InterstitialScreen
        open={showInterstitialScreen}
        onClose={() => {
          setShowInterstitialScreen(false);
        }}
        ariaLabel={defaultProps.ariaLabel}
        launcherButtonRef={launcherButtonRef}
      >
        <InterstitialScreen.Header
          headerTitle={defaultProps.headerTitle}
          headerSubTitle={defaultProps.headerSubTitle}
        ></InterstitialScreen.Header>
        <InterstitialScreen.Body
          contentRenderer={(internalConfig) => {
            return getMultipleContent(internalConfig);
          }}
        />
        <InterstitialScreen.Footer />
      </InterstitialScreen>
    </>
  );
};

export const WithCustomActionButtons = () => {
  const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
  const launcherButtonRef = useRef(null);
  return (
    <>
      <Button
        onClick={() => {
          setShowInterstitialScreen(true);
        }}
        ref={launcherButtonRef}
      >
        Show Interstitial modal
      </Button>

      <InterstitialScreen
        open={showInterstitialScreen}
        onClose={() => {
          setShowInterstitialScreen(false);
        }}
        ariaLabel={defaultProps.ariaLabel}
        launcherButtonRef={launcherButtonRef}
      >
        <InterstitialScreen.Header
          headerTitle={defaultProps.headerTitle}
          headerSubTitle={defaultProps.headerSubTitle}
        ></InterstitialScreen.Header>
        <InterstitialScreen.Body
          contentRenderer={(internalConfig) => {
            return getMultipleContent(internalConfig);
          }}
        />
        <InterstitialScreen.Footer
          actionButtonRenderer={({ handleGotoStep, progStep, stepCount }) => {
            return (
              <ButtonSet>
                <Button
                  className={`${blockClass}--skip-btn`}
                  kind="ghost"
                  size="lg"
                  title={'Explore on my own'}
                  onClick={() => setShowInterstitialScreen(false)}
                >
                  Explore on my own
                </Button>

                {progStep > 0 && (
                  <Button
                    className={`${blockClass}--prev-btn`}
                    kind="secondary"
                    size="lg"
                    title={'Previous'}
                    onClick={() => {
                      const progStepFloor = 0;
                      const progStepCeil = stepCount - 1;
                      const targetStep = clamp(
                        progStep - 1,
                        progStepFloor,
                        progStepCeil
                      );
                      handleGotoStep(targetStep);
                    }}
                  >
                    Previous
                  </Button>
                )}

                {progStep < stepCount - 1 && (
                  <Button
                    className={`${blockClass}--next-btn`}
                    renderIcon={ArrowRight}
                    size="lg"
                    title={'Next'}
                    onClick={() => {
                      const progStepFloor = 0;
                      const progStepCeil = stepCount - 1;
                      const targetStep = clamp(
                        progStep + 1,
                        progStepFloor,
                        progStepCeil
                      );
                      handleGotoStep(targetStep);
                    }}
                  >
                    Next
                  </Button>
                )}

                {progStep === stepCount - 1 && (
                  <Button
                    className={`${blockClass}--start-btn`}
                    renderIcon={ArrowRight}
                    size="lg"
                    title={'Start'}
                    onClick={() => setShowInterstitialScreen(false)}
                  >
                    Start
                  </Button>
                )}
              </ButtonSet>
            );
          }}
        />
      </InterstitialScreen>
    </>
  );
};
export const WithAsynchronousActionCallback = () => {
  const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
  const launcherButtonRef = useRef(null);

  const onAction = async (actionType, config) => {
    if (actionType !== 'skip') {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });
    }
  };
  return (
    <>
      <Button
        onClick={() => {
          setShowInterstitialScreen(true);
        }}
        ref={launcherButtonRef}
      >
        Show Interstitial modal
      </Button>

      <InterstitialScreen
        open={showInterstitialScreen}
        onClose={() => {
          setShowInterstitialScreen(false);
        }}
        ariaLabel={defaultProps.ariaLabel}
        launcherButtonRef={launcherButtonRef}
      >
        <InterstitialScreen.Header
          headerTitle={defaultProps.headerTitle}
          headerSubTitle={defaultProps.headerSubTitle}
        ></InterstitialScreen.Header>
        <InterstitialScreen.Body
          contentRenderer={(internalConfig) => {
            return getMultipleContent(internalConfig);
          }}
        />
        <InterstitialScreen.Footer onAction={onAction} />
      </InterstitialScreen>
    </>
  );
};
export const fullScreen = () => {
  const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
  useState(true);
  const launcherButtonRef = useRef(null);

  return (
    <>
      <Button
        onClick={() => {
          setShowInterstitialScreen(true);
        }}
        ref={launcherButtonRef}
      >
        Show Interstitial full screen
      </Button>
      <InterstitialScreen
        open={showInterstitialScreen}
        onClose={() => {
          setShowInterstitialScreen(false);
        }}
        isFullScreen={true}
        ariaLabel={defaultProps.ariaLabel}
        launcherButtonRef={launcherButtonRef}
      >
        <InterstitialScreen.Header
          headerTitle={defaultProps.headerTitle}
          headerSubTitle={defaultProps.headerSubTitle}
        ></InterstitialScreen.Header>
        <InterstitialScreen.Body
          contentRenderer={(internalConfig) => {
            return getSingleContent(internalConfig, true, true);
          }}
        />
        <InterstitialScreen.Footer />
      </InterstitialScreen>
    </>
  );
};

export const fullScreenWithMultipleSteps = () => {
  const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
  useState(true);
  const launcherButtonRef = useRef(null);

  return (
    <>
      <Button
        onClick={() => {
          setShowInterstitialScreen(true);
        }}
        ref={launcherButtonRef}
      >
        Show Interstitial full screen
      </Button>
      <InterstitialScreen
        open={showInterstitialScreen}
        onClose={() => {
          setShowInterstitialScreen(false);
        }}
        isFullScreen={true}
        ariaLabel={defaultProps.ariaLabel}
        launcherButtonRef={launcherButtonRef}
      >
        <InterstitialScreen.Header
          headerTitle={defaultProps.headerTitle}
          headerSubTitle={defaultProps.headerSubTitle}
        ></InterstitialScreen.Header>
        <InterstitialScreen.Body
          contentRenderer={(internalConfig) => {
            return getMultipleContent(internalConfig, true);
          }}
        />
        <InterstitialScreen.Footer />
      </InterstitialScreen>
    </>
  );
};
