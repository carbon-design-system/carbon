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
import { prefix, carbonPrefix } from '../../globals/settings';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import styles from './tearsheet.scss?lit';
import { selectorTabbable } from '@carbon/web-components/es/globals/settings.js';
import pconsole from '../../globals/internal/pconsole';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/layer/index.js';
import '@carbon/web-components/es/components/button/button-set-base.js';
import '@carbon/web-components/es/components/modal/index.js';
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

const maxStackDepth = 3;
type StackHandler = (newDepth: number, newPosition: number) => void;
interface StackState {
  open: StackHandler[];
  all: StackHandler[];
}

const blockClass = `${prefix}--tearsheet`;
const blockClassModalHeader = `${carbonPrefix}--modal-header`;
const blockClassActionSet = `${prefix}--action-set`;

/**
 * Tearsheet.
 *
 * @element c4p-tearsheet
 * @csspart dialog The dialog.
 * @fires c4p-tearsheet-beingclosed
 *   The custom event fired before this tearsheet is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this tearsheet.
 * @fires c4p-tearsheet-closed - The custom event fired after this tearsheet is closed upon a user gesture.
 */
@customElement(`${prefix}-tearsheet`)
class CDSTearsheet extends HostListenerMixin(LitElement) {
  /**
   * The element that had focus before this tearsheet gets open.
   */
  private _launcher: Element | null = null;

  /**
   * Node to track tearsheet.
   */
  @query(`.${blockClass}__container`)
  private _tearsheet!: HTMLDivElement;

  @queryAssignedElements({
    slot: 'actions',
    selector: `${carbonPrefix}-button`,
  })
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
  _hasDecorator = false;

  @state()
  _hasAILabel = false;

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
   * Get focusable elements.
   *
   * Querying all tabbable items.
   *
   * @returns {{first: HTMLElement, last: HTMLElement, all: HTMLElement[]}} Returns an object with various elements.
   */
  private getFocusable(): {
    first: HTMLElement | undefined;
    last: HTMLElement | undefined;
    all: HTMLElement[];
  } {
    const elements: NodeListOf<HTMLElement>[] = [];

    // Add slug elements if present
    if (this._hasSlug) {
      elements.push(this.querySelectorAll(`${carbonPrefix}-slug`));
    }

    // Add close button if not hidden
    if (this.hasCloseIcon) {
      const closeButtons = this.shadowRoot?.querySelectorAll<HTMLElement>(
        `${carbonPrefix}-modal-close-button`
      );
      if (closeButtons) {
        elements.push(closeButtons);
      }
    }

    // Add tabbable elements inside light DOM
    const _tabbableItems = this.querySelectorAll<HTMLElement>(selectorTabbable);

    if (_tabbableItems) {
      elements.push(_tabbableItems);
    }

    // Flatten NodeList arrays and filter for focusable items
    const all = elements
      ?.flatMap((nodeList) => Array.from(nodeList))
      ?.filter((el): el is HTMLElement => typeof el?.focus === 'function');

    return {
      first: all[0],
      last: all[all.length - 1],
      all,
    };
  }

