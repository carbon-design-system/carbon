/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, nothing, render as litRender } from 'lit';
import { action } from 'storybook/actions';
import './index';
import '../toggle/index';
import '../tag/index';
import styles from './story-styles.scss?lit';
import footerStyles from './interstitial-screen-footer.scss?lit';
import { prefix } from '../../globals/settings';
import Checkmark from '@carbon/icons/es/checkmark/16.js';
import ArrowRight from '@carbon/icons/es/arrow--right/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';

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
  const blockClass = `${prefix}--interstitial-screen-view-module`;

  return contentArray.map(
    (eachContent, index) =>
      html`<cds-interstitial-screen-body-item
        id="${eachContent.id}"
        stepTitle="${eachContent.stepTitle}">
        <style>
          ${styles}
        </style>
        <div
          role="complementary"
          aria-label=${eachContent.stepTitle}
          class="${prefix}--interstitial-screen-view">
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
        </div></cds-interstitial-screen-body-item
      >`
  );
};

const getSingleContent = (getConfig) => {
  const blockClass = `${prefix}--interstitial-screen-view-module`;
  return html`
    <cds-interstitial-screen-body-item id="${1}">
      <style>
        ${styles}
      </style>
      <div
        role="complementary"
        aria-label="Use case-specific heading"
        class="${prefix}--interstitial-screen-view">
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
            }}">
            ${iconLoader(Checkmark, { slot: 'icon' })}
          </cds-selectable-tag>
        </section>
      </div></cds-interstitial-screen-body-item
    >
  `;
};

const onAction = async (e) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function validateStep(_step: number): Promise<boolean> {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    proceed(false); // deny progression on error
  }
};
const toggleButton = () => {
  document.querySelector('cds-interstitial-screen')?.toggleAttribute('open');
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

      <cds-interstitial-screen
        ?fullscreen=${args.fullscreen}
        ?open=${args.open}
        @cds-interstitial-opened=${(e) => {
          disableActionButton = e.detail.setDisableActionButtons;
          disableActionButton?.({ start: true });
        }}
        @cds-interstitial-closed=${handleClose}>
        <cds-interstitial-screen-header
          header-title="Use case-specific title"
          header-subtitle="Use case-specific sub title

"></cds-interstitial-screen-header>

        <cds-interstitial-screen-body>
          ${getSingleContent(getConfig)}
        </cds-interstitial-screen-body>

        <cds-interstitial-screen-footer
          @cds-on-action="${onAction}"></cds-interstitial-screen-footer>
      </cds-interstitial-screen>
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
      <cds-interstitial-screen
        ?fullscreen=${args.fullscreen}
        ?open=${args.open}
        @cds-interstitial-opened=${action('cds-interstitial-opened')}
        @cds-interstitial-closed=${handleClose}>
        <cds-interstitial-screen-header
          header-title="Use case-specific title"
          header-subtitle="Use case-specific sub title"></cds-interstitial-screen-header>
        <cds-interstitial-screen-body>
          ${getMultipleContent()}
        </cds-interstitial-screen-body>
        <cds-interstitial-screen-footer
          @cds-on-action="${onAction}"></cds-interstitial-screen-footer>
      </cds-interstitial-screen>
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
      <cds-interstitial-screen
        ?fullscreen=${args.fullscreen}
        ?open=${args.open}
        @cds-interstitial-opened=${action('cds-interstitial-opened')}
        @cds-interstitial-closed=${handleClose}>
        <cds-interstitial-screen-header
          header-title="Use case-specific title"
          header-subtitle="Use case-specific sub title"></cds-interstitial-screen-header>
        <cds-interstitial-screen-body>
          ${getMultipleContent()}
        </cds-interstitial-screen-body>
        <cds-interstitial-screen-footer
          ?async-action=${true}
          @cds-on-action="${onAction}"></cds-interstitial-screen-footer>
      </cds-interstitial-screen>
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
          .querySelector('cds-interstitial-screen')
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
          <cds-interstitial-screen
            ?fullscreen=${args.fullscreen}
            ?open=${args.open}
            @cds-interstitial-opened=${(e) => {
              if (!initialized) {
                config = e.detail;
                initialized = true;
                rerender();
              }
            }}
            @cds-interstitial-closed=${handleClose}>
            <cds-interstitial-screen-header
              header-title="Use case-specific title"
              header-subtitle="Use case-specific sub title"></cds-interstitial-screen-header>

            <cds-interstitial-screen-body>
              ${getMultipleContent()}
            </cds-interstitial-screen-body>

            <cds-interstitial-screen-footer>
              <style>
                ${footerStyles}
              </style>

              <div class="${blockClass}--footer">
                <cds-action-set size="xl">
                  <cds-button
                    class="${blockClass}--skip-btn"
                    kind="ghost"
                    size="lg"
                    @click=${handleSkip}>
                    Skip
                  </cds-button>
                  ${stepLength > 0 && currentStep > 0
                    ? html`
                        <cds-button
                          class="${blockClass}--prev-btn"
                          kind="secondary"
                          size="xl"
                          title="Back"
                          @click=${handleClickPrev}>
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
                          @click=${handleClickNext}>
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
                          @click=${handleStart}>
                          Submit
                        </cds-button>
                      `
                    : nothing}
                </cds-action-set>
              </div>
            </cds-interstitial-screen-footer>
          </cds-interstitial-screen>
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
      <cds-interstitial-screen
        role="main"
        ?fullscreen=${true}
        ?open=${args.open}
        @cds-interstitial-opened=${(e) => {
          disableActionButton = e.detail.setDisableActionButtons;
          disableActionButton?.({ start: true });
        }}
        @cds-interstitial-closed=${handleClose}>
        <cds-interstitial-screen-header
          header-title="Use case-specific title"
          header-subtitle="Use case-specific sub title">
        </cds-interstitial-screen-header>
        <cds-interstitial-screen-body>
          ${getSingleContent(getConfig)}
        </cds-interstitial-screen-body>

        <cds-interstitial-screen-footer
          @cds-on-action="${onAction}"></cds-interstitial-screen-footer>
      </cds-interstitial-screen>
    `;
  },
};
export const FullScreenWithMultipleSteps = {
  render: (args) => {
    const { open } = args;
    return html`
      <div id="page-content-selector">
        <cds-button id="launcherButton" @click="${toggleButton}"
          >Show Interstitial modal</cds-button
        >
      </div>
      <cds-interstitial-screen
        ?fullscreen=${true}
        ?open=${open}
        role="main"
        @cds-interstitial-opened=${action('cds-interstitial-opened')}
        @cds-interstitial-closed=${handleClose}>
        <cds-interstitial-screen-header
          header-title="Use case-specific title"
          header-subtitle="Use case-specific sub title"></cds-interstitial-screen-header>
        <cds-interstitial-screen-body>
          ${getMultipleContent()}
        </cds-interstitial-screen-body>
        <cds-interstitial-screen-footer
          @cds-on-action="${onAction}"></cds-interstitial-screen-footer>
      </cds-interstitial-screen>
    `;
  },
};

const meta = {
  title: 'Components/Onboarding/InterstitialScreen',
};

export default meta;
