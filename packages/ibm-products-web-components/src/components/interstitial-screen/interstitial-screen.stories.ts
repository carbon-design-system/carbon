/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, nothing, render as litRender } from 'lit';
import './index';
import '@carbon/web-components/es/components/toggle/index.js';
import '@carbon/web-components/es/components/tag/index.js';
import styles from './story-styles.scss?lit';
import footerStyles from './interstitial-screen-footer.scss?lit';
import { prefix } from '../../globals/settings';
import Checkmark from '@carbon/icons/es/checkmark/16.js';
import ArrowRight from '@carbon/icons/es/arrow--right/16.js';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';

const argTypes = {
  fullscreen: {
    description:
      'Specifies whether the component is shown as a fullscreen experience, else it is shown as a modal by default.',
    control: 'boolean',
  },
  open: {
    description: 'Specifies whether the component is currently open.',
    control: 'boolean',
  },
};
const args = {
  open: false,
  fullscreen: false,
};

const getMultipleContent = () => {
  const contentArray = [
    {
      stepTitle: 'Step 1',
      id: '1',
      title: 'Use case-specific heading 1',
      description:
        'Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept.',
    },
    {
      stepTitle: 'Step 2',
      id: '2',
      title: 'Use case-specific heading 2',
      description:
        'Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept.',
    },
    {
      stepTitle: 'Step 3',
      id: '3',
      title: 'Use case-specific heading 3',
      description:
        'Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept.',
    },
    {
      stepTitle: 'Step 4',
      id: '4',
      title: 'Use case-specific heading 4',
      description:
        'Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept. Use case-specific content that explains the concept.',
    },
  ];
  const blockClass = `c4p--interstitial-screen-view-module`;

  return contentArray.map(
    (eachContent, index) =>
      html`<c4p-interstitial-screen-body-item
        id="${eachContent.id}"
        stepTitle="${eachContent.stepTitle}"
      >
        <style>
          ${styles}
        </style>
        <div
          role="complementary"
          aria-label=${eachContent.stepTitle}
          class="c4p--interstitial-screen-view"
        >
          <section class="${blockClass}">
            <h1 class="${blockClass}--heading">${eachContent.title}</h1>
            <p class="${blockClass}--body">${eachContent.description}</p>
          </section>

          ${index == 2
            ? html`
                <section class="${blockClass}">
                  <h2 class="${blockClass}--heading">More content</h2>
                  <p class="${blockClass}--body">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popular in the 1960s with the
                    release sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like PageMaker
                    including versions of Lorem Ipsum.
                  </p>
                </section>
              `
            : nothing}
        </div></c4p-interstitial-screen-body-item
      >`
  );
};

const getSingleContent = (getConfig) => {
  const blockClass = `c4p--interstitial-screen-view-module`;
  return html`
    <c4p-interstitial-screen-body-item id="${1}">
      <style>
        ${styles}
      </style>
      <div
        role="complementary"
        aria-label="Use case-specific heading"
        class="c4p--interstitial-screen-view"
      >
        <section class="${blockClass}">
          <h1 class="${blockClass}--heading">Use case-specific heading</h1>
          <p class="${blockClass}--body">
            Use case-specific content that explains the concept. Use
            case-specific content that explains the concept. Use case-specific
            content that explains the concept. Use case-specific content that
            explains the concept
          </p>
          <cds-selectable-tag
            class="${blockClass}--enableTag"
            id="1"
            text="Enable Get Started"
            size="md"
            @click="${() => {
              const { disableActionButton } = getConfig();
              disableActionButton?.({ start: false });
            }}"
          >
            ${iconLoader(Checkmark, { slot: 'icon' })}
          </cds-selectable-tag>
        </section>
      </div></c4p-interstitial-screen-body-item
    >
  `;
};

const onAction = async (e) => {
  async function validateStep(step: number): Promise<boolean> {
    console.log(`Validating step: ${step}`);

    // Simulate async behavior (e.g. API call)
    await new Promise((res) => setTimeout(res, 1000));

    return true;
  }

  const { step, proceed } = e.detail;

  try {
    // Run your validation logic (sync or async)
    const result = await validateStep(step); // could be sync or async

    // Send result back to the component
    proceed(result);
  } catch (err) {
    console.error('Validation error:', err);
    proceed(false); // deny progression on error
  }
};
const toggleButton = () => {
  document.querySelector('c4p-interstitial-screen')?.toggleAttribute('open');
};

