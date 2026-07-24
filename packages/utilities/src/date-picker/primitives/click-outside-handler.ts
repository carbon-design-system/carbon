/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Configuration for click outside detection
 */
export interface ClickOutsideConfig {
  /**
   * Whether the component is currently open/active
   */
  isOpen: boolean;

  /**
   * Function to check if a node is within the component
   *
   * React example:
   * ```typescript
   * containsNode: (node) => {
   *   return (
   *     (calendarRef.current?.contains(node) ?? false) ||
   *     (startInputRef.current?.contains(node) ?? false) ||
   *     (endInputRef.current?.contains(node) ?? false)
   *   );
   * }
   * ```
   *
   * Web Components example:
   * ```typescript
   * containsNode: (node) => {
   *   return this.contains(node) || (this.shadowRoot?.contains(node) ?? false);
   * }
   * ```
   */
  containsNode: (node: Node) => boolean;

  /**
   * Callback when click outside is detected
   */
  onOutsideClick: () => void;

  /**
   * Whether to use capture phase (default: true)
   * Using capture phase ensures the handler runs before other click handlers
   */
  useCapture?: boolean;

  /**
   * Delay in milliseconds before attaching listener (default: 0)
   *
   * Setting this to 0 uses a defensive approach where the listener is attached
   * on the next event loop tick, preventing the click that opened the component
   * from immediately triggering a close.
   *
   * This is particularly important when the same click that opens the calendar
   * might otherwise be caught by the outside click handler.
   */
  attachDelay?: number;
}

/**
 * Creates a click outside handler with proper lifecycle management
 *
 * This utility provides a framework-agnostic way to detect clicks outside
 * a component and trigger a callback. It combines best practices from both
 * React and Web Components implementations:
 *
 * - Uses defensive timing (from React) to prevent the opening click from closing
 * - Supports flexible element detection (from Web Components)
 * - Provides clean lifecycle management
 * - Fully testable and reusable
 *
 * @example React usage
 * ```typescript
 * useEffect(() => {
 *   if (!context.isOpen) {
 *     return;
 *   }
 *
 *   const handler = new ClickOutsideHandler({
 *     isOpen: context.isOpen,
 *     containsNode: (node: Node) => {
 *       const calendarEl = calendarRef.current;
 *       const startInputEl = startInputRef.current;
 *       const endInputEl = endInputRef.current;
 *
 *       return (
 *         (calendarEl?.contains(node) ?? false) ||
 *         (startInputEl?.contains(node) ?? false) ||
 *         (endInputEl?.contains(node) ?? false)
 *       );
 *     },
 *     onOutsideClick: () => send(DatePickerEvent.OUTSIDE_CLICK),
 *     useCapture: true,
 *     attachDelay: 0,
 *   });
 *
 *   handler.attach();
 *
 *   return () => {
 *     handler.detach();
 *   };
 * }, [context.isOpen, send]);
 * ```
 *
 * @example Web Components usage
 * ```typescript
 * connectedCallback() {
 *   super.connectedCallback();
 *
 *   this._clickOutsideHandler = new ClickOutsideHandler({
 *     isOpen: this.open,
 *     containsNode: (node: Node) => {
 *       return this.contains(node) || (this.shadowRoot?.contains(node) ?? false);
 *     },
 *     onOutsideClick: () => {
 *       if (this._adapter) {
 *         this._adapter.send(DatePickerEvent.OUTSIDE_CLICK);
 *       }
 *     },
 *     useCapture: true,
 *     attachDelay: 0,
 *   });
 *
 *   this._clickOutsideHandler.attach();
 * }
 *
 * disconnectedCallback() {
 *   super.disconnectedCallback();
 *   this._clickOutsideHandler?.detach();
 *   this._clickOutsideHandler = null;
 * }
 *
 * updated(changedProperties: PropertyValues) {
 *   super.updated(changedProperties);
 *
 *   if (changedProperties.has('open')) {
 *     this._clickOutsideHandler?.updateConfig({ isOpen: this.open });
 *   }
 * }
 * ```
 */
export class ClickOutsideHandler {
  private handler: ((event: MouseEvent) => void) | null = null;
  private timeoutId: number | null = null;
  private config: ClickOutsideConfig;

  /**
   * Creates a new ClickOutsideHandler instance
   *
   * @param {ClickOutsideConfig} config - Configuration for the click outside handler
   */
  constructor(config: ClickOutsideConfig) {
    this.config = config;
  }

  /**
   * The actual click handler that checks if click is outside
   *
   * @param {MouseEvent} event - The mouse event
   */
  private handleClick = (event: MouseEvent): void => {
    // Early return if not open (defensive check)
    if (!this.config.isOpen) {
      return;
    }

    const target = event.target as Node;

    // Check if click is outside component using the provided containsNode function
    if (!this.config.containsNode(target)) {
      this.config.onOutsideClick();
    }
  };

  /**
   * Attach the click outside listener
   *
   * This method adds the click event listener to the document.
   * If attachDelay is configured, it will delay the attachment to prevent
   * the opening click from immediately triggering a close.
   *
   * Calling attach() multiple times is safe - it will only attach once.
   */
  attach(): void {
    if (this.handler) {
      return; // Already attached
    }

    const useCapture = this.config.useCapture ?? true;
    const delay = this.config.attachDelay ?? 0;

    // Use defensive timing approach - delay attachment to next event loop tick
    // This prevents the click that opened the component from immediately closing it
    this.timeoutId = window.setTimeout(() => {
      document.addEventListener('click', this.handleClick, useCapture);
      this.handler = this.handleClick;
      this.timeoutId = null;
    }, delay);
  }

  /**
   * Detach the click outside listener
   *
   * This method removes the click event listener and cleans up any pending timeouts.
   * It's safe to call detach() multiple times or even if attach() was never called.
   *
   * Always call detach() when the component unmounts or when you no longer need
   * click outside detection to prevent memory leaks.
   */
  detach(): void {
    // Clear any pending attachment
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    // Remove listener if attached
    if (this.handler) {
      const useCapture = this.config.useCapture ?? true;
      document.removeEventListener('click', this.handler, useCapture);
      this.handler = null;
    }
  }

  /**
   * Update configuration
   *
   * This is useful in React when dependencies change, or in Web Components
   * when properties update. You can update any part of the configuration
   * without needing to detach and reattach the handler.
   *
   * @param {Partial<ClickOutsideConfig>} config - Partial configuration to update
   *
   * @example
   * ```typescript
   * // Update just the isOpen state
   * handler.updateConfig({ isOpen: true });
   *
   * // Update multiple properties
   * handler.updateConfig({
   *   isOpen: true,
   *   onOutsideClick: newCallback
   * });
   * ```
   */
  updateConfig(config: Partial<ClickOutsideConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Check if the handler is currently attached
   *
   * @returns true if the handler is attached, false otherwise
   */
  isAttached(): boolean {
    return this.handler !== null;
  }

  /**
   * Check if there's a pending attachment
   *
   * @returns true if attachment is pending (waiting for delay), false otherwise
   */
  isPending(): boolean {
    return this.timeoutId !== null;
  }
}
