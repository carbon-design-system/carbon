/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import React, { useRef, useState } from 'react';
import { ArrowRight } from '@carbon/icons-react';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import { InterstitialScreen } from './InterstitialScreen';
import { InterstitialScreenView } from './InterstitialScreenView';
import { InterstitialScreenViewModule } from './_story-assets/InterstitialScreenViewModule/InterstitialScreenViewModule';
import mdx from './InterstitialScreen.mdx';

const storyClass = 'interstitial-stories';
const blockClass = 'cds--interstitial-screen';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default {
  title: 'Components/InterstitialScreen',
  component: InterstitialScreen,
  tags: ['autodocs', 'ibm-products-migrated'],
  subcomponents: {
    Header: InterstitialScreen.Header,
    Body: InterstitialScreen.Body,
    Footer: InterstitialScreen.Footer,
    InterstitialScreenView,
  },
  argTypes: {
    className: { table: { disable: true } },
  },
  decorators: [
    (Story) => <div className={`${storyClass}__viewport`}>{Story()}</div>,
  ],
  parameters: {
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

const getMultipleContent = () => {
  return (
    <>
      <InterstitialScreenView
        stepTitle="Step 1"
        translateWithId={(id) => translations[id] ?? id}>
        <InterstitialScreenViewModule
          size="md"
          title="Use case-specific heading 1"
          description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
        />
      </InterstitialScreenView>
      <InterstitialScreenView
        stepTitle="Step 2"
        translateWithId={(id) => translations[id] ?? id}>
        <InterstitialScreenViewModule
          size="md"
          title="Use case-specific heading 2"
          description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
        />
      </InterstitialScreenView>
      <InterstitialScreenView
        stepTitle="Step 3"
        translateWithId={(id) => translations[id] ?? id}>
        <InterstitialScreenViewModule
          size="md"
          title="Use case-specific heading 3"
          description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
        />
      </InterstitialScreenView>
      <InterstitialScreenView
        stepTitle="Step 4"
        translateWithId={(id) => translations[id] ?? id}>
        <InterstitialScreenViewModule
          size="md"
          title="Use case-specific heading 4"
          description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
        />
      </InterstitialScreenView>
      <InterstitialScreenView
        stepTitle="Step 5"
        translateWithId={(id) => translations[id] ?? id}>
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
  { disableActionButton },
  includeDisableButton,
  isFullScreen
) => {
  return (
    <InterstitialScreenView stepTitle="Step 1">
      <InterstitialScreenViewModule
        className={isFullScreen ? 'GenericView' : ''}
        title="Use case-specific heading"
        description="Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept."
        disableActionButton={includeDisableButton ? disableActionButton : null}
      />
    </InterstitialScreenView>
  );
};

const defaultProps = {
  headerTitle: 'Use case-specific title',
  headerSubTitle: 'Use case-specific sub title',
  ariaLabel: 'Interstitial Screen',
};

export const Modal = {
  render: () => {
    const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
    const launcherButtonRef = useRef(null);
    return (
      <>
        <Button
          onClick={() => {
            setShowInterstitialScreen(true);
          }}
          ref={launcherButtonRef}>
          Show Interstitial modal
        </Button>

        <InterstitialScreen
          open={showInterstitialScreen}
          onClose={() => {
            setShowInterstitialScreen(false);
          }}
          ariaLabel={defaultProps.ariaLabel}
          launcherButtonRef={launcherButtonRef}>
          <InterstitialScreen.Header
            headerTitle={defaultProps.headerTitle}
            headerSubTitle={defaultProps.headerSubTitle}
            hideProgressIndicator={true}
          />
          <InterstitialScreen.Body
            contentRenderer={(internalConfig) =>
              getSingleContent(internalConfig, true)
            }
          />
          <InterstitialScreen.Footer />
        </InterstitialScreen>
      </>
    );
  },
};

export const ModalWithMultipleSteps = {
  render: () => {
    const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
    const launcherButtonRef = useRef(null);
    return (
      <>
        <Button
          onClick={() => {
            setShowInterstitialScreen(true);
          }}
          ref={launcherButtonRef}>
          Show Interstitial modal
        </Button>

        <InterstitialScreen
          open={showInterstitialScreen}
          onClose={() => {
            setShowInterstitialScreen(false);
          }}
          ariaLabel={defaultProps.ariaLabel}
          launcherButtonRef={launcherButtonRef}>
          <InterstitialScreen.Header
            headerTitle={defaultProps.headerTitle}
            headerSubTitle={defaultProps.headerSubTitle}
          />
          <InterstitialScreen.Body
            contentRenderer={() => getMultipleContent()}
          />
          <InterstitialScreen.Footer />
        </InterstitialScreen>
      </>
    );
  },
};

export const WithCustomActionButtons = {
  render: () => {
    const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
    const launcherButtonRef = useRef(null);
    return (
      <>
        <Button
          onClick={() => {
            setShowInterstitialScreen(true);
          }}
          ref={launcherButtonRef}>
          Show Interstitial modal
        </Button>

        <InterstitialScreen
          open={showInterstitialScreen}
          onClose={() => {
            setShowInterstitialScreen(false);
          }}
          ariaLabel={defaultProps.ariaLabel}
          launcherButtonRef={launcherButtonRef}>
          <InterstitialScreen.Header
            headerTitle={defaultProps.headerTitle}
            headerSubTitle={defaultProps.headerSubTitle}
          />
          <InterstitialScreen.Body
            contentRenderer={() => getMultipleContent()}
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
                    onClick={() => setShowInterstitialScreen(false)}>
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
                      }}>
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
                      }}>
                      Next
                    </Button>
                  )}

                  {progStep === stepCount - 1 && (
                    <Button
                      className={`${blockClass}--start-btn`}
                      renderIcon={ArrowRight}
                      size="lg"
                      title={'Start'}
                      onClick={() => setShowInterstitialScreen(false)}>
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
  },
};

