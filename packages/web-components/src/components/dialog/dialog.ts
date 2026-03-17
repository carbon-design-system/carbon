/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import styles from './dialog.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSModal from '../modal/modal';

/**
 * Dialog.
 *
 * @element cds-dialog
 * @fires cds-dialog-beingclosed
 *   The custom event fired before this dialog is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this dialog.
 * @fires cds-dialog-closed - The custom event fired after this dialog is closed upon a user gesture.
 */
@customElement(`${prefix}-dialog`)
class CDSDialog extends CDSModal {
  /**
   * Reference to the native dialog element
   */
  @query('dialog')
  private _dialogElement?: HTMLDialogElement;

  /**
   * Handles `click` event on this element.
   *
   * @param event The event.
   */
  @HostListener('click')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleClick = (event: MouseEvent) => {
    if (
      this.open &&
      this.modal &&
      event.composedPath()[0] === this._dialogElement &&
      !this.preventCloseOnClickOutside
    ) {
      this._handleUserInitiatedClose(event.target);
    }
  };

  @property({ attribute: false })
  loadingStatus: 'inactive' | 'active' | 'finished' | 'error' = 'inactive';

  /**
   * Specifies whether the dialog is modal or non-modal
   */
  @property({ type: Boolean, reflect: true })
  modal = true;

  /**
   * Specify text for the accessibility label of the dialog
   */
  @property({ attribute: 'aria-label' })
  ariaLabel = '';

  /**
   * Specify the ID of an element that labels this dialog
   */
  @property({ attribute: 'aria-labelledby' })
  ariaLabelledBy = '';

  /**
   * Specify the ID of an element that describes this dialog
   */
  @property({ attribute: 'aria-describedby' })
  ariaDescribedBy = '';

  /**
   * Specify the role of the dialog for accessibility
   */
  @property({ reflect: true })
  role: 'dialog' | 'alertdialog' = 'dialog';

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange() {
    if (this.querySelector(`${prefix}-dialog-footer`)) {
      this.setAttribute('has-footer', '');
    } else {
      this.removeAttribute('has-footer');
    }

    this.requestUpdate();
  }

  /**
   * Gets footer elements.
   */
  protected _getFooterElements() {
    const footer = this.querySelector(`${prefix}-dialog-footer`);

    const primaryButton =
      this.querySelector<HTMLElement>(
        `${prefix}-dialog-footer cds-button[kind="primary"]`
      ) ||
      this.querySelector<HTMLElement>(
        `${prefix}-dialog-footer cds-button[kind="danger"]`
      ) ||
      null;

    const secondaryButtons = Array.from(
      this.querySelectorAll<HTMLElement>(
        `${prefix}-dialog-footer cds-button[kind="secondary"]`
      )
    );

    return { footer, primaryButton, secondaryButtons };
  }

  /**
   * Do not inherit hostKeyDown handling from modal
   */
  @HostListener('keydown')
  protected _handleHostKeydown = () => {};

  async updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this._launcher = this.ownerDocument!.activeElement;

        if (this._dialogElement && !this.ariaLabel && !this.ariaLabelledBy) {
          const title = this.querySelector(`${prefix}-dialog-title`);

          // Set aria-labelledby to the title's ID if it exists
          if (title && title.id) {
            this._dialogElement.setAttribute('aria-labelledby', title.id);
          }
        }

        if (this._dialogElement) {
          if (this.modal) {
            this._dialogElement.showModal();
          } else {
            this._dialogElement.show();
          }
        }

        const primaryFocusNode = this.querySelector(
          (this.constructor as typeof CDSDialog).selectorPrimaryFocus
        );
        await (this.constructor as typeof CDSDialog)._delay();

        if (primaryFocusNode) {
          // For cases where a `carbon-web-components` component (e.g. `<cds-button>`) being `primaryFocusNode`,
          // where its first update/render cycle that makes it focusable happens after `<cds-dialog>`'s first update/render cycle
          (primaryFocusNode as HTMLElement).focus();
        } else {
          const { primaryButton, secondaryButtons } = this._getFooterElements();

          if (
            primaryButton &&
            primaryButton?.getAttribute('kind') === 'danger' &&
            secondaryButtons[0]
          ) {
            secondaryButtons[0].focus();
          } else {
            const closeButton = this.querySelector(
              (this.constructor as typeof CDSDialog).selectorCloseButton
            ) as HTMLElement;

            if (closeButton) {
              closeButton.focus();
            } else {
              const { first } = this.getFocusable();
              first?.focus();
            }
          }
        }
      } else {
        if (this._dialogElement && this._dialogElement.open) {
          this._dialogElement.close();
        }

        if (
          this._launcher &&
          typeof (this._launcher as HTMLElement).focus === 'function'
        ) {
          (this._launcher as HTMLElement).focus();
          this._launcher = null;
        }
      }
    }
  }

  render() {
    const { ariaLabel, ariaLabelledBy, ariaDescribedBy, role } = this;

    return html`
      <dialog
        part="dialog"
        role=${role}
        aria-label=${ifDefined(ariaLabel || undefined)}
        aria-labelledby=${ifDefined(ariaLabelledBy || undefined)}
        aria-describedby=${ifDefined(ariaDescribedBy || undefined)}>
        <div
          class="${prefix}--dialog-container"
          @click=${this._handleClickContainer}>
          <slot @slotchange="${this._handleSlotChange}"></slot>
        </div>
      </dialog>
    `;
  }

  /**
   * A selector selecting buttons that should close this dialog.
   */
  static get selectorCloseButton() {
    return `[data-dialog-close],${prefix}-dialog-close-button`;
  }

  /**
   * A selector selecting the nodes that should be focused when dialog gets open.
   */
  static get selectorPrimaryFocus() {
    return `[data-dialog-primary-focus]`;
  }

  /**
   * The name of the custom event fired before this dialog is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this dialog.
   */
  static get eventBeforeClose() {
    return `${prefix}-dialog-beingclosed`;
  }

  /**
   * The name of the custom event fired after this dialog is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-dialog-closed`;
  }

  static styles = styles;
}

export default CDSDialog;
