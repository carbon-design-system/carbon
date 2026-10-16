/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode, useMemo, useRef, useState, Children } from 'react';
import cx from 'classnames';
import { OverflowMenu } from '../OverflowMenu/next';
import { MenuItem } from '../Menu';
import { createOverflowHandler } from '@carbon/utilities';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { CardActionProps } from './CardAction';

const componentName = 'CardActions';

export interface CardActionsProps {
  /**
   * Provide the contents of the CardActions (typically CardAction components).
   */
  children?: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Aria label for the overflow menu
   */
  overflowMenuLabel?: string;
}

interface ActionItem {
  id: string;
  element: React.ReactElement;
  label?: string;
}

// A measure function reads layout and returns the style write to apply (or
// undefined when nothing changed).
type ClearanceMeasure = () => (() => void) | undefined;

// Header clearance updates from every mounted card are flushed together: all
// layout reads first, then all style writes. Interleaving a read and a write
// per card would force a synchronous layout for each card.
const pendingClearanceMeasures = new Set<ClearanceMeasure>();
let clearanceFlushId: number | undefined;
let clearanceMicrotaskQueued = false;

const flushClearanceUpdates = () => {
  clearanceMicrotaskQueued = false;
  const batch = Array.from(pendingClearanceMeasures);
  pendingClearanceMeasures.clear();
  const writes = batch.map((measureFn) => measureFn());
  writes.forEach((write) => write?.());
};

const scheduleClearanceUpdate = (
  measure: ClearanceMeasure,
  { beforePaint = false } = {}
) => {
  pendingClearanceMeasures.add(measure);
  if (beforePaint) {
    // A microtask runs after React has finished the whole commit (every card's
    // layout effect) and before the browser paints, so the first paint already
    // has the measured value instead of the fallback. One microtask serves
    // every card mounted in the same commit.
    if (!clearanceMicrotaskQueued) {
      clearanceMicrotaskQueued = true;
      Promise.resolve().then(flushClearanceUpdates);
    }
    return;
  }
  if (clearanceFlushId !== undefined) {
    return;
  }
  clearanceFlushId = requestAnimationFrame(() => {
    clearanceFlushId = undefined;
    flushClearanceUpdates();
  });
};

// One ResizeObserver is shared by every CardActions on the page. Each card
// registers its header and action buttons as targets, so any change that can
// move the title or the buttons (font swap, late-loading media, text wrap,
// viewport resize) triggers a re-measure without per-event special cases. The
// observer is created lazily so importing this module never touches browser
// globals during SSR. The callback only schedules work: measuring and writing
// happen in the shared animation frame above, never inside the observer
// callback, which avoids resize-loop errors from our own style writes.
const clearanceMeasures = new WeakMap<Element, ClearanceMeasure>();
let clearanceObserver: ResizeObserver | undefined;

const getClearanceObserver = () => {
  if (!clearanceObserver) {
    clearanceObserver = new ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        const measure = clearanceMeasures.get(target);
        if (measure) {
          scheduleClearanceUpdate(measure);
        }
      });
    });
  }
  return clearanceObserver;
};

/**
 * CardActions is a container for action buttons in the card header.
 * Positioned in the top-right corner with 8px gap between actions.
 * When actions exceed 50% of available header space, overflow menu is shown.
 *
 * The card title reserves only the space the visible actions occupy (or none
 * when it sits below them), published as `--cds--card__actions-clearance` on
 * the card header.
 */
