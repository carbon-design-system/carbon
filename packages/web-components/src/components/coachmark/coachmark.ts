/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './coachmark.scss?lit';
import { SignalWatcher } from '@lit-labs/signals';
import '../popover/index';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import { makeDraggable } from '@carbon/utilities/makeDraggable';
import {
  resetCoachmarkDetailsSignal,
  updateCoachmarkDetailsSignal,
} from './coachmark-context';

export const blockClass = `${prefix}--coachmark`;

/**
 * coachmark main component
 * @element cds-coachmark
 * @fires cds-coachmark-opened
 *   The custom event fired when the coachmark is opened.
 *   This event can be used to perform actions such as focusing elements when the coachmark becomes visible.
 * @fires cds-coachmark-closed
 *   The custom event fired when the coachmark is closed.
 *   This event can be used to perform actions such as restoring focus when the coachmark is dismissed.
 */
@customElement(`${prefix}-coachmark`)
class CDSCoachmark extends SignalWatcher(HostListenerMixin(LitElement)) {
  /**
   * Specifies whether the component is currently open.
   */
  @property({ type: Boolean, reflect: true })
  open: boolean = false;
  /**
   * Where to render the Coachmark relative to its target.
   */
  @property({ reflect: true, type: String })
  align?: string = POPOVER_ALIGNMENT.TOP;
  /**
   * Fine tune the position of the target in pixels.
   */
  @property({ type: Object })
  position?: { x: number; y: number };
  /**
   * Specifies whether the component is floating or not.
   */
  @property({ type: Boolean, reflect: true })
  floating?: boolean = false;
  /**
   * Specify whether the component should be rendered on high-contrast.
   */
  @property({ type: Boolean, reflect: true })
  highContrast?: boolean = false;
  /**
   * Specify whether a drop shadow should be rendered on the popover.
   */
  @property({ type: Boolean, reflect: true })
  dropShadow?: boolean = false;
  /**
   * Specify whether a caret should be rendered on the popover. This is intended to use only for coachmark patterns.
   */
  @property({ type: Boolean, reflect: true })
  caret?: boolean = false;
  /**
   * CSS selector for the element that should receive focus when the coachmark opens.
   * If not provided, no automatic focus management will occur.
   */
  @property({ attribute: 'selector-primary-focus', reflect: true })
  selectorPrimaryFocus?: string;
  /**
   * Aria label for when the floating coachmark is picked up for dragging.
   */
  @property({ attribute: 'drag-aria-label', reflect: true })
  dragAriaLabel?: string = 'Picked up the draggable coachmark';

