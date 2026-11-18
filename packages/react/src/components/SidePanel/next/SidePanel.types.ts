/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  ElementType,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';
import type { ButtonProps } from '../../Button';
import type { MenuButtonProps } from '../../MenuButton';

// ============================================================================
// Core Types
// ============================================================================

export type SidePanelSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SidePanelPlacement = 'right' | 'left';
export type SidePanelVariant = 'slideIn' | 'slideOver';

// ============================================================================
// 1. Root Component: SidePanel
// ============================================================================

export interface SidePanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Accessible name for the side panel. Use when the panel has no visible
   * title.
   */
  'aria-label'?: string;

  /**
   * Id of the element that labels the side panel. Defaults to the id of the
   * title rendered by `SidePanel.HeaderContent` when no `aria-label` is set.
   */
  'aria-labelledby'?: string;

  /**
   * Side panel content: typically `SidePanel.Header`, `SidePanel.Body`, and
   * `SidePanel.Footer`.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Optional decorator slot, typically an `<AILabel>`, rendered in the
   * top-right header area before the close button.
   */
  decorator?: ReactNode;

  /**
   * When `true` in the `slideOver` variant, renders a backdrop overlay behind
   * the panel.
   * @default false
   */
  includeOverlay?: boolean;

  /**
   * Ref to the launcher/trigger element. Focus returns here when the panel
   * closes.
   */
  launcherButtonRef?: RefObject<HTMLElement | null>;

  /**
   * Controls the open/closed visibility state of the side panel.
   * @default false
   */
  open?: boolean;

  /**
   * Callback fired when the user initiates closing (close button, overlay
   * click, or `Esc`).
   */
  onRequestClose?: (event: MouseEvent | KeyboardEvent) => void;

  /**
   * Callback fired after the exit animation completes and the panel unmounts
   * from the DOM.
   */
  onUnmount?: () => void;

  /**
   * Side of the viewport where the side panel docks.
   * @default 'right'
   */
  placement?: SidePanelPlacement;

  /**
   * Prevents panel dismissal when clicking outside its bounding box.
   * @default false
   */
  preventCloseOnClickOutside?: boolean;

  /**
   * When `true`, allows the panel to be resized. Only supported in the
   * `slideOver` variant, and only on viewports wider than 768px.
   * @default false
   */
  resizable?: boolean;

  /**
   * CSS selector for the page content wrapper that is pushed when
   * `variant="slideIn"`. Required when `variant="slideIn"`.
   */
  selectorPageContent?: string;

  /**
   * CSS selector matching the element that should receive initial focus when
   * the panel opens.
   */
  selectorPrimaryFocus?: string;

  /**
   * Panel width token.
   * - `xs`: 16rem (256px)
   * - `sm`: 20rem (320px)
   * - `md`: 30rem (480px)
   * - `lg`: 40rem (640px)
   * - `xl`: 65rem (1040px)
   * - `2xl`: 80rem (1280px)
   * @default 'md'
   */
  size?: SidePanelSize;

  /**
   * Presentation mode:
   * - `'slideOver'`: overlays the page content, with an optional backdrop and
   *   focus trap.
   * - `'slideIn'`: pushes and reflows page content via `selectorPageContent`.
   * @default 'slideOver'
   */
  variant?: SidePanelVariant;
}

// ============================================================================
// 2. Header Layout: SidePanel.Header
// ============================================================================

export interface SidePanelHeaderProps {
  /**
   * Header children: typically `SidePanel.HeaderContent`, `SidePanel.Toolbar`,
   * and `SidePanel.NavBar`.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Accessible description and tooltip for the close icon button.
   * @default 'Close'
   */
  closeIconDescription?: string;

  /**
   * Disables the scroll-collapse behavior for this header instance.
   * @default false
   */
  disableHeaderCollapse?: boolean;

  /**
   * Hides the default top-right close icon button.
   * @default false
   */
  hideCloseButton?: boolean;

  /**
   * Callback fired when the collapsed state changes during body scroll.
   * Receives `true` when the header is fully collapsed, `false` when expanded.
   */
  onHeaderCollapse?: (isCollapsed: boolean) => void;
}

// ============================================================================
// 3. Header Content: SidePanel.HeaderContent
// ============================================================================

export interface SidePanelHeaderContentProps {
  /**
   * Additional custom content rendered in the header content area.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Subtitle or descriptive text placed below the title.
   */
  description?: ReactNode;

  /**
   * Actions slot rendered on the right side of the header content, typically
   * `<SidePanel.HeaderActions>`.
   */
  headerActions?: ReactNode;

  /**
   * Context label displayed above the title.
   */
  label?: ReactNode;

  /**
   * Primary title of the side panel. Strings truncate with a tooltip on
   * overflow. When omitted, the header row height and layout are preserved.
   */
  title?: ReactNode;

  /**
   * Content or icon placed immediately after the title text.
   */
  titleEnd?: ReactNode;

  /**
   * Media slot (e.g. pictogram or thumbnail) aligned alongside the title.
   */
  titleMedia?: ReactNode;

  /**
   * Content or icon placed immediately before the title text, e.g. a status
   * indicator.
   */
  titleStart?: ReactNode;
}

// ============================================================================
// 4. Header Actions & Item
// ============================================================================

export interface SidePanelHeaderActionsProps {
  /**
   * One or more `SidePanel.HeaderActionItem` components.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Props forwarded to the overflow `MenuButton` shown when action items exceed
   * the available header space.
   */
  menuButtonProps?: Partial<MenuButtonProps>;
}

export interface SidePanelHeaderActionItemProps {
  /**
   * Single interactive button or control.
   */
  children: ReactElement;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Unique identifier used for DOM tracking and overflow menu keying.
   */
  id: string;

  /**
   * Text label used when this action folds into the overflow menu.
   */
  overflowItemLabel: string;
}

// ============================================================================
// 5. Header Sub-Bars: Toolbar & NavBar
// ============================================================================

export interface SidePanelToolbarProps {
  /**
   * Toolbar controls, filters, or action buttons.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Keeps the toolbar visible when the header is collapsed. When `false`, the
   * toolbar collapses with the header, like the label and description.
   * @default true
   */
  stickyToolbar?: boolean;
}

export interface SidePanelNavBarProps {
  /**
   * Sticky navigation controls, e.g. `<Tabs>` or `<ProgressIndicator>`.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;
}

// ============================================================================
// 6. Body: SidePanel.Body
// ============================================================================

export interface SidePanelBodyProps {
  /**
   * Main scrollable content of the side panel.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * When `true`, the content takes the full width with no padding.
   * @default false
   */
  isFlush?: boolean;
}

// ============================================================================
// 7. Footer: SidePanel.Footer
// ============================================================================

export interface SidePanelFooterProps {
  /**
   * Action button configurations rendered in an automated responsive
   * `ButtonSet`. Ignored when `children` is provided.
   */
  actions?: (ButtonProps<ElementType> & { label: string; key?: string })[];

  /**
   * Size applied to all automated footer action buttons.
   * @default 'lg'
   */
  buttonSize?: ButtonProps<ElementType>['size'];

  /**
   * Custom footer content. When provided, overrides the automated button
   * layout.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;
}
