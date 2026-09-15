/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Manual-testing stories for the overflowHandler utility.
 * Mirrors the React story at packages/react/src/components/OverflowHandler.
 *
 * Drag the resize handle (bottom-right of the container) to change width/height.
 */

import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';
import {
  createOverflowHandler,
  type OverflowHandler,
} from '@carbon/utilities/overflowHandler';
import styles from './overflow-handler-story.scss?lit';

const ITEM_LABELS = [
  'All',
  'Dashboard',
  'Notifications',
  'Account settings',
  'Help',
  'Privacy',
  'Organization access',
  'Docs',
  'Billing and usage',
  'API',
  'Integrations',
  'Audit log',
  'OK',
  'Experimental features',
  'Sign out',
];

const labelFor = (index: number) =>
  ITEM_LABELS[(index - 1) % ITEM_LABELS.length] +
  (index > ITEM_LABELS.length
    ? ` ${Math.ceil(index / ITEM_LABELS.length)}`
    : '');

const fmt = (visible: HTMLElement[], hidden: HTMLElement[]) =>
  `visible : [${visible.map((n) => n.textContent?.trim()).join(', ')}]\n` +
  `hidden  : [${hidden.map((n) => n.textContent?.trim()).join(', ')}]`;

type StoryArgs = {
  instanceCount: number;
  itemCount: number;
  maxVisibleItems: number;
  offsetValue: number;
  gap: number;
  fixedIndex: number;
  dimension: 'width' | 'height';
};

const attachInstance = (args: StoryArgs) => {
  let handler: OverflowHandler | undefined;
  let token = 0;

  return (el?: Element) => {
    handler?.disconnect();
    handler = undefined;
    const current = ++token;

    if (!(el instanceof HTMLElement)) {
      return;
    }

    // lit commits element bindings (ref) before child parts, so items are not
    // in the container yet. createOverflowHandler snapshots children at init.
    queueMicrotask(() => {
      if (current !== token || !el.isConnected) {
        return;
      }

      // `resize` writes inline width/height. Lit does not rewrite `style` when
      // only the axis class changes, so clear the previous drag like React.
      if (el.dataset.overflowDimension !== args.dimension) {
        el.style.removeProperty('width');
        el.style.removeProperty('height');
        el.dataset.overflowDimension = args.dimension;
      }

      const instance = el.parentElement;
      const logEl = instance?.querySelector('.overflow-handler-log');
      const offsetEl = el.querySelector<HTMLElement>('[data-offset]');
      let hiddenLabels: string[] = [];

      const bindHandler = () => {
        handler?.disconnect();
        handler = undefined;
        try {
          handler = createOverflowHandler({
            container: el,
            dimension: args.dimension,
            gap: args.gap,
            offsetValue: args.offsetValue,
            ...(args.maxVisibleItems > 0
              ? { maxVisibleItems: args.maxVisibleItems }
              : {}),
            onChange(visible, hidden) {
              hiddenLabels = hidden.map((n) => n.textContent?.trim() ?? '');
              if (offsetEl) {
                offsetEl.textContent =
                  hidden.length > 0 ? `+${hidden.length} more` : '+0 more';
              }
              if (logEl) {
                logEl.textContent = fmt(visible, hidden);
              }
            },
          });
        } catch (err) {
          if (logEl) {
            logEl.textContent = `ERROR: ${(err as Error).message}`;
          }
        }
      };

      const onOffsetClick = () => {
        if (hiddenLabels.length === 0) {
          return;
        }
        alert(hiddenLabels.join(', '));
      };

      if (offsetEl) {
        offsetEl.onclick = onOffsetClick;
      }
      bindHandler();
    });
  };
};

