/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { animate } from 'motion';
import { durationModerate01 } from '@carbon/motion';
import { prefix } from '../../../globals/settings';
import { ACCORDION_SIZE } from '../accordion';
import '../index';
import '../../feature-flags/index';
import '../../../../.storybook/templates/with-feature-flags';
import styles from './accordion-motion.scss?lit';

const sizes = {
  [`Small size (${ACCORDION_SIZE.SMALL})`]: ACCORDION_SIZE.SMALL,
  [`Medium size (${ACCORDION_SIZE.MEDIUM})`]: ACCORDION_SIZE.MEDIUM,
  [`Large size (${ACCORDION_SIZE.LARGE})`]: ACCORDION_SIZE.LARGE,
};

const args = {
  alignment: 'end',
  disabled: false,
  isFlush: false,
  size: ACCORDION_SIZE.MEDIUM,
};

const argTypes = {
  alignment: {
    control: 'select',
    description:
      'Specify the alignment of the accordion heading title and chevron.',
    options: ['start', 'end'],
  },
  disabled: {
    control: 'boolean',
    description:
      'Specify whether an individual AccordionItem should be disabled.',
  },
  isFlush: {
    control: 'boolean',
    description:
      'Specify whether Accordion text should be flush, default is false, does not work with align="start".',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Accordion.',
    options: sizes,
  },
  onBeforeToggle: {
    action: `${prefix}-accordion-item-beingtoggled`,
  },
  onToggle: {
    action: `${prefix}-accordion-item-toggled`,
  },
};

type ResearchRoot = HTMLElement & {
  __animations?: Array<{ cancel?: () => void }>;
  __accordionTimer?: number;
  __openTimer?: number;
  __runId?: number;
  __settleTimer?: number;
};

const productiveEntranceDurationSeconds =
  Number.parseInt(durationModerate01, 10) / 1000;
const productiveEntranceDurationMilliseconds = Number.parseInt(
  durationModerate01,
  10
);
const productiveEntranceBezier = [0, 0, 0.38, 0.9];
const revealDelay = 700;
const revealOffset = 8;
const contentOpenDelay = productiveEntranceDurationMilliseconds;

const renderResearchAccordion = ({
  alignment,
  isFlush,
  size,
  disabled,
  onBeforeToggle,
  onToggle,
}: {
  alignment: string;
  isFlush: boolean;
  size: string;
  disabled: boolean;
  onBeforeToggle?: (event: Event) => void;
  onToggle?: (event: Event) => void;
}) => {
  return html`
    <cds-accordion
      alignment="${alignment}"
      size="${size}"
      ?isFlush="${isFlush}"
      ?disabled="${disabled}">
      <cds-accordion-item
        title="Choose your plan"
        @cds-accordion-item-beingtoggled="${onBeforeToggle}"
        @cds-accordion-item-toggled="${onToggle}">
        <p>
          Compare plan features and select the option that best matches your
          team's expected usage.
        </p>
      </cds-accordion-item>
      <cds-accordion-item
        title="Add team members"
        @cds-accordion-item-beingtoggled="${onBeforeToggle}"
        @cds-accordion-item-toggled="${onToggle}">
        <p>
          Invite collaborators by email and assign their workspace roles before
          launch.
        </p>
      </cds-accordion-item>
      <cds-accordion-item
        title="Set payment details"
        @cds-accordion-item-beingtoggled="${onBeforeToggle}"
        @cds-accordion-item-toggled="${onToggle}">
        <p>
          Add billing information and choose whether to receive invoices by
          email.
        </p>
      </cds-accordion-item>
      <cds-accordion-item
        title="Review and confirm"
        @cds-accordion-item-beingtoggled="${onBeforeToggle}"
        @cds-accordion-item-toggled="${onToggle}">
        <p>
          Check your setup summary, then confirm to create the workspace for
          your team.
        </p>
      </cds-accordion-item>
    </cds-accordion>
  `;
};

const getResearchRoot = (event: Event) =>
  (event.currentTarget as HTMLElement | null)?.closest<ResearchRoot>(
    '[data-accordion-research-root]'
  );

const clearResearchTimers = (root: ResearchRoot) => {
  if (root.__accordionTimer) {
    window.clearTimeout(root.__accordionTimer);
    root.__accordionTimer = undefined;
  }
  if (root.__settleTimer) {
    window.clearTimeout(root.__settleTimer);
    root.__settleTimer = undefined;
  }
  if (root.__openTimer) {
    window.clearTimeout(root.__openTimer);
    root.__openTimer = undefined;
  }
};

