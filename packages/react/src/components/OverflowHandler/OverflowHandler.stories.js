/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Manual-testing stories for the overflowHandler utility.
 * Each story targets one review concern from PR #22759.
 *
 * Drag the resize handle (bottom-right of the container) to change width/height.
 */

import React, { useEffect, useRef, useState } from 'react';
import { createOverflowHandler } from '@carbon/utilities/overflowHandler';
import './OverflowHandler.stories.scss';

export default {
  title: 'Utilities/OverflowHandler',
  parameters: { layout: 'padded' },
};

/** Formats the visible/hidden node arrays into a human-readable string. */
const fmt = (visible, hidden) =>
  `visible : [${visible.map((n) => n.textContent?.trim()).join(', ')}]\n` +
  `hidden  : [${hidden.map((n) => n.textContent?.trim()).join(', ')}]`;

/** Live log panel rendered beneath the story. */
function Log({ text }) {
  return <pre className="overflow-handler-log">{text}</pre>;
}

/**
 * A single self-contained overflow handler instance with its own state and
 * handler lifecycle. Accepts the same options as `createOverflowHandler`.
 */
function OverflowInstance({
  index,
  itemCount,
  maxVisibleItems,
  offsetValue,
  gap,
  fixedIndex,
  dimension,
}) {
  const ref = useRef(null);
  const [{ hiddenItems, log }, setState] = useState({
    hiddenItems: [],
    log: '',
  });

  // Re-create the handler whenever any option changes.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let handler;
    try {
      handler = createOverflowHandler({
        container: el,
        dimension,
        gap,
        offsetValue,
        ...(maxVisibleItems > 0 ? { maxVisibleItems } : {}),
        onChange(visible, hidden) {
          setState({ hiddenItems: hidden, log: fmt(visible, hidden) });
        },
      });
    } catch (err) {
      setState({ hiddenItems: [], log: `ERROR: ${err.message}` });
    }

    return () => {
      handler?.disconnect();
    };
  }, [itemCount, maxVisibleItems, offsetValue, gap, fixedIndex, dimension]);

  const isVertical = dimension === 'height';
  const containerModifier = isVertical
    ? 'overflow-handler-container-vertical'
    : 'overflow-handler-container-horizontal';

  // The `gap` control drives the CSS gap property; it cannot live in a static
  // stylesheet, so it remains as a single targeted inline style here.
  return (
    <div className="overflow-handler-instance">
      <p className="overflow-handler-instance-label">Instance {index + 1}</p>
      <div
        ref={ref}
        className={`overflow-handler-container ${containerModifier}`}
        style={{ gap }}>
        {Array.from({ length: itemCount }, (_, i) => {
          const n = i + 1;
          const isFixed = fixedIndex > 0 && n === fixedIndex;
          return (
            <div
              key={`item${n}`}
              {...(isFixed ? { 'data-fixed': '' } : {})}
              className={`overflow-handler-item${isFixed ? ' overflow-handler-item-fixed' : ''}`}>
              Item {n}
              {isFixed ? ' ★' : ''}
            </div>
          );
        })}
        <div
          data-offset
          data-hidden
          title={hiddenItems.map((n) => n.textContent?.trim()).join(', ')}
          className="overflow-handler-offset">
          {hiddenItems.length > 0 ? `+${hiddenItems.length} more` : '+0 more'}
        </div>
      </div>
      <Log text={log} />
    </div>
  );
}

export const Default = {
  args: {
    instanceCount: 1,
    itemCount: 8,
    maxVisibleItems: 0,
    offsetValue: 0,
    gap: 0,
    fixedIndex: 0,
    dimension: 'width',
  },
  argTypes: {
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
        'Mark item N as data-fixed (always visible). 0 = none. E.g. 3 → Item 3 gets data-fixed.',
    },
    dimension: {
      control: { type: 'radio' },
      options: ['width', 'height'],
      description: 'Axis to measure overflow along.',
    },
  },
  render({
    instanceCount,
    itemCount,
    maxVisibleItems,
    offsetValue,
    gap,
    fixedIndex,
    dimension,
  }) {
    return (
      <>
        <div className="overflow-handler-legend">
          <span>
            <span className="overflow-handler-swatch overflow-handler-swatch-regular" />
            regular item
          </span>
          <span>
            <span className="overflow-handler-swatch overflow-handler-swatch-fixed" />
            fixed item ★ (<code>data-fixed</code>)
          </span>
          <span>
            <span className="overflow-handler-swatch overflow-handler-swatch-offset" />
            offset item (<code>data-offset</code>)
          </span>
        </div>

        {Array.from({ length: instanceCount }, (_, i) => (
          <OverflowInstance
            key={i}
            index={i}
            itemCount={itemCount}
            maxVisibleItems={maxVisibleItems}
            offsetValue={offsetValue}
            gap={gap}
            fixedIndex={fixedIndex}
            dimension={dimension}
          />
        ))}
      </>
    );
  },
};
Default.tags = ['!dev', '!autodocs']; // remove this to enable story - is still available in slug /utilities-overflowhandler--default
Default.parameters = {
  chromatic: { disableSnapshot: true }, // remove this to enable snapshots
};