const renderInstance = (args: StoryArgs) => {
  const isVertical = args.dimension === 'height';
  const containerModifier = isVertical
    ? 'overflow-handler-container-vertical'
    : 'overflow-handler-container-horizontal';

  return html`
    <div class="overflow-handler-instance">
      <div
        class="overflow-handler-container ${containerModifier}${args.gap > 0
          ? ' overflow-handler-show-gap'
          : ''}${args.offsetValue > 0
          ? ' overflow-handler-show-offset-value'
          : ''}"
        style="gap: ${args.gap}px; --overflow-handler-gap: ${args.gap}px; --overflow-handler-offset-value: ${args.offsetValue}px"
        ${ref(attachInstance(args))}>
        ${Array.from({ length: args.itemCount }, (_, i) => {
          const n = i + 1;
          const isFixed = args.fixedIndex > 0 && n === args.fixedIndex;
          return html`
            <div
              class="overflow-handler-item${isFixed
                ? ' overflow-handler-item-fixed'
                : ''}"
              ?data-fixed=${isFixed}>
              ${labelFor(n)}
            </div>
          `;
        })}
        <button
          type="button"
          data-offset
          data-hidden
          class="overflow-handler-offset">
          +0 more
        </button>
      </div>
      <pre class="overflow-handler-log"></pre>
    </div>
  `;
};

const defaultArgs: StoryArgs = {
  instanceCount: 1,
  itemCount: 8,
  maxVisibleItems: 0,
  offsetValue: 0,
  gap: 0,
  fixedIndex: 0,
  dimension: 'width',
};

const controls = {
  instanceCount: {
    control: { type: 'number', min: 1, max: 8, step: 1 },
    description: 'Number of independent handler instances to render.',
  },
  itemCount: {
    control: { type: 'number', min: 1, max: 16, step: 1 },
    description: 'Total number of items.',
  },
  maxVisibleItems: {
    control: { type: 'number', min: 0, max: 16, step: 1 },
    description: 'Hard cap on visible items (0 = no cap).',
  },
  offsetValue: {
    control: { type: 'number', min: 0, max: 200, step: 8 },
    description: 'Pixels to reserve — forces overflow earlier.',
  },
  gap: {
    control: { type: 'number', min: 0, max: 32, step: 2 },
    description: 'Column/row gap between items (px).',
  },
  fixedIndex: {
    control: { type: 'number', min: 0, max: 16, step: 1 },
    description:
      'Mark item N as data-fixed (always visible). 0 = none. E.g. 3 → Item 3 gets data-fixed. `data-fixed` can be added to multiple items.',
  },
  dimension: {
    control: { type: 'radio' },
    options: ['width', 'height'],
    description: 'Axis to measure overflow along.',
  },
};

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  render: (args: StoryArgs) => html`
    <div class="overflow-handler-demo">
      <div class="overflow-handler-legend">
        <span>
          <span
            class="overflow-handler-swatch overflow-handler-swatch-regular"></span>
          regular item
        </span>
        ${args.fixedIndex > 0
          ? html`
              <span>
                <span
                  class="overflow-handler-swatch overflow-handler-swatch-fixed"></span>
                fixed item (<code>data-fixed</code>)
              </span>
            `
          : ''}
        <span class="overflow-handler-legend-offset">
          <span
            class="overflow-handler-swatch overflow-handler-swatch-offset"></span>
          offset item (<code>data-offset</code>)
        </span>
        <span>
          <span
            class="overflow-handler-swatch overflow-handler-swatch-available"></span>
          available space
        </span>
        ${args.gap > 0
          ? html`
              <span>
                <span
                  class="overflow-handler-swatch overflow-handler-swatch-gap"></span>
                gap
              </span>
            `
          : ''}
        ${args.offsetValue > 0
          ? html`
              <span>
                <span
                  class="overflow-handler-swatch overflow-handler-swatch-offset-value"></span>
                offset value
              </span>
            `
          : ''}
      </div>
      ${Array.from({ length: args.instanceCount }, () => renderInstance(args))}
    </div>
    <style>
      ${styles}
    </style>
  `,
};

const meta = {
  title: 'Utilities/OverflowHandler',
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: true },
  },
  tags: [
    // '!dev', // uncomment to hide from the sidebar
    '!autodocs',
  ],
};

export default meta;