const clearResearchAnimations = (root: ResearchRoot) => {
  root.__animations?.forEach((animation) => {
    animation.cancel?.();
  });
  root.__animations = [];
};

const resetResearchInlineStyles = (root: ResearchRoot) => {
  const skeletonPanel = root.querySelector<HTMLElement>(
    '[data-skeleton-panel]'
  );
  const accordionPanel = root.querySelector<HTMLElement>(
    '[data-accordion-panel]'
  );

  if (!skeletonPanel || !accordionPanel) {
    return;
  }

  skeletonPanel.style.opacity = '';
  skeletonPanel.style.transform = '';
  accordionPanel.style.opacity = '';
  accordionPanel.style.transform = '';
};

const showSkeletonOnly = (root: ResearchRoot) => {
  const skeletonPanel = root.querySelector<HTMLElement>(
    '[data-skeleton-panel]'
  );
  const accordionPanel = root.querySelector<HTMLElement>(
    '[data-accordion-panel]'
  );

  if (!skeletonPanel || !accordionPanel) {
    return;
  }

  skeletonPanel.hidden = false;
  skeletonPanel.classList.add('is-active');
  skeletonPanel.classList.remove('is-hidden');

  accordionPanel.hidden = true;
  accordionPanel.classList.add('is-hidden');
  accordionPanel.classList.remove('is-active');
};

const showContentOnly = (root: ResearchRoot) => {
  const skeletonPanel = root.querySelector<HTMLElement>(
    '[data-skeleton-panel]'
  );
  const accordionPanel = root.querySelector<HTMLElement>(
    '[data-accordion-panel]'
  );

  if (!skeletonPanel || !accordionPanel) {
    return;
  }

  skeletonPanel.hidden = true;
  skeletonPanel.classList.add('is-hidden');
  skeletonPanel.classList.remove('is-active');

  accordionPanel.hidden = false;
  accordionPanel.classList.add('is-active');
  accordionPanel.classList.remove('is-hidden');
};

const closeOpenAccordionItems = (root: ResearchRoot) => {
  root.querySelectorAll('cds-accordion-item[open]').forEach((item) => {
    item.removeAttribute('open');
  });
};

const openFirstAccordionItem = (root: ResearchRoot, runId: number) => {
  if (runId !== root.__runId) {
    return;
  }

  const firstItem = root.querySelector<HTMLElement>('cds-accordion-item');
  if (!firstItem || firstItem.hasAttribute('open')) {
    return;
  }

  firstItem.setAttribute('open', '');
};

const runNativeReveal = (root: ResearchRoot, runId: number) => {
  const skeletonPanel = root.querySelector<HTMLElement>(
    '[data-skeleton-panel]'
  );
  const accordionPanel = root.querySelector<HTMLElement>(
    '[data-accordion-panel]'
  );

  if (!skeletonPanel || !accordionPanel || runId !== root.__runId) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReducedMotion) {
    showContentOnly(root);
    openFirstAccordionItem(root, runId);
    return;
  }

  skeletonPanel.hidden = false;
  accordionPanel.hidden = false;

  window.requestAnimationFrame(() => {
    if (runId !== root.__runId) {
      return;
    }

    skeletonPanel.classList.remove('is-active');
    skeletonPanel.classList.add('is-hidden');

    accordionPanel.classList.remove('is-hidden');
    accordionPanel.classList.add('is-active');
  });

  root.__settleTimer = window.setTimeout(() => {
    if (runId !== root.__runId) {
      return;
    }
    skeletonPanel.hidden = true;
    root.__settleTimer = undefined;
  }, productiveEntranceDurationMilliseconds);

  root.__openTimer = window.setTimeout(() => {
    openFirstAccordionItem(root, runId);
    root.__openTimer = undefined;
  }, contentOpenDelay);
};

const runMotionReveal = (root: ResearchRoot, runId: number) => {
  const skeletonPanel = root.querySelector<HTMLElement>(
    '[data-skeleton-panel]'
  );
  const accordionPanel = root.querySelector<HTMLElement>(
    '[data-accordion-panel]'
  );

  if (!skeletonPanel || !accordionPanel || runId !== root.__runId) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReducedMotion) {
    showContentOnly(root);
    openFirstAccordionItem(root, runId);
    return;
  }

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
    {
      duration: productiveEntranceDurationSeconds,
      ease: productiveEntranceBezier,
    }
  );

  root.__animations ??= [];
  root.__animations.push(exitAnimation);

  exitAnimation.then(() => {
    if (runId !== root.__runId) {
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
      {
        duration: productiveEntranceDurationSeconds,
        ease: productiveEntranceBezier,
      }
    );
    root.__animations?.push(enterAnimation);

    root.__openTimer = window.setTimeout(() => {
      openFirstAccordionItem(root, runId);
      root.__openTimer = undefined;
    }, contentOpenDelay);
  });
};