export const WithAsynchronousActionCallback = {
  render: () => {
    const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
    const launcherButtonRef = useRef(null);

    const onAction = async (actionType) => {
      if (actionType !== 'skip') {
        await new Promise((resolve) => {
          setTimeout(resolve, 1500);
        });
      }
    };
    return (
      <>
        <Button
          onClick={() => {
            setShowInterstitialScreen(true);
          }}
          ref={launcherButtonRef}>
          Show Interstitial modal
        </Button>

        <InterstitialScreen
          open={showInterstitialScreen}
          onClose={() => {
            setShowInterstitialScreen(false);
          }}
          ariaLabel={defaultProps.ariaLabel}
          launcherButtonRef={launcherButtonRef}>
          <InterstitialScreen.Header
            headerTitle={defaultProps.headerTitle}
            headerSubTitle={defaultProps.headerSubTitle}
          />
          <InterstitialScreen.Body
            contentRenderer={() => getMultipleContent()}
          />
          <InterstitialScreen.Footer onAction={onAction} />
        </InterstitialScreen>
      </>
    );
  },
};

export const FullScreen = {
  render: () => {
    const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
    const launcherButtonRef = useRef(null);

    return (
      <>
        <Button
          onClick={() => {
            setShowInterstitialScreen(true);
          }}
          ref={launcherButtonRef}>
          Show Interstitial full screen
        </Button>
        <InterstitialScreen
          open={showInterstitialScreen}
          onClose={() => {
            setShowInterstitialScreen(false);
          }}
          isFullScreen={true}
          ariaLabel={defaultProps.ariaLabel}
          launcherButtonRef={launcherButtonRef}>
          <InterstitialScreen.Header
            headerTitle={defaultProps.headerTitle}
            headerSubTitle={defaultProps.headerSubTitle}
          />
          <InterstitialScreen.Body
            contentRenderer={(internalConfig) =>
              getSingleContent(internalConfig, true, true)
            }
          />
          <InterstitialScreen.Footer />
        </InterstitialScreen>
      </>
    );
  },
};

export const FullScreenWithMultipleSteps = {
  render: () => {
    const [showInterstitialScreen, setShowInterstitialScreen] = useState(true);
    const launcherButtonRef = useRef(null);

    return (
      <>
        <Button
          onClick={() => {
            setShowInterstitialScreen(true);
          }}
          ref={launcherButtonRef}>
          Show Interstitial full screen
        </Button>
        <InterstitialScreen
          open={showInterstitialScreen}
          onClose={() => {
            setShowInterstitialScreen(false);
          }}
          isFullScreen={true}
          ariaLabel={defaultProps.ariaLabel}
          launcherButtonRef={launcherButtonRef}>
          <InterstitialScreen.Header
            headerTitle={defaultProps.headerTitle}
            headerSubTitle={defaultProps.headerSubTitle}
          />
          <InterstitialScreen.Body
            contentRenderer={() => getMultipleContent()}
          />
          <InterstitialScreen.Footer />
        </InterstitialScreen>
      </>
    );
  },
};
