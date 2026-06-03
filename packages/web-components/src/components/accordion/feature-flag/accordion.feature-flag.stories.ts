/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { animate } from 'motion';
import { durationModerate01 } from '@carbon/motion';
import '../index';
import '../../feature-flags/index';
import '../../../../.storybook/templates/with-feature-flags';
import styles from './accordion-motion.scss?lit';

const args = {
  alignment: 'end',
  animationSpeed: 1,
};

const argTypes = {
  alignment: {
    control: 'select',
    description:
      'Specify the alignment of the accordion heading title and chevron.',
    options: ['start', 'end'],
  },
  animationSpeed: {
    control: { type: 'range', min: 0.25, max: 2, step: 0.25 },
    description: 'Adjust the transition speed multiplier.',
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

const getAnimationSpeed = (speed: number) => {
  const value = Number(speed);
  return Number.isFinite(value) && value > 0 ? value : 1;
};

const renderResearchAccordion = ({ alignment }: { alignment: string }) => {
  return html`
    <cds-accordion alignment="${alignment}">
      <cds-accordion-item title="Choose your plan">
        <p>
          Compare plan features and select the option that best matches your
          team's expected usage.
        </p>
      </cds-accordion-item>
      <cds-accordion-item title="Add team members">
        <p>
          Invite collaborators by email and assign their workspace roles before
          launch.
        </p>
      </cds-accordion-item>
      <cds-accordion-item title="Set payment details">
        <p>
          Add billing information and choose whether to receive invoices by
          email.
        </p>
      </cds-accordion-item>
      <cds-accordion-item title="Review and confirm">
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

const runNativeReveal = (
  root: ResearchRoot,
  runId: number,
  animationSpeed: number
) => {
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

  const duration = productiveEntranceDurationMilliseconds / animationSpeed;

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
  }, duration);

  root.__openTimer = window.setTimeout(() => {
    openFirstAccordionItem(root, runId);
    root.__openTimer = undefined;
  }, duration);
};

const runMotionReveal = (
  root: ResearchRoot,
  runId: number,
  animationSpeed: number
) => {
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

  const durationSeconds = productiveEntranceDurationSeconds / animationSpeed;
  const durationMilliseconds =
    productiveEntranceDurationMilliseconds / animationSpeed;

  const exitAnimation = animate(
    skeletonPanel,
    {
      opacity: [1, 0],
      transform: ['translateY(0px)', `translateY(-${revealOffset}px)`],
    },
    {
      duration: durationSeconds,
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
        duration: durationSeconds,
        ease: productiveEntranceBezier,
      }
    );
    root.__animations?.push(enterAnimation);

    root.__openTimer = window.setTimeout(() => {
      openFirstAccordionItem(root, runId);
      root.__openTimer = undefined;
    }, durationMilliseconds);
  });
};

const replayResearchDemo = (
  event: Event,
  strategy: 'motion' | 'native',
  animationSpeed = 1
) => {
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
      runMotionReveal(root, runId, animationSpeed);
    } else {
      runNativeReveal(root, runId, animationSpeed);
    }
    root.__accordionTimer = undefined;
  }, revealDelay);
};

const renderResearchDemo = ({
  alignment,
  animationSpeed,
  strategy,
}: {
  alignment: string;
  animationSpeed: number;
  strategy: 'motion' | 'native';
}) => {
  const speed = getAnimationSpeed(animationSpeed);
  const duration = productiveEntranceDurationMilliseconds / speed;

  return html`
    <feature-flags enable-accordion-motion>
      <style>
        ${styles} .accordion-native-panel {
          transition-duration: ${duration}ms;
        }
      </style>
      <div class="accordion-research-demo" data-accordion-research-root>
        <cds-button-set class="accordion-research-controls">
          <cds-button
            kind="secondary"
            @click="${(event: Event) =>
              replayResearchDemo(event, strategy, speed)}">
            Play transition
          </cds-button>
        </cds-button-set>
        <div class="accordion-research-stage">
          <div class="accordion-native-panel is-active" data-skeleton-panel>
            <cds-accordion-skeleton
              alignment="${alignment}"
              open></cds-accordion-skeleton>
          </div>
          <div
            class="accordion-native-panel is-hidden"
            data-accordion-panel
            hidden>
            ${renderResearchAccordion({
              alignment,
            })}
          </div>
        </div>
      </div>
    </feature-flags>
  `;
};

export const MotionLibrary = {
  args,
  argTypes,
  tags: ['!autodocs'],
  parameters: {
    controls: {
      include: ['alignment', 'animationSpeed'],
    },
  },
  render: ({ alignment, animationSpeed }) => {
    return html`
      <sb-template-feature-flags>
        ${renderResearchDemo({
          alignment,
          animationSpeed,
          strategy: 'motion',
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
      include: ['alignment', 'animationSpeed'],
    },
  },
  render: ({ alignment, animationSpeed }) => {
    return html`
      <sb-template-feature-flags>
        ${renderResearchDemo({
          alignment,
          animationSpeed,
          strategy: 'native',
        })}
      </sb-template-feature-flags>
    `;
  },
};

const meta = {
  title: 'Components/Accordion/Feature Flag',
};

export default meta;