export const CardActions = ({
  children,
  className,
  overflowMenuLabel = 'More actions',
  ...rest
}: CardActionsProps) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--card`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hiddenItems, setHiddenItems] = useState<ActionItem[]>([]);
  const classes = cx(`${blockClass}__actions`, className);

  // Build action items only when children change.
  // Label resolution order (matches source):
  //   1. CardAction.label explicit prop
  //   2. Direct child button props: label → iconDescription → text children
  //   3. Fallback ordinal string
  const actionItems = useMemo(() => {
    const items: ActionItem[] = [];
    Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        const actionProps = child.props as CardActionProps;
        const button = actionProps.children;
        type ButtonLikeProps = {
          label?: string;
          iconDescription?: string;
          children?: React.ReactNode;
        };
        const buttonProps = React.isValidElement(button)
          ? (button.props as ButtonLikeProps)
          : null;

        const label =
          actionProps.label ??
          buttonProps?.label ??
          buttonProps?.iconDescription ??
          (typeof buttonProps?.children === 'string'
            ? buttonProps.children
            : `Action ${index + 1}`);

        const id = `${label}-${index}`;
        items.push({ id, element: child, label });
      }
    });
    return items;
  }, [children]);

  useIsomorphicEffect(() => {
    const actionsEl = containerRef.current;
    const headerEl = actionsEl?.parentElement;
    if (!actionsEl || !headerEl) {
      return;
    }

    const clearanceVar = `--${prefix}--card__actions-clearance`;

    if (actionItems.length === 0) {
      // __actions stays mounted when emptied. There are no buttons to clear,
      // and removing the property would fall back to the 50% reservation.
      headerEl.style.setProperty(clearanceVar, '0px');
      return;
    }

    const gap = parseFloat(getComputedStyle(actionsEl).columnGap || '0');
    let disposed = false;
    // Seed from the DOM so a re-run of this effect does not rewrite an
    // unchanged value.
    let lastClearance = headerEl.style.getPropertyValue(clearanceVar);

    // Publish how much inline space (from the header's end edge) the title must
    // leave free for the actions, as a CSS custom property on __header. The
    // title consumes it as its end margin.
    //
    // __actions itself is a fixed-width (50%) absolutely positioned box, so its
    // own size says nothing about how much room the buttons really occupy.
    // Instead measure the start edge of the leftmost *rendered* child. Children
    // hidden by createOverflowHandler are display:none and have a zero-width
    // rect, so they are skipped.
    //
    // If the title sits entirely below the actions (e.g. content such as a
    // CardHeaderMedia is rendered above it) they cannot collide, so no
    // clearance is needed and the title may use the full width. This is a
    // purely geometric check, so it holds for any content above the title.
    //
    // The title is looked up as a direct child of the header, the same
    // relationship the stylesheet rule that consumes the value relies on. If a
    // consumer wraps the title, neither applies and the title is unaffected.
    const measureTitleClearance: ClearanceMeasure = () => {
      if (disposed) {
        return;
      }
      const titleEl = Array.from(headerEl.children).find((child) =>
        child.classList.contains(`${blockClass}__title`)
      );
      const headerRect = headerEl.getBoundingClientRect();
      const actionsRect = actionsEl.getBoundingClientRect();
      const isRtl = getComputedStyle(headerEl).direction === 'rtl';
      // getBoundingClientRect reports post-transform pixels, but the value is
      // written as CSS pixels. Divide by any ancestor scale to convert back.
      const scale =
        headerEl.offsetWidth > 0 ? headerRect.width / headerEl.offsetWidth : 1;

      let clearance = 0;
      const titleBelowActions =
        titleEl && titleEl.getBoundingClientRect().top >= actionsRect.bottom;

      if (!titleBelowActions) {
        const rects = Array.from(actionsEl.children)
          .map((child) => child.getBoundingClientRect())
          .filter((rect) => rect.width > 0);
        if (rects.length > 0) {
          // Deliberately not clamped to the actions box. A button that grows
          // after mount can briefly spill out of it before the overflow
          // handler collapses it, and the title must still clear the button.
          clearance = isRtl
            ? Math.max(...rects.map((rect) => rect.right)) - headerRect.left
            : headerRect.right - Math.min(...rects.map((rect) => rect.left));
          clearance /= scale || 1;
        }
      }

      const value = `${Math.max(Math.round(clearance), 0)}px`;
      // Skip the write when nothing changed so no style invalidation occurs.
      if (value === lastClearance) {
        return;
      }
      return () => {
        lastClearance = value;
        headerEl.style.setProperty(clearanceVar, value);
      };
    };
    const updateTitleClearance = () =>
      scheduleClearanceUpdate(measureTitleClearance);
    // First measurement runs before paint so the title never flashes at the
    // fallback width. Later changes go through the frame-batched path above.
    scheduleClearanceUpdate(measureTitleClearance, { beforePaint: true });

    const handler = createOverflowHandler({
      container: actionsEl,
      gap,
      onChange: (_visible, hidden) => {
        const hiddenIds = hidden.map((el) => el.dataset.id);
        setHiddenItems(
          actionItems.filter((item) => hiddenIds.includes(item.id))
        );
        // data-hidden attributes are already applied at this point, so the
        // measured layout reflects the new visible set.
        updateTitleClearance();
      },
    });

    // Observing a target delivers an initial notification, which performs the
    // first measurement. After that, any size change of the header or of a
    // button (including fonts finishing loading) re-measures.
    const observer = getClearanceObserver();
    const observedEls = [headerEl, ...Array.from(actionsEl.children)];
    observedEls.forEach((el) => {
      clearanceMeasures.set(el, measureTitleClearance);
      observer.observe(el);
    });

    return () => {
      disposed = true;
      pendingClearanceMeasures.delete(measureTitleClearance);
      observedEls.forEach((el) => {
        observer.unobserve(el);
        clearanceMeasures.delete(el);
      });
      handler.disconnect();
      // The custom property is intentionally left on the header: it is only
      // read while __actions exists, and this effect re-runs on every children
      // change, where removing it would briefly reset the title to its
      // fallback width.
    };
  }, [actionItems, blockClass, prefix]);

  return (
    <div ref={containerRef} className={classes} {...rest}>
      {actionItems.map((item) => (
        <div key={item.id} data-id={item.id}>
          {item.element}
        </div>
      ))}
      <div
        data-offset
        data-hidden
        data-floating-menu-container
        style={{
          position: 'relative',
        }}>
        <OverflowMenu size="sm" label={overflowMenuLabel}>
          {hiddenItems.map((item) => (
            <MenuItem
              key={item.id}
              label={item.label || 'Action'}
              onClick={() => {
                type ClickableProps = { onClick?: () => void };
                type ActionChildren = { children?: React.ReactNode };
                const elementProps = item.element.props as ActionChildren;
                const button = elementProps.children;
                if (button && React.isValidElement(button)) {
                  const buttonProps = button.props as ClickableProps;
                  if (buttonProps.onClick) {
                    buttonProps.onClick();
                  }
                }
              }}
            />
          ))}
        </OverflowMenu>
      </div>
    </div>
  );
};

CardActions.displayName = componentName;