const handleClose = () => {
  document.getElementById('launcherButton')?.focus();
};

export const Modal = {
  argTypes,
  render: (args) => {
    let disableActionButton;
    const getConfig = () => {
      return {
        disableActionButton: disableActionButton,
      };
    };
    return html`
      <div id="page-content-selector">
        <cds-button id="launcherButton" @click="${toggleButton}"
          >Show Interstitial modal</cds-button
        >
      </div>

      <c4p-interstitial-screen
        ?fullscreen=${args.fullscreen}
        ?open=${args.open}
        @c4p-interstitial-opened=${(e) => {
          console.log('event initialize', e.detail);
          disableActionButton = e.detail.setDisableActionButtons;
          disableActionButton?.({ start: true });
        }}
        @c4p-interstitial-closed=${handleClose}
      >
        <c4p-interstitial-screen-header
          header-title="Use case-specific title"
          header-subtitle="Use case-specific sub title

"
        ></c4p-interstitial-screen-header>

        <c4p-interstitial-screen-body>
          ${getSingleContent(getConfig)}
        </c4p-interstitial-screen-body>

        <c4p-interstitial-screen-footer
          @c4p-on-action="${onAction}"
        ></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>
    `;
  },
};

export const ModalWithMultipleSteps = {
  render: (args) => {
    return html`
      <div id="page-content-selector">
        <cds-button id="launcherButton" @click="${toggleButton}"
          >Show Interstitial modal</cds-button
        >
      </div>
      <c4p-interstitial-screen
        ?fullscreen=${args.fullscreen}
        ?open=${args.open}
        @c4p-interstitial-opened=${(e) => {
          console.log('event initialize', e.detail);
        }}
        @c4p-interstitial-closed=${handleClose}
      >
        <c4p-interstitial-screen-header
          header-title="Use case-specific title"
          header-subtitle="Use case-specific sub title"
        ></c4p-interstitial-screen-header>
        <c4p-interstitial-screen-body>
          ${getMultipleContent()}
        </c4p-interstitial-screen-body>
        <c4p-interstitial-screen-footer
          @c4p-on-action="${onAction}"
        ></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>
    `;
  },
};
export const ModalWithAsynchronousAction = {
  render: (args) => {
    return html`
      <div id="page-content-selector">
        <cds-button id="launcherButton" @click="${toggleButton}"
          >Show Interstitial modal</cds-button
        >
      </div>
      <c4p-interstitial-screen
        ?fullscreen=${args.fullscreen}
        ?open=${args.open}
        @c4p-interstitial-opened=${(e) => {
          console.log('event initialize', e.detail);
        }}
        @c4p-interstitial-closed=${handleClose}
      >
        <c4p-interstitial-screen-header
          header-title="Use case-specific title"
          header-subtitle="Use case-specific sub title"
        ></c4p-interstitial-screen-header>
        <c4p-interstitial-screen-body>
          ${getMultipleContent()}
        </c4p-interstitial-screen-body>
        <c4p-interstitial-screen-footer
          ?async-action=${true}
          @c4p-on-action="${onAction}"
        ></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>
    `;
  },
};