const replayResearchDemo = (event: Event, strategy: 'motion' | 'native') => {
  const root = getResearchRoot(event);
  if (!root) {
    return;
  }

  const runId = (root.__runId ?? 0) + 1;
  root.__runId = runId;

  clearResearchTimers(root);
  clearResearchAnimations(root);
  resetResearchInlineStyles(root);
  showSkeletonOnly(root);
  closeOpenAccordionItems(root);

  root.__accordionTimer = window.setTimeout(() => {
    if (runId !== root.__runId) {
      return;
    }
    if (strategy === 'motion') {
      runMotionReveal(root, runId);
    } else {
      runNativeReveal(root, runId);
    }
    root.__accordionTimer = undefined;
  }, revealDelay);
};

const replayMotionDemo = (event: Event) => replayResearchDemo(event, 'motion');
const replayNativeCssDemo = (event: Event) =>
  replayResearchDemo(event, 'native');

const renderResearchDemo = ({
  alignment,
  isFlush,
  size,
  disabled,
  onBeforeToggle,
  onToggle,
}: {
  alignment: string;
  isFlush: boolean;
  size: string;
  disabled: boolean;
  onBeforeToggle?: (event: Event) => void;
  onToggle?: (event: Event) => void;
}) => html`
  <feature-flags enable-accordion-motion>
    <style>
      ${styles}
    </style>
    <div class="accordion-research-demo" data-accordion-research-root>
      <cds-button-set class="accordion-research-controls">
        <cds-button kind="secondary" @click="${replayMotionDemo}">
          Replay transition
        </cds-button>
      </cds-button-set>
      <div class="accordion-research-stage">
        <div class="accordion-native-panel is-active" data-skeleton-panel>
          <cds-accordion-skeleton
            alignment="${alignment}"
            open
            ?isFlush="${isFlush}"></cds-accordion-skeleton>
        </div>
        <div
          class="accordion-native-panel is-hidden"
          data-accordion-panel
          hidden>
          ${renderResearchAccordion({
            alignment,
            isFlush,
            size,
            disabled,
            onBeforeToggle,
            onToggle,
          })}
        </div>
      </div>
    </div>
  </feature-flags>
`;

export const MotionLibrary = {
  args,
  argTypes,
  tags: ['!autodocs'],
  parameters: {
    controls: {
      include: ['alignment'],
    },
  },
  render: ({
    alignment,
    isFlush,
    size,
    disabled,
    onBeforeToggle,
    onToggle,
  }) => {
    return html`
      <sb-template-feature-flags>
        ${renderResearchDemo({
          alignment,
          isFlush,
          size,
          disabled,
          onBeforeToggle,
          onToggle,
        })}
      </sb-template-feature-flags>
    `;
  },
};

export const NativeCSS = {
  args,
  argTypes,
  tags: ['!autodocs'],
  parameters: {
    controls: {
      include: ['alignment'],
    },
  },
  render: ({
    alignment,
    isFlush,
    size,
    disabled,
    onBeforeToggle,
    onToggle,
  }) => {
    return html`
      <sb-template-feature-flags>
        <feature-flags enable-accordion-motion>
          <style>
            ${styles}
          </style>
          <div class="accordion-research-demo" data-accordion-research-root>
            <cds-button-set class="accordion-research-controls">
              <cds-button kind="secondary" @click="${replayNativeCssDemo}">
                Replay transition
              </cds-button>
            </cds-button-set>
            <div class="accordion-research-stage">
              <div class="accordion-native-panel is-active" data-skeleton-panel>
                <cds-accordion-skeleton
                  alignment="${alignment}"
                  open
                  ?isFlush="${isFlush}"></cds-accordion-skeleton>
              </div>
              <div
                class="accordion-native-panel is-hidden"
                data-accordion-panel
                hidden>
                ${renderResearchAccordion({
                  alignment,
                  isFlush,
                  size,
                  disabled,
                  onBeforeToggle,
                  onToggle,
                })}
              </div>
            </div>
          </div>
        </feature-flags>
      </sb-template-feature-flags>
    `;
  },
};

const meta = {
  title: 'Components/Accordion/Feature Flag',
};

export default meta;
