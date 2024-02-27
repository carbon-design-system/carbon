/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import {
  property,
  query,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import styles from './tearsheet.scss';
import { selectorTabbable } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import '../button/index';
import '../layer/index';
import '../button/button-set-base';
import {
  TEARSHEET_INFLUENCER_PLACEMENT,
  TEARSHEET_INFLUENCER_WIDTH,
  TEARSHEET_WIDTH,
} from './defs';

export {
  TEARSHEET_INFLUENCER_PLACEMENT,
  TEARSHEET_INFLUENCER_WIDTH,
  TEARSHEET_WIDTH,
};

// eslint-disable-next-line no-bitwise
const PRECEDING =
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
// eslint-disable-next-line no-bitwise
const FOLLOWING =
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

const blockClass = `${prefix}--tearsheet`;
const blockClassModalHeader = `${prefix}--modal-header`;
const blockClassActionSet = `${prefix}--action-set`;

/**
 * Tries to focus on the given elements and bails out if one of them is successful.
 *
 * @param elems The elements.
 * @param reverse `true` to go through the list in reverse order.
 * @returns `true` if one of the attempts is successful, `false` otherwise.
 */
function tryFocusElems(elems: NodeListOf<HTMLElement>, reverse: boolean) {
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
 * Tearsheet.
 *
 * @element cds-tearsheet
 * @csspart dialog The dialog.
 * @fires cds-tearsheet-beingclosed
 *   The custom event fired before this tearsheet is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this tearsheet.
 * @fires cds-tearsheet-closed - The custom event fired after this tearsheet is closed upon a user gesture.
 */
@customElement(`${prefix}-tearsheet`)
class CDSTearsheet extends HostListenerMixin(LitElement) {
  /**
   * The element that had focus before this tearsheet gets open.
   */
  private _launcher: Element | null = null;

  /**
   * Node to track focus going outside of tearsheet content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of tearsheet content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track tearsheet.
   */
  @query(`.${blockClass}__container`)
  private _tearsheet!: HTMLDivElement;

  @queryAssignedElements({ slot: 'actions', selector: `${prefix}-button` })
  private _actions!: Array<HTMLElement>;

  @state()
  _actionsCount = 0;

  @state()
  _hasHeaderActions = false;

  @state()
  _hasLabel = false;

  @state()
  _hasSlug = false;

  @state()
  _hasTitle = false;

  @state()
  _hasDescription = false;

  @state()
  _hasInfluencerLeft = false;

  @state()
  _hasInfluencerRight = false;

  @state()
  _isOpen = false;

  @state()
  _hasHeaderNavigation = false;

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
   * @param event.target The event target.
   * @param event.relatedTarget The event relatedTarget.
   */
  @HostListener('shadowRoot:focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = async ({ target, relatedTarget }: FocusEvent) => {
    const {
      // condensedActions,
      open,
      _startSentinelNode: startSentinelNode,
      _endSentinelNode: endSentinelNode,
    } = this;

    const oldContains = target !== this && this.contains(target as Node);
    const currentContains =
      relatedTarget !== this &&
      (this.contains(relatedTarget as Node) ||
        (this.shadowRoot?.contains(relatedTarget as Node) &&
          relatedTarget !== (startSentinelNode as Node) &&
          relatedTarget !== (endSentinelNode as Node)));

    // Performs focus wrapping if _all_ of the following is met:
    // * This tearsheet is open
    // * The viewport still has focus
    // * Tearsheet body used to have focus but no longer has focus
    const { selectorTabbable: selectorTabbableForTearsheet } = this
      .constructor as typeof CDSTearsheet;

    if (open && relatedTarget && oldContains && !currentContains) {
      const comparisonResult = (target as Node).compareDocumentPosition(
        relatedTarget as Node
      );
      // eslint-disable-next-line no-bitwise
      if (relatedTarget === startSentinelNode || comparisonResult & PRECEDING) {
        await (this.constructor as typeof CDSTearsheet)._delay();
        if (
          !tryFocusElems(
            this.querySelectorAll(selectorTabbableForTearsheet),
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
        await (this.constructor as typeof CDSTearsheet)._delay();
        if (
          !tryFocusElems(
            this.querySelectorAll(selectorTabbableForTearsheet),
            true
          )
        ) {
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

  private _checkSetHasSlot(e: Event) {
    const t = e.target as HTMLSlotElement;
    const dataPostfix = t.getAttribute('data-postfix');
    const postfix = dataPostfix ? `-${dataPostfix}` : '';

    // snake `ab-cd-ef` to _has camel case _hasAbCdEf
    const hasName = `_has-${t.name}${postfix}`.replace(/-./g, (c) =>
      c[1].toUpperCase()
    );
    this[hasName] = (t?.assignedElements()?.length ?? 0) > 0;
  }

  /**
   * Handles `click` event on the modal container.
   *
   * @param event The event.
   */
  private _handleClickContainer(event: MouseEvent) {
    if (
      (event.target as Element).matches(
        (this.constructor as typeof CDSTearsheet).selectorCloseButton
      )
    ) {
      this._handleUserInitiatedClose(event.target);
    }
  }

  /**
   * Handles user-initiated close request of this tearsheet.
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
            (this.constructor as typeof CDSTearsheet).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSTearsheet).eventClose,
            init
          )
        );
      }
    }
  }

  private _handleSlugChange(e: Event) {
    const childItems = (e.target as HTMLSlotElement).assignedElements();

    this._hasSlug = childItems.length > 0;
    if (this._hasSlug) {
      childItems[0].setAttribute('size', 'lg');
      this.setAttribute('slug', '');
    } else {
      this.removeAttribute('slug');
    }
  }

  /**
   * Optional aria label for the tearsheet
   */
  @property({ reflect: true, attribute: 'aria-label' })
  ariaLabel = '';

  /**
   * Sets the close button icon description
   */
  @property({ reflect: true, attribute: 'close-icon-description' })
  closeIconDescription = 'Close';

  /**
   * Enable a close icon ('x') in the header area of the tearsheet. By default,
   * (when this prop is omitted, or undefined or null) a tearsheet does not
   * display a close icon if there are navigation actions ("transactional
   * tearsheet") and displays one if there are no navigation actions ("passive
   * tearsheet"), and that behavior can be overridden if required by setting
   * this prop to either true or false.
   */

  @property({ reflect: true, type: Boolean, attribute: 'has-close-icon' })
  hasCloseIcon = false;

  /**
   * The placement of the influencer section, 'left' or 'right'.
   */
  @property({ reflect: true, attribute: 'influencer-placement' })
  influencerPlacement = TEARSHEET_INFLUENCER_PLACEMENT.RIGHT;

  /**
   * The width of the influencer section, 'narrow' or 'wide'.
   */
  @property({ reflect: true, attribute: 'influencer-width' })
  influencerWidth = TEARSHEET_INFLUENCER_WIDTH.NARROW;

  /**
   * `true` if the tearsheet should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Prevent closing on click outside of tearsheet
   */
  @property({ type: Boolean, attribute: 'prevent-close-on-click-outside' })
  preventCloseOnClickOutside = false;

  /**
   * The initial location of focus in the side panel
   */
  @property({
    reflect: true,
    attribute: 'selector-initial-focus',
    type: String,
  })
  selectorInitialFocus;

  /**
   * The width of the influencer section, 'narrow' or 'wide'.
   */
  @property({ reflect: true, attribute: 'width' })
  width = TEARSHEET_WIDTH.NARROW;

  private _checkUpdateActionSizes = () => {
    if (this._actions) {
      for (let i = 0; i < this._actions.length; i++) {
        this._actions[i].setAttribute(
          'size',
          this.width === 'wide' ? '2xl' : 'xl'
        );
      }
    }
  };

  private _maxActions = 4;
  private _handleActionsChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const actions = target?.assignedElements();
    const actionsCount = actions?.length ?? 0;

    if (actionsCount > this._maxActions) {
      this._actionsCount = this._maxActions;
      console.error(`Too many tearsheet actions, max ${this._maxActions}.`);
    } else {
      this._actionsCount = actionsCount;
    }

    for (let i = 0; i < actions?.length; i++) {
      if (i + 1 > this._maxActions) {
        // hide excessive tearsheet actions
        actions[i].setAttribute('hidden', 'true');
        actions[i].setAttribute(
          `data-actions-limit-${this._maxActions}-exceeded`,
          `${actions.length}`
        );
      } else {
        actions[i].classList.add(`${blockClassActionSet}__action-button`);
      }
    }
    this._checkUpdateActionSizes();
  }

  actionsMultiple = ['', 'single', 'double', 'triple'][this._actionsCount];

  render() {
    const {
      closeIconDescription,
      influencerPlacement,
      influencerWidth,
      open,
      width,
    } = this;

    const actionsMultiple = ['', 'single', 'double', 'triple'][
      this._actionsCount
    ];

    const headerFieldsTemplate = html`<div
      class=${`${blockClass}__header-fields`}>
      <h2 class=${`${blockClassModalHeader}__label`} ?hidden=${!this._hasLabel}>
        <slot name="label" @slotchange=${this._checkSetHasSlot}></slot>
      </h2>
      <h3
        class=${`${blockClassModalHeader}__heading ${blockClass}__heading`}
        ?hidden=${!this._hasTitle}>
        <slot name="title" @slotchange=${this._checkSetHasSlot}></slot>
      </h3>
      <div
        class=${`${blockClass}__header-description`}
        ?hidden=${!this._hasDescription}>
        <slot name="description" @slotchange=${this._checkSetHasSlot}></slot>
      </div>
    </div>`;

    const headerActionsTemplate = html` <div
      class=${`${blockClass}__header-actions`}
      ?hidden=${!this._hasHeaderActions || this.width === 'narrow'}>
      <slot name="header-actions" @slotchange=${this._checkSetHasSlot}></slot>
    </div>`;

    const headerTemplate = html` <cds-modal-header
      class=${`${blockClass}__header`}
      ?has-close-icon=${this.hasCloseIcon || this?._actionsCount === 0}
      ?has-navigation=${this._hasHeaderNavigation && this.width === 'wide'}
      ?has-header-actions=${this._hasHeaderActions && this.width === 'wide'}
      ?has-actions=${this?._actionsCount > 0}
      ?has-slug=${this?._hasSlug}
      width=${width}>
      ${this.width === TEARSHEET_WIDTH.WIDE
        ? html`<cds-layer level="1" class=${`${blockClass}__header-content`}
            >${headerFieldsTemplate}${headerActionsTemplate}</cds-layer
          >`
        : html`<div>${headerFieldsTemplate}${headerActionsTemplate}</div>`}

      <div
        class=${`${blockClass}__header-navigation`}
        ?hidden=${!this._hasHeaderNavigation || this.width === 'narrow'}>
        <slot
          name="header-navigation"
          @slotchange=${this._checkSetHasSlot}></slot>
      </div>
      <slot name="slug" @slotchange=${this._handleSlugChange}></slot>
      ${this.hasCloseIcon || this?._actionsCount === 0
        ? html`<cds-modal-close-button
            close-button-label=${closeIconDescription}
            @click=${this._handleUserInitiatedClose}></cds-modal-close-button>`
        : ''}
    </cds-modal-header>`;

    return html`
      <a
        id="start-sentinel"
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
      <div
        aria-label=${this.ariaLabel}
        class=${`${blockClass}__container ${prefix}--modal-container ${prefix}--modal-container--sm`}
        part="dialog"
        role="complementary"
        ?open=${this._isOpen}
        ?opening=${open && !this._isOpen}
        ?closing=${!open && this._isOpen}
        width=${width}
        @click=${this._handleClickContainer}>
        <!-- Header -->
        ${headerTemplate}

        <!-- Body  -->
        <cds-modal-body class=${`${blockClass}__body`} width=${width}>
          <!-- Influencer when on left -->
          ${influencerPlacement !== TEARSHEET_INFLUENCER_PLACEMENT.RIGHT
            ? html`<div
                class=${`${blockClass}__influencer`}
                ?wide=${influencerWidth === 'wide'}
                ?hidden=${!this._hasInfluencerLeft ||
                this.width === TEARSHEET_WIDTH.NARROW}>
                <slot
                  name="influencer"
                  data-postfix="left"
                  @slotchange=${this._checkSetHasSlot}></slot>
              </div>`
            : ''}

          <div class=${`${blockClass}__right`}>
            <div class=${`${blockClass}__main`}>
              <div class=${`${blockClass}__content`}>
                <cds-layer level="0">
                  <slot></slot>
                </cds-layer>
              </div>

              <!-- Influencer when on right -->
              ${influencerPlacement === TEARSHEET_INFLUENCER_PLACEMENT.RIGHT
                ? html`<div
                    class=${`${blockClass}__influencer`}
                    ?wide=${influencerWidth}
                    ?hidden=${!this._hasInfluencerRight ||
                    this.width === TEARSHEET_WIDTH.NARROW}>
                    <slot
                      name="influencer"
                      data-postfix="right"
                      @slotchange=${this._checkSetHasSlot}></slot>
                  </div>`
                : ''}
            </div>
            <!-- Action buttons -->
            <cds-button-set-base
              class=${`${blockClass}__buttons ${blockClass}__button-container`}
              actions-multiple=${actionsMultiple}
              ?tearsheet-wide=${width === 'wide'}
              ?hidden=${this._actionsCount === 0}>
              <slot
                name="actions"
                @slotchange=${this._handleActionsChange}></slot>
            </cds-button-set-base>
          </div>
        </cds-modal-body>
      </div>
      <a
        id="end-sentinel"
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
    `;
  }

  _checkSetOpen = () => {
    const { _tearsheet: tearsheet } = this;
    if (tearsheet && this._isOpen) {
      // wait until the tearsheet has transitioned off the screen to remove
      tearsheet.addEventListener('transitionend', () => {
        this._isOpen = false;
      });
    } else {
      // allow the html to render before animating in the tearsheet
      window.requestAnimationFrame(() => {
        this._isOpen = this.open;
      });
    }
  };

  async updated(changedProperties) {
    if (changedProperties.has('width')) {
      this._checkUpdateActionSizes();
    }

    if (
      process.env.NODE_ENV === 'development' &&
      (changedProperties.has('width') ||
        changedProperties.has('_hasHeaderNavigation') ||
        changedProperties.has('_hasInfluencerLeft') ||
        changedProperties.has('_hasInfluencerRight') ||
        changedProperties.has('_hasHeaderActions'))
    ) {
      if (this.width === 'narrow') {
        if (this._hasHeaderNavigation) {
          console.error(
            `Header navigation is not permitted in narrow Tearsheet.`
          );
        }
        if (this._hasInfluencerLeft || this._hasInfluencerRight) {
          console.error(`Influencer is not permitted in narrow Tearsheet.`);
        }
        if (this._hasHeaderActions) {
          console.error(
            `Header actions are not permitted in narrow Tearsheet.`
          );
        }
      }
    }

    if (changedProperties.has('open')) {
      this._checkSetOpen();
      if (this.open) {
        this._launcher = this.ownerDocument!.activeElement;
        const focusNode =
          this.selectorInitialFocus &&
          this.querySelector(this.selectorInitialFocus);

        await (this.constructor as typeof CDSTearsheet)._delay();
        if (focusNode) {
          // For cases where a `carbon-web-components` component (e.g. `<cds-button>`) being `primaryFocusNode`,
          // where its first update/render cycle that makes it focusable happens after `<cds-tearsheet>`'s first update/render cycle
          (focusNode as HTMLElement).focus();
        } else if (
          !tryFocusElems(
            this.querySelectorAll(
              (this.constructor as typeof CDSTearsheet).selectorTabbable
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
  private static _delay(ms = 0) {
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
   * The name of the custom event fired before this tearsheet is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this tearsheet.
   */
  static get eventBeforeClose() {
    return `${prefix}-tearsheet-beingclosed`;
  }

  /**
   * The name of the custom event fired after this tearsheet is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-tearsheet-closed`;
  }

  /**
   * The name of the custom event fired on clicking the navigate back button
   */
  static get eventNavigateBack() {
    return `${prefix}-tearsheet-header-navigate-back`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSTearsheet;