export const WithCustomActionButtons = {
  render: (args) => {
    const blockClass = `${prefix}--interstitial-screen`;
    const container = document.createElement('div');
    let config;
    const stepLength = 4;
    const progStepCeil = stepLength - 1;
    let initialized = false;
    let currentStep = 0;

    const handleAction = async (actionType) => {
      const carouselAPI = config?.carouselAPI;

      if (!carouselAPI) {
        return;
      }

      if (actionType === 'next') {
        carouselAPI.next();
        currentStep = currentStep + 1;
      } else if (actionType === 'back') {
        carouselAPI.prev();
        currentStep = currentStep - 1;
      } else {
        // handle 'skip' or 'submit' action here
        document
          .querySelector('c4p-interstitial-screen')
          ?.toggleAttribute('open');
      }

      rerender();
    };

    const handleSkip = () => handleAction('skip');
    const handleStart = () => handleAction('start');
    const handleClickNext = () => handleAction('next');
    const handleClickPrev = () => handleAction('back');

    const rerender = () => {
      litRender(
        html`
          <div id="page-content-selector">
            <cds-button id="launcherButton" @click="${toggleButton}"
              >Show Interstitial modal</cds-button
            >
          </div>
          <c4p-interstitial-screen
            ?fullscreen=${args.fullscreen}
            ?open=${args.open}
            @c4p-interstitial-opened=${(e) => {
              if (!initialized) {
                config = e.detail;
                initialized = true;
                rerender();
              }
            }}
            @c4p-interstitial-closed=${handleClose}
          >
            <c4p-interstitial-screen-header
              header-title="Use case-specific title"
              header-subtitle="Use case-specific sub title"
            ></c4p-interstitial-screen-header>

            <c4p-interstitial-screen-body>
              ${getMultipleContent()}
            </c4p-interstitial-screen-body>

            <c4p-interstitial-screen-footer>
              <style>
                ${footerStyles}
              </style>

              <div class="${blockClass}--footer">
                <c4p-action-set size="xl">
                  <cds-button
                    class="${blockClass}--skip-btn"
                    kind="ghost"
                    size="lg"
                    @click=${handleSkip}
                  >
                    Skip
                  </cds-button>
                  ${stepLength > 0 && currentStep > 0
                    ? html`
                        <cds-button
                          class="${blockClass}--prev-btn"
                          kind="secondary"
                          size="xl"
                          title="Back"
                          @click=${handleClickPrev}
                        >
                          Back
                        </cds-button>
                      `
                    : nothing}
                  ${stepLength > 0 && currentStep < progStepCeil
                    ? html`
                        <cds-button
                          class="${blockClass}--next-btn"
                          kind="primary"
                          size="xl"
                          @click=${handleClickNext}
                        >
                          Next ${iconLoader(ArrowRight, { slot: 'icon' })}
                        </cds-button>
                      `
                    : nothing}
                  ${(stepLength > 0 && currentStep === progStepCeil) ||
                  !stepLength
                    ? html`
                        <cds-button
                          class="${blockClass}--start-btn"
                          kind="primary"
                          size="xl"
                          title="Submit"
                          @click=${handleStart}
                        >
                          Submit
                        </cds-button>
                      `
                    : nothing}
                </c4p-action-set>
              </div>
            </c4p-interstitial-screen-footer>
          </c4p-interstitial-screen>
        `,
        container
      );
    };

    rerender(); // Initial render
    return container;
  },
};

export const FullScreen = {
  render: (args) => {
    let disableActionButton;
    const getConfig = () => {
      return {
        disableActionButton: disableActionButton,
      };
    };
    return html`
      <div id="page-content-selector">
        <cds-button id="launcherButton" @click="${toggleButton}"
          >Show Interstitial modal</cds-button
        >
      </div>
      <c4p-interstitial-screen
        role="main"
        ?fullscreen=${true}
        ?open=${args.open}
        @c4p-interstitial-opened=${(e) => {
          console.log('event initialize', e.detail);
          disableActionButton = e.detail.setDisableActionButtons;
          disableActionButton?.({ start: true });
        }}
        @c4p-interstitial-closed=${handleClose}
      >
        <c4p-interstitial-screen-header
          header-title="Use case-specific title"
          header-subtitle="Use case-specific sub title"
        >
        </c4p-interstitial-screen-header>
        <c4p-interstitial-screen-body>
          ${getSingleContent(getConfig)}
        </c4p-interstitial-screen-body>

        <c4p-interstitial-screen-footer
          @c4p-on-action="${onAction}"
        ></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>
    `;
  },
};
export const FullScreenWithMultipleSteps = {
  render: (args) => {
    const { open, size, title, titleId } = args;
    return html`
      <div id="page-content-selector">
        <cds-button id="launcherButton" @click="${toggleButton}"
          >Show Interstitial modal</cds-button
        >
      </div>
      <c4p-interstitial-screen
        ?fullscreen=${true}
        ?open=${args.open}
        role="main"
        @c4p-interstitial-opened=${(e) => {
          console.log('event initialize', e.detail);
        }}
        @c4p-interstitial-closed=${handleClose}
      >
        <c4p-interstitial-screen-header
          header-title="Use case-specific title"
          header-subtitle="Use case-specific sub title"
        ></c4p-interstitial-screen-header>
        <c4p-interstitial-screen-body>
          ${getMultipleContent()}
        </c4p-interstitial-screen-body>
        <c4p-interstitial-screen-footer
          @c4p-on-action="${onAction}"
        ></c4p-interstitial-screen-footer>
      </c4p-interstitial-screen>
    `;
  },
};

const meta = {
  title: 'Components/Onboarding/InterstitialScreen',
};

export default meta;
