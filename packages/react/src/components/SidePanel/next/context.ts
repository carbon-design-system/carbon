/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, type ReactNode } from 'react';
import type { SidePanelProps } from './SidePanel.types';

/**
 * -------------
 * Context setup
 * -------------
 */

export interface SidePanelContextType {
  /**
   * Decorator slot (typically an `AILabel`) rendered by `SidePanel.Header`.
   */
  decorator?: ReactNode;

  /**
   * Called when the user initiates closing, e.g. from the close button.
   */
  onRequestClose?: SidePanelProps['onRequestClose'];

  /**
   * Id applied to the title so the root can reference it with
   * `aria-labelledby`.
   */
  titleId?: string;

  /**
   * Whether the header is fully collapsed.
   */
  fullyCollapsed?: boolean;

  /**
   * Setter used by `SidePanel.Body` to report whether the header is fully
   * collapsed as the body scrolls.
   */
  setFullyCollapsed?: (collapsed: boolean) => void;

  /**
   * Disables the scroll-collapse behavior for this header instance.
   * @default false
   */
  disableHeaderCollapse?: boolean;

  /**
   * Setter used by `SidePanel.Header` to sync `disableHeaderCollapse` to the
   * root.
   */
  setDisableHeaderCollapse?: (disabled: boolean) => void;

  /**
   * Accessible description for the close icon button, set by
   * `SidePanel.Header`.
   */
  closeIconDescription?: string;

  /**
   * Whether the close button is hidden, set by `SidePanel.Header`.
   */
  hideCloseButton?: boolean;

  /**
   * Callback fired when the collapsed state changes during body scroll.
   * Receives `true` when the header is fully collapsed, `false` when expanded.
   */
  onHeaderCollapse?: (isCollapsed: boolean) => void;
}

export const SidePanelContext = createContext<SidePanelContextType>({});