  @HostListener('document:keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if ((key === 'Esc' || key === 'Escape') && this._topOfStack()) {
      this._handleUserInitiatedClose(target);
    }
  };

  /**
   * Handle the keydown event.
   * Trap the focus inside the side-panel by tracking keydown.key == `Tab`
   *
   * @param {KeyboardEvent} event The keyboard event object.
   */
  @HostListener('keydown')
  protected _handleHostKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      const { first: _firstElement, last: _lastElement } = this.getFocusable();

      if (
        event.shiftKey &&
        (this.shadowRoot?.activeElement === _firstElement ||
          document.activeElement === _firstElement)
      ) {
        event.preventDefault();

        _lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === _lastElement) {
        event.preventDefault();

        _firstElement?.focus();
      }
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
      childItems[0].setAttribute('size', 'sm');
      this.setAttribute('slug', '');
    } else {
      this.removeAttribute('slug');
    }
  }
  private _handleDecoratorChange(e: Event) {
    this._hasAILabel = false;
    const childItems = (e.target as HTMLSlotElement).assignedElements();
    this._hasDecorator = childItems.length > 0;
    if (this._hasDecorator) {
      for (const item of childItems) {
        if (item.tagName.toLowerCase() === 'cds-ai-label') {
          this._hasAILabel = true;
          break;
        }
      }
    }
    if (this._hasAILabel || this._hasDecorator) {
      childItems[0].setAttribute('size', 'sm');
      this.setAttribute(this._hasAILabel ? 'ai-label' : 'decorator', '');
      this.removeAttribute(this._hasAILabel ? 'decorator' : 'ai-label');
    } else {
      this.removeAttribute('decorator');
      this.removeAttribute('ai-label');
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

  // Data structure to communicate the state of tearsheet stacking
  // (i.e. when more than one tearsheet is open). Each tearsheet supplies a
  // handler to be called whenever the stacking of the tearsheets changes, which
  // happens when a tearsheet opens or closes. The 'open' array contains one
  // handler per OPEN tearsheet ordered from lowest to highest in visual z-order.
  // The 'all' array contains all the handlers for open and closed tearsheets.

  @state()
  _stackDepth = -1;

  @state()
  _stackPosition = -1;

  private _topOfStack = () => {
    return this._stackDepth === this._stackPosition;
  };

  private static _stack: StackState = {
    open: [],
    all: [],
  };
  private _notifyStack = () => {
    CDSTearsheet._stack.all.forEach(
      (handler: (stackSize: number, position: number) => void) => {
        handler(
          Math.min(CDSTearsheet._stack.open.length, maxStackDepth),
          CDSTearsheet._stack.open.indexOf(handler) + 1
        );
      }
    );
  };

  private _handleStackChange: StackHandler = (newDepth, newPosition) => {
    this._stackDepth = newDepth;
    this._stackPosition = newPosition;
    if (this._stackDepth > 1 && this._stackPosition > 0) {
      this.setAttribute('stack-position', `${newPosition}`);
      this.setAttribute('stack-depth', `${this._stackDepth}`);
    } else {
      this.removeAttribute('stack-position');
      this.removeAttribute('stack-depth');
    }
  };

  private _updateStack = () => {
    if (this.open) {
      CDSTearsheet._stack.open.push(this._handleStackChange);
    } else {
      const indexOpen = CDSTearsheet._stack.open.indexOf(
        this._handleStackChange
      );
      if (indexOpen >= 0) {
        CDSTearsheet._stack.open.splice(indexOpen, 1);
      }
    }
    this._notifyStack();
  };

  actionsMultiple = ['', 'single', 'double', 'triple'][this._actionsCount];

  connectedCallback() {
    super.connectedCallback();

    CDSTearsheet._stack.all.push(this._handleStackChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    const indexAll = CDSTearsheet._stack.all.indexOf(this._handleStackChange);
    CDSTearsheet._stack.all.splice(indexAll, 1);
    const indexOpen = CDSTearsheet._stack.all.indexOf(this._handleStackChange);
    CDSTearsheet._stack.open.splice(indexOpen, 1);
  }
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
      class=${`${blockClass}__header-fields`}
    >
      <h2 class=${`${blockClassModalHeader}__label`} ?hidden=${!this._hasLabel}>
        <slot name="label" @slotchange=${this._checkSetHasSlot}></slot>
      </h2>
      <h3
        class=${`${blockClassModalHeader}__heading ${blockClass}__heading`}
        ?hidden=${!this._hasTitle}
      >
        <slot name="title" @slotchange=${this._checkSetHasSlot}></slot>
      </h3>
      <div
        class=${`${blockClass}__header-description`}
        ?hidden=${!this._hasDescription}
      >
        <slot name="description" @slotchange=${this._checkSetHasSlot}></slot>
      </div>
    </div>`;

    const headerActionsTemplate = html` <div
      class=${`${blockClass}__header-actions`}
      ?hidden=${!this._hasHeaderActions || this.width === 'narrow'}
    >
      <slot name="header-actions" @slotchange=${this._checkSetHasSlot}></slot>
    </div>`;

    const headerTemplate = html` <cds-modal-header
      class=${`${blockClass}__header`}
      ?has-close-icon=${this.hasCloseIcon || this?._actionsCount === 0}
      ?has-navigation=${this._hasHeaderNavigation && this.width === 'wide'}
      ?has-header-actions=${this._hasHeaderActions && this.width === 'wide'}
      ?has-actions=${this?._actionsCount > 0}
      ?has-slug=${this?._hasSlug}
      ?has-decorator=${this?._hasDecorator}
      width=${width}
    >
      ${this.width === TEARSHEET_WIDTH.WIDE
        ? html`<cds-layer level="1" class=${`${blockClass}__header-content`}
            >${headerFieldsTemplate}${headerActionsTemplate}</cds-layer
          >`
        : html`<div>${headerFieldsTemplate}${headerActionsTemplate}</div>`}

      <div
        class=${`${blockClass}__header-navigation`}
        ?hidden=${!this._hasHeaderNavigation || this.width === 'narrow'}
      >
        <slot
          name="header-navigation"
          @slotchange=${this._checkSetHasSlot}
        ></slot>
      </div>
      <slot
        name="decorator"
        slot="ai-label"
        @slotchange=${this._handleDecoratorChange}
      ></slot>
      <slot name="slug" @slotchange=${this._handleSlugChange}></slot>
      ${this.hasCloseIcon || this?._actionsCount === 0
        ? html`<cds-modal-close-button
            close-button-label=${closeIconDescription}
            @click=${this._handleUserInitiatedClose}
          ></cds-modal-close-button>`
        : ''}
    </cds-modal-header>`;
    if (this._stackPosition <= this._stackDepth) {
      return html`
        <div
          aria-label=${this.ariaLabel}
          class=${`${blockClass}__container ${carbonPrefix}--modal-container ${carbonPrefix}--modal-container--sm`}
          part="dialog"
          role="complementary"
          ?open=${this._isOpen}
          ?opening=${open && !this._isOpen}
          ?closing=${!open && this._isOpen}
          width=${width}
          stack-position=${this._stackPosition}
          stack-depth=${this._stackDepth}
          @click=${this._handleClickContainer}
        >
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
                  this.width === TEARSHEET_WIDTH.NARROW}
                >
                  <slot
                    name="influencer"
                    data-postfix="left"
                    @slotchange=${this._checkSetHasSlot}
                  ></slot>
                </div>`
              : ''}

            <div class=${`${blockClass}__right`}>
              <div class=${`${blockClass}__main`}>
                <div class=${`${blockClass}__content`}>
                  <cds-layer
                    level="${this.width === TEARSHEET_WIDTH.NARROW ? 1 : 0}"
                  >
                    <slot></slot>
                  </cds-layer>
                </div>

                <!-- Influencer when on right -->
                ${influencerPlacement === TEARSHEET_INFLUENCER_PLACEMENT.RIGHT
                  ? html`<div
                      class=${`${blockClass}__influencer`}
                      ?wide=${influencerWidth}
                      ?hidden=${!this._hasInfluencerRight ||
                      this.width === TEARSHEET_WIDTH.NARROW}
                    >
                      <slot
                        name="influencer"
                        data-postfix="right"
                        @slotchange=${this._checkSetHasSlot}
                      ></slot>
                    </div>`
                  : ''}
              </div>
              <!-- Action buttons -->
              <cds-button-set-base
                class=${`${blockClass}__buttons ${blockClass}__button-container`}
                actions-multiple=${actionsMultiple}
                ?tearsheet-wide=${width === 'wide'}
                ?hidden=${this._actionsCount === 0}
              >
                <slot
                  name="actions"
                  @slotchange=${this._handleActionsChange}
                ></slot>
              </cds-button-set-base>
            </div>
          </cds-modal-body>
        </div>
      `;
    } else {
      pconsole.warn('Tearsheet not rendered: maximum stacking depth exceeded.');
      return null;
    }
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
      this._updateStack();

      this._checkSetOpen();
      if (this.open) {
        this._launcher = this.ownerDocument!.activeElement;

        await (this.constructor as typeof CDSTearsheet)._delay();

        if (this.selectorInitialFocus?.trim()?.length) {
          const focusNode = this.querySelector(this.selectorInitialFocus);

          (focusNode as HTMLElement)?.focus();
        } else {
          const { first: _firstElement } = this.getFocusable();

          _firstElement?.focus();
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
    return `[data-modal-close],${carbonPrefix}-modal-close-button`;
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