  private dragCleanup: (() => void) | null = null;
  private keydownHandler: ((event: KeyboardEvent) => void) | null = null;
  private moveCounter: number = 0;
  @state() private isDragging: boolean | null = null;
  @state() private moveAnnouncement: string = '';

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.dragCleanup) {
      this.dragCleanup();
    }
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
    }
    resetCoachmarkDetailsSignal();
  }

  private async setupDraggable() {
    const popover = this.shadowRoot?.querySelector(
      `.${blockClass}--popover`
    ) as HTMLElement;
    const popoverContent = popover.querySelector(
      'cds-popover-content'
    ) as HTMLElement;
    const wrapper = popoverContent.querySelector(
      `.${blockClass}--wrapper`
    ) as HTMLElement;
    const slot = wrapper.querySelector('slot');
    const assignedElements = slot?.assignedElements({ flatten: true });
    const header = assignedElements?.find(
      (el) => el.tagName.toLowerCase() === `${prefix}-coachmark-header`
    ) as LitElement & HTMLElement;
    // Wait for coachmark-header to finish rendering the drag handle
    // (it re-renders based on the signal updated just before this call)
    if (header?.updateComplete) {
      await header.updateComplete;
    }
    requestAnimationFrame(() => {
      const dragHandle = header.shadowRoot?.querySelector(
        `.${prefix}--coachmark-header-drag-handle`
      ) as HTMLElement;

      const dragInactiveInstruction =
        'Press Enter or Space to activate drag mode.';
      const dragActiveInstruction =
        'Use arrow keys to move the coachmark. Press Enter or Space to exit drag mode.';

      // Set initial instructions as aria-label so the screen reader announces
      // them when the drag handle is focused (aria-describedby cannot cross
      // shadow DOM boundaries, so we set the text directly on the element).
      if (dragHandle) {
        dragHandle.setAttribute('aria-label', dragInactiveInstruction);
      }

      const draggable = makeDraggable({
        el: popoverContent,
        dragHandle: header,
        focusableDragHandle: dragHandle,
      });

      const onDragStart = () => {
        this.isDragging = true;
        this.moveCounter = 0;
        this.moveAnnouncement = '';
        popoverContent.classList.add(`${blockClass}--is-dragging`);
        if (this.dragAriaLabel) {
          popoverContent.setAttribute('aria-label', this.dragAriaLabel);
        }
        if (dragHandle) {
          dragHandle.setAttribute('aria-label', dragActiveInstruction);
        }
        updateCoachmarkDetailsSignal({ name: 'isDragging', detail: true });
      };

      const onDragEnd = () => {
        this.isDragging = false;
        this.moveCounter = 0;
        this.moveAnnouncement = '';
        popoverContent.classList.remove(`${blockClass}--is-dragging`);
        popoverContent.removeAttribute('aria-label');
        if (dragHandle) {
          dragHandle.setAttribute('aria-label', dragInactiveInstruction);
        }
        updateCoachmarkDetailsSignal({ name: 'isDragging', detail: false });
      };

      const onDragMove = (event: Event) => {
        const customEvent = event as CustomEvent<{
          direction: string;
          distance: number;
        }>;
        const { direction, distance } = customEvent.detail;
        // Increment counter to make each announcement unique
        this.moveCounter += 1;
        // Add zero-width space multiplied by counter to make string unique without being announced
        const uniqueMarker = '\u200B'.repeat(this.moveCounter);
        this.moveAnnouncement = `Moved ${direction} ${distance} pixels${uniqueMarker}`;
      };

      popoverContent.addEventListener('dragstart', onDragStart);
      popoverContent.addEventListener('dragend', onDragEnd);
      popoverContent.addEventListener('dragmove', onDragMove as EventListener);

      // store cleanup
      this.dragCleanup = () => {
        popoverContent.removeEventListener('dragstart', onDragStart);
        popoverContent.removeEventListener('dragend', onDragEnd);
        popoverContent.removeEventListener(
          'dragmove',
          onDragMove as EventListener
        );
        draggable.cleanup?.();
      };
    });
  }

  firstUpdated() {
    // Setup Escape key handler
    this.keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.open) {
        this.open = false;
      }
    };
    document.addEventListener('keydown', this.keydownHandler);
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('floating')) {
      if (this.floating) {
        this.classList.add(`${blockClass}--floating`);
        this.setupDraggable();
        updateCoachmarkDetailsSignal({
          name: 'floating',
          detail: this.floating,
        });
      } else {
        this.classList.remove(`${blockClass}--floating`);
        if (this.dragCleanup) {
          this.dragCleanup();
          this.dragCleanup = null;
        }
        updateCoachmarkDetailsSignal({
          name: 'floating',
          detail: false,
        });
      }
    }

    if (changedProps.has('position')) {
      const { x = 0, y = 0 } = this.position ?? {};
      if (x !== 0 || y !== 0) {
        this.style.transform = `translate(${x}px, ${y}px)`;
      }
    }

    // Dispatch custom events when coachmark opens or closes
    if (changedProps.has('open')) {
      const init = {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      };

      if (this.open) {
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSCoachmark).eventOpen,
            init
          )
        );
        // Sync floating state into the signal so the header renders correctly
        updateCoachmarkDetailsSignal({
          name: 'floating',
          detail: this.floating ?? false,
        });
        // Re-create the draggable on every open so the isDragging closure
        // variable always starts as false (e.g. after Escape-while-dragging).
        if (this.floating) {
          if (this.dragCleanup) {
            this.dragCleanup();
            this.dragCleanup = null;
          }
          this.setupDraggable();
        }

        // Handle focus management when coachmark opens
        setTimeout(() => {
          requestAnimationFrame(() => {
            let elementToFocus: HTMLElement | null = null;

            if (this.selectorPrimaryFocus) {
              const raw = this.selectorPrimaryFocus.trim();
              const selector =
                raw.startsWith('#') ||
                raw.startsWith('.') ||
                raw.startsWith('[')
                  ? raw
                  : `.${raw}`;
              const found = document.querySelector<HTMLElement>(selector);
              elementToFocus =
                found?.shadowRoot?.querySelector<HTMLElement>(
                  'button, [tabindex]'
                ) ?? found;
            }

            if (!elementToFocus) {
              const wrapper = this.shadowRoot?.querySelector(
                `.${blockClass}--popover cds-popover-content .${blockClass}--wrapper`
              ) as HTMLElement;
              const header = wrapper
                ?.querySelector('slot')
                ?.assignedElements({ flatten: true })
                ?.find(
                  (el) =>
                    el.tagName.toLowerCase() === `${prefix}-coachmark-header`
                ) as HTMLElement;

              if (header?.shadowRoot) {
                // Try drag button for floating coachmarks, fallback to close button
                const dragButton = this.floating
                  ? header.shadowRoot.querySelector<HTMLElement>(
                      `.${prefix}--coachmark-header-drag-handle`
                    )
                  : null;
                const closeButton =
                  header.shadowRoot.querySelector<HTMLElement>(
                    `.${prefix}--coachmark-header-close-button`
                  );
                elementToFocus = dragButton || closeButton;
              }
            }
            if (elementToFocus) {
              elementToFocus.focus();
            }
          });
        }, 100);
      } else {
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSCoachmark).eventClose,
            init
          )
        );
        // Clear floating from the signal so the header hides the drag button
        // while the popover is closed (signal persists across open/close cycles)
        updateCoachmarkDetailsSignal({
          name: 'floating',
          detail: false,
        });

        // Return focus to trigger element when coachmark closes
        requestAnimationFrame(() => {
          const triggerSlot = this.shadowRoot?.querySelector(
            'slot[name="trigger"]'
          ) as HTMLSlotElement;
          const triggerElement = triggerSlot?.assignedElements({
            flatten: true,
          })[0] as HTMLElement;
          triggerElement?.focus();
        });
      }
    }
  }

  private handlePopoverClosed = () => {
    // Sync coachmark's open state when popover closes
    // This ensures the states stay in sync for outside clicks
    if (this.open) {
      this.open = false;
    }
  };

  render() {
    // Use explicit caret value if provided, otherwise derive from floating state
    const caretValue =
      this.caret !== undefined
        ? this.caret
        : this.floating === true
          ? false
          : true;

    return html`
      <cds-popover
        part="popover"
        exportparts="popover-container"
        class="${blockClass}--popover"
        ?open=${this.open}
        .caret=${caretValue}
        ?highContrast=${this.highContrast}
        align=${this.align}
        .dropShadow=${this.dropShadow}
        @cds-popover-closed=${this.handlePopoverClosed}>
        <slot name="trigger"></slot>
        <cds-popover-content part="popover-content" exportparts="content">
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            class="${prefix}--visually-hidden">
            ${this.floating
              ? this.isDragging === true
                ? 'Drag mode active.'
                : this.isDragging === false
                  ? 'Drag mode ended.'
                  : ''
              : ''}
          </div>
          <div
            role="status"
            aria-live="assertive"
            aria-atomic="true"
            class="${prefix}--visually-hidden">
            ${this.floating ? this.moveAnnouncement : ''}
          </div>
          <div class="${blockClass}--wrapper">
            <slot></slot>
          </div>
        </cds-popover-content>
      </cds-popover>
    `;
  }

  /**
   * The name of the custom event fired when this coachmark is opened.
   */
  static get eventOpen() {
    return `${prefix}-coachmark-opened`;
  }

  /**
   * The name of the custom event fired when this coachmark is closed.
   */
  static get eventClose() {
    return `${prefix}-coachmark-closed`;
  }

  static styles = styles;
}

export default CDSCoachmark;
