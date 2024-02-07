/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { MODAL_SIZE } from './defs';
import styles from './modal.scss?lit';
import { selectorTabbable } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { MODAL_SIZE };

// eslint-disable-next-line no-bitwise
const PRECEDING =
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
// eslint-disable-next-line no-bitwise
const FOLLOWING =
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

/**
 * Tries to focus on the given elements and bails out if one of them is successful.
 *
 * @param elems The elements.
 * @param reverse `true` to go through the list in reverse order.
 * @returns `true` if one of the attempts is successful, `false` otherwise.
 */
function tryFocusElems(
  elems: NodeListOf<HTMLElement>,
  reverse: boolean = false
) {
  if (!reverse) {
    for (let i = 0; i < elems.length; ++i) {
      const elem = elems[i];
      elem.focus();
      if (elem.ownerDocument!.activeElement === elem) {
        return true;
      }
    }
  } else {
    for (let i = elems.length - 1; i >= 0; --i) {
      const elem = elems[i];
      elem.focus();
      if (elem.ownerDocument!.activeElement === elem) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Modal.
 *
 * @element cds-modal
 * @csspart dialog The dialog.
 * @fires cds-modal-beingclosed
 *   The custom event fired before this modal is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this modal.
 * @fires cds-modal-closed - The custom event fired after this modal is closed upon a user gesture.
 */
@customElement(`${prefix}-modal`)
class CDSModal extends HostListenerMixin(LitElement) {
  /**
   * The element that had focus before this modal gets open.
   */
  private _launcher: Element | null = null;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLAnchorElement;

  /**
   * Handles `click` event on this element.
   *
   * @param event The event.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: MouseEvent) => {
    if (
      event.composedPath().indexOf(this.shadowRoot!) < 0 &&
      !this.preventCloseOnClickOutside
    ) {
      this._handleUserInitiatedClose(event.target);
    }
  };

  /**
   * Handles `blur` event on this element.
   *
   * @param event The event.
   */
  @HostListener('shadowRoot:focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = async ({ target, relatedTarget }: FocusEvent) => {
    const {
      open,
      _startSentinelNode: startSentinelNode,
      _endSentinelNode: endSentinelNode,
    } = this;
    const oldContains = target !== this && this.contains(target as Node);
    const currentContains =
      relatedTarget !== this &&
      (this.contains(relatedTarget as Node) ||
        (this.shadowRoot?.contains(relatedTarget as Node) &&
          relatedTarget !== (endSentinelNode as Node)));

    // Performs focus wrapping if _all_ of the following is met:
    // * This modal is open
    // * The viewport still has focus
    // * Modal body used to have focus but no longer has focus
    const { selectorTabbable: selectorTabbableForModal } = this
      .constructor as typeof CDSModal;
    if (open && relatedTarget && oldContains && !currentContains) {
      const comparisonResult = (target as Node).compareDocumentPosition(
        relatedTarget as Node
      );
      // eslint-disable-next-line no-bitwise
      if (relatedTarget === startSentinelNode || comparisonResult & PRECEDING) {
        await (this.constructor as typeof CDSModal)._delay();
        if (
          !tryFocusElems(
            this.querySelectorAll(selectorTabbableForModal),
            true
          ) &&
          relatedTarget !== this
        ) {
          this.focus();
        }
      }
      // eslint-disable-next-line no-bitwise
      else if (
        relatedTarget === endSentinelNode ||
        comparisonResult & FOLLOWING
      ) {
        await (this.constructor as typeof CDSModal)._delay();
        if (!tryFocusElems(this.querySelectorAll(selectorTabbableForModal))) {
          this.focus();
        }
      }
    }
  };

  @HostListener('document:keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if (key === 'Esc' || key === 'Escape') {
      this._handleUserInitiatedClose(target);
    }
  };

  /**
   * Handles `click` event on the modal container.
   *
   * @param event The event.
   */
  private _handleClickContainer(event: MouseEvent) {
    if (
      (event.target as Element).matches(
        (this.constructor as typeof CDSModal).selectorCloseButton
      ) &&
      !this.preventClose
    ) {
      this._handleUserInitiatedClose(event.target);
    }
  }

  /**
   * Handles user-initiated close request of this modal.
   *
   * @param triggeredBy The element that triggered this close request.
   */
  private _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      if (
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSModal).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSModal).eventClose,
            init
          )
        );
      }
    }
  }

  /**
   * Specify whether the Modal is displaying an alert, error or warning.
   * Should go hand in hand with the danger prop.
   */
  @property({ type: Boolean, reflect: true })
  alert = false;

  /**
   * Specify text for the accessibility label of the header
   */
  @property({ attribute: 'aria-label' })
  ariaLabel = '';

  /**
   * The additional CSS class names for the container <div> of the element.
   */
  @property({ attribute: 'container-class' })
  containerClass = '';

  /**
   * Specify whether or not the Modal content should have any inner padding.
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Specify whether the modal contains scrolling content
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'has-scrolling-content',
  })
  hasScrollingContent = false;

  /**
   * `true` if the modal should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Modal size.
   */
  @property({ reflect: true })
  size = MODAL_SIZE.MEDIUM;

  /**
   * Prevent closing on click outside of modal
   */
  @property({ type: Boolean, attribute: 'prevent-close-on-click-outside' })
  preventCloseOnClickOutside = false;

  /**
   * Prevent the modal from closing after clicking the close button
   */
  @property({ type: Boolean, attribute: 'prevent-close' })
  preventClose = false;

  firstUpdated() {
    const body = this.querySelector(
      (this.constructor as typeof CDSModal).selectorModalBody
    );

    if (!body) {
      const bodyElement = document.createElement(
        (this.constructor as typeof CDSModal).selectorModalBody
      );
      this.appendChild(bodyElement);
    }
  }

  render() {
    const { alert, ariaLabel, size, hasScrollingContent } = this;
    const containerClass = this.containerClass
      .split(' ')
      .filter(Boolean)
      .reduce((acc, item) => ({ ...acc, [item]: true }), {});
    const containerClasses = classMap({
      [`${prefix}--modal-container`]: true,
      [`${prefix}--modal-container--${size}`]: size,
      ...containerClass,
    });
    return html`
      <a
        id="start-sentinel"
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
      <div
        aria-label=${ariaLabel}
        part="dialog"
        class=${containerClasses}
        role="${alert ? 'alert' : 'dialog'}"
        tabindex="-1"
        @click=${this._handleClickContainer}>
        <slot></slot>
        ${hasScrollingContent
          ? html` <div class="cds--modal-content--overflow-indicator"></div> `
          : ``}
      </div>
      <a
        id="end-sentinel"
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
    `;
  }

  async updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._launcher = this.ownerDocument!.activeElement;
        const primaryFocusNode = this.querySelector(
          (this.constructor as typeof CDSModal).selectorPrimaryFocus
        );
        await (this.constructor as typeof CDSModal)._delay();
        if (primaryFocusNode) {
          // For cases where a `carbon-web-components` component (e.g. `<cds-button>`) being `primaryFocusNode`,
          // where its first update/render cycle that makes it focusable happens after `<cds-modal>`'s first update/render cycle
          (primaryFocusNode as HTMLElement).focus();
        } else if (
          !tryFocusElems(
            this.querySelectorAll(
              (this.constructor as typeof CDSModal).selectorTabbable
            ),
            true
          )
        ) {
          this.focus();
        }
      } else if (
        this._launcher &&
        typeof (this._launcher as HTMLElement).focus === 'function'
      ) {
        (this._launcher as HTMLElement).focus();
        this._launcher = null;
      }
    }
  }

  /**
   * @param ms The number of milliseconds.
   * @returns A promise that is resolves after the given milliseconds.
   */
  private static _delay(ms: number = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * A selector selecting buttons that should close this modal.
   */
  static get selectorCloseButton() {
    return `[data-modal-close],${prefix}-modal-close-button`;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return selectorTabbable;
  }

  /**
   * A selector selecting the nodes that should be focused when modal gets open.
   */
  static get selectorPrimaryFocus() {
    return `[data-modal-primary-focus],${prefix}-modal-footer ${prefix}-button[kind="primary"]`;
  }

  /**
   * A selector selecting the modal body component
   */
  static get selectorModalBody() {
    return `${prefix}-modal-body`;
  }

  /**
   * The name of the custom event fired before this modal is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this modal.
   */
  static get eventBeforeClose() {
    return `${prefix}-modal-beingclosed`;
  }

  /**
   * The name of the custom event fired after this modal is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-modal-closed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

export default CDSModal;
