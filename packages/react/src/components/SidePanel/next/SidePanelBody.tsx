/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import cx from 'classnames';
import { useCollapsible } from '../../../internal/useCollapsible';
import { useMergedRefs } from '../../../internal/useMergedRefs';
import { usePrefix } from '../../../internal/usePrefix';
import { SidePanelContext } from './context';
import type { SidePanelBodyProps } from './SidePanel.types';

/**
 * ----------------
 * SidePanelBody
 * ----------------
 *
 * Scrollable content area. Scrolling or dragging down collapses the header,
 * and scrolling back to the top expands it, unless `disableHeaderCollapse` is
 * set on `SidePanel.Header`.
 */
const SidePanelBody = forwardRef<HTMLDivElement, SidePanelBodyProps>(
  ({ children, className, isFlush = false }, ref) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--side-panel__next`;
    const { disableHeaderCollapse, setFullyCollapsed } =
      useContext(SidePanelContext);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const mergedRef = useMergedRefs<HTMLDivElement>([ref, setContainer]);

    const collapseHeader = useCallback(
      (collapse: boolean) => {
        if (!container) {
          return;
        }
        if (collapse) {
          // Collapse only when there is something to scroll.
          if (container.scrollHeight > container.clientHeight) {
            setFullyCollapsed?.(true);
          }
        } else if (container.scrollTop === 0) {
          // Expand when the scroll reaches the top.
          setFullyCollapsed?.(false);
        }
      },
      [container, setFullyCollapsed]
    );

    useCollapsible({
      container,
      triggerCollapse: collapseHeader,
      disableHeaderCollapse,
    });

    // Expand the header when the collapse gets disabled.
    useEffect(() => {
      if (disableHeaderCollapse) {
        setFullyCollapsed?.(false);
      }
    }, [disableHeaderCollapse, setFullyCollapsed]);

    return (
      <div
        ref={mergedRef}
        className={cx(`${blockClass}__body`, className, {
          [`${blockClass}__flush`]: isFlush,
        })}>
        {children}
      </div>
    );
  }
);
SidePanelBody.displayName = 'SidePanelBody';

export default SidePanelBody;
