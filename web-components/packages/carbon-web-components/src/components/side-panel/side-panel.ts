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
import { SIDE_PANEL_SIZE, SIDE_PANEL_PLACEMENT } from './defs';
import styles from './side-panel.scss';
import { selectorTabbable } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import ArrowLeft16 from '@carbon/icons/lib/arrow--left/16';
import Close20 from '@carbon/icons/lib/close/20';
import { moderate02 } from '@carbon/motion';
import '../button/index';
import '../layer/index';
import Handle from '../../globals/internal/handle';
import '../button/button-set-base';

export { SIDE_PANEL_SIZE, SIDE_PANEL_PLACEMENT };

// eslint-disable-next-line no-bitwise
const PRECEDING =
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
// eslint-disable-next-line no-bitwise
const FOLLOWING =
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

const blockClass = `${prefix}--side-panel`;
const blockClassActionSet = `${prefix}--action-set`;

/**
 * Observes resize of the given element with the given resize observer.
 *
 * @param observer The resize observer.
 * @param elem The element to observe the resize.
 */
const observeResize = (observer: ResizeObserver, elem: Element) => {
  if (!elem) {
    return null;
  }
  observer.observe(elem);
  return {
    release() {
      observer.unobserve(elem);
      return null;
    },
  } as Handle;
};

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
 * SidePanel.
 *
 * @element cds-side-panel
 * @csspart dialog The dialog.
 * @fires cds-side-panel-beingclosed
 *   The custom event fired before this side-panel is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this side-panel.
 * @fires cds-side-panel-closed - The custom event fired after this side-panel is closed upon a user gesture.
 * @fires cds-side-panel-navigate-back - custom event fired when clicking navigate back (available when step > 0)
 */
@customElement(`${prefix}-side-panel`)
class CDSSidePanel extends HostListenerMixin(LitElement) {
  /**
   * The handle for observing resize of the parent element of this element.
   */
  private _hObserveResize: Handle | null = null;

  /**
   * The element that had focus before this side-panel gets open.
   */
  private _launcher: Element | null = null;

  /**
   * Node to track focus going outside of side-panel content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of side-panel content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track side panel.
   */
  @query(`.${blockClass}`)
  private _sidePanel!: HTMLDivElement;

  @query(`.${blockClass}__animated-scroll-wrapper`)
  private _animateScrollWrapper?: HTMLElement;

  @query(`.${blockClass}__label-text`)
  private _label!: HTMLElement;

  @query(`.${blockClass}__title-text`)
  private _title!: HTMLElement;

  @query(`.${blockClass}__subtitle-text`)
  private _subtitle!: HTMLElement;

  @query(`.${blockClass}__inner-content`)
  private _innerContent!: HTMLElement;

  @queryAssignedElements({ slot: 'actions', selector: `${prefix}-button` })
  private _actions!: Array<HTMLElement>;

  @state()
  _doAnimateTitle = true;

  @state()
  _isOpen = false;

  @state()
  _containerScrollTop = -16;

  @state()
  _hasSubtitle = false;

  @state()
  _hasSlug = false;

  @state()
  _hasActionToolbar = false;

  @state()
  _actionsCount = 0;

  @state()
  _slugCloseSize = 'sm';

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
    // * This side-panel is open
    // * The viewport still has focus
    // * SidePanel body used to have focus but no longer has focus
    const { selectorTabbable: selectorTabbableForSidePanel } = this
      .constructor as typeof CDSSidePanel;

    if (open && relatedTarget && oldContains && !currentContains) {
      const comparisonResult = (target as Node).compareDocumentPosition(
        relatedTarget as Node
      );
      // eslint-disable-next-line no-bitwise
      if (relatedTarget === startSentinelNode || comparisonResult & PRECEDING) {
        await (this.constructor as typeof CDSSidePanel)._delay();
        if (
          !tryFocusElems(
            this.querySelectorAll(selectorTabbableForSidePanel),
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
        await (this.constructor as typeof CDSSidePanel)._delay();
        if (
          !tryFocusElems(
            this.querySelectorAll(selectorTabbableForSidePanel),
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

  private _reducedMotion =
    typeof window !== 'undefined' && window?.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: true };

  /**
   * Handles `click` event on the side-panel container.
   *
   * @param event The event.
   */
  private _handleClickOnOverlay(event: MouseEvent) {
    if (!this.preventCloseOnClickOutside) {
      this._handleUserInitiatedClose(event.target);
    }
  }

  /**
   * Handles `click` event on the side-panel container.
   *
   * @param event The event.
   */
  private _handleCloseClick(event: MouseEvent) {
    this._handleUserInitiatedClose(event.target);
  }

  /**
   * Handles user-initiated close request of this side-panel.
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
            (this.constructor as typeof CDSSidePanel).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSSidePanel).eventClose,
            init
          )
        );
      }
    }
  }

  private _handleNavigateBack(triggeredBy: EventTarget | null) {
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSSidePanel).eventNavigateBack,
        {
          composed: true,
          detail: {
            triggeredBy,
          },
        }
      )
    );
  }

  private _adjustPageContent = () => {
    // sets/resets styles based on slideIn property and selectorPageContent;
    if (this.selectorPageContent) {
      const pageContentEl: HTMLElement | null = document.querySelector(
        this.selectorPageContent
      );

      if (pageContentEl) {
        const newValues = {
          marginInlineStart: '',
          marginInlineEnd: '',
          inlineSize: '',
          transition: this._reducedMotion.matches
            ? 'none'
            : `all ${moderate02}`,
          transitionProperty: 'margin-inline-start, margin-inline-end',
        };
        if (this.open) {
          newValues.inlineSize = 'auto';
          if (this.placement === 'left') {
            newValues.marginInlineStart = `${this?._sidePanel?.offsetWidth}px`;
          } else {
            newValues.marginInlineEnd = `${this?._sidePanel?.offsetWidth}px`;
          }
        }

        Object.keys(newValues).forEach((key) => {
          pageContentEl.style[key] = newValues[key];
        });
      }
    }
  };

  private _checkSetOpen = () => {
    const { _sidePanel: sidePanel } = this;
    if (sidePanel && this._isOpen) {
      if (this._reducedMotion) {
        this._isOpen = false;
      } else {
        // wait until the side panel has transitioned off the screen to remove
        sidePanel.addEventListener('transitionend', () => {
          this._isOpen = false;
        });
      }
    } else {
      // allow the html to render before animating in the side panel
      this._isOpen = this.open;
    }
  };

  private _checkUpdateIconButtonSizes = () => {
    const slug = this.querySelector(`${prefix}-slug`);
    const otherButtons = this?.shadowRoot?.querySelectorAll(
      '#nav-back-button, #close-button'
    );

    let iconButtonSize = 'sm';

    if (slug || otherButtons?.length) {
      const actions = this?.querySelectorAll?.(
        `${prefix}-button[slot='actions']`
      );

      if (actions?.length && /l/.test(this.size)) {
        iconButtonSize = 'md';
      }
    }

    if (slug) {
      slug?.setAttribute('size', iconButtonSize);
    }

    if (otherButtons) {
      [...otherButtons].forEach((btn) => {
        btn.setAttribute('size', iconButtonSize);
      });
    }
  };

  private _handleSlugChange(e: Event) {
    this._checkUpdateIconButtonSizes();
    const childItems = (e.target as HTMLSlotElement).assignedElements();

    this._hasSlug = childItems.length > 0;
  }

  private _handleSubtitleChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const subtitle = target?.assignedElements();

    this._hasSubtitle = subtitle.length > 0;
  }

  // eslint-disable-next-line class-methods-use-this
  private _handleActionToolbarChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const toolbarActions = target?.assignedElements();

    this._hasActionToolbar = toolbarActions && toolbarActions.length > 0;

    if (this._hasActionToolbar) {
      for (const toolbarAction of toolbarActions) {
        // toolbar actions size should always be sm
        toolbarAction.setAttribute('size', 'sm');
      }
    }
  }

  private _checkUpdateActionSizes = () => {
    if (this._actions) {
      for (let i = 0; i < this._actions.length; i++) {
        this._actions[i].setAttribute(
          'size',
          this.condensedActions ? 'lg' : 'xl'
        );
      }
    }
  };

  private _maxActions = 3;
  private _handleActionsChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const actions = target?.assignedElements();

    // update slug size
    this._checkUpdateIconButtonSizes();

    const actionsCount = actions?.length ?? 0;
    if (actionsCount > this._maxActions) {
      this._actionsCount = this._maxActions;
      if (process.env.NODE_ENV === 'development') {
        console.error(`Too many side-panel actions, max ${this._maxActions}.`);
      }
    } else {
      this._actionsCount = actionsCount;
    }

    for (let i = 0; i < actions?.length; i++) {
      if (i + 1 > this._maxActions) {
        // hide excessive side panel actions
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

  private _checkSetDoAnimateTitle = () => {
    let canDoAnimateTitle = false;

    if (
      this._sidePanel &&
      this.open &&
      this.animateTitle &&
      this?.title?.length &&
      !this._reducedMotion.matches
    ) {
      const scrollAnimationDistance = this._getScrollAnimationDistance();
      // used to calculate the header moves
      this?._sidePanel?.style?.setProperty(
        `--${blockClass}--scroll-animation-distance`,
        `${scrollAnimationDistance}`
      );

      let scrollEl = this._animateScrollWrapper;
      if (!scrollEl && this.animateTitle && !this._doAnimateTitle) {
        scrollEl = this._innerContent;
      }

      if (scrollEl) {
        const innerComputed = window?.getComputedStyle(this._innerContent);
        const innerPaddingHeight = innerComputed
          ? parseFloat(innerComputed?.paddingTop) +
            parseFloat(innerComputed?.paddingBottom)
          : 0;

        canDoAnimateTitle =
          (!!this.labelText || !!this._hasActionToolbar || this._hasSubtitle) &&
          scrollEl.scrollHeight - scrollEl.clientHeight >=
            scrollAnimationDistance + innerPaddingHeight;
      }
    }

    this._doAnimateTitle = canDoAnimateTitle;
  };

  /**
   * The `ResizeObserver` instance for observing element resizes for re-positioning floating menu position.
   */
  // TODO: Wait for `.d.ts` update to support `ResizeObserver`
  // @ts-ignore
  private _resizeObserver = new ResizeObserver(() => {
    if (this._sidePanel) {
      this._checkSetDoAnimateTitle();
    }
  });

  private _getScrollAnimationDistance = () => {
    const labelHeight = this?._label?.offsetHeight ?? 0;
    const subtitleHeight = this?._subtitle?.offsetHeight ?? 0;
    const titleVerticalBorder = this._hasActionToolbar
      ? this._title.offsetHeight - this._title.clientHeight
      : 0;

    return labelHeight + subtitleHeight + titleVerticalBorder;
  };

  private _scrollObserver = () => {
    const scrollTop = this._animateScrollWrapper?.scrollTop ?? 0;
    const scrollAnimationDistance = this._getScrollAnimationDistance();
    this?._sidePanel?.style?.setProperty(
      `--${blockClass}--scroll-animation-progress`,
      `${
        Math.min(scrollTop, scrollAnimationDistance) / scrollAnimationDistance
      }`
    );
  };

  private _handleCurrentStepUpdate = () => {
    const scrollable = this._animateScrollWrapper ?? this._innerContent;
    if (scrollable) {
      scrollable.scrollTop = 0;
    }
  };

  /**
   * Determines if the title will animate on scroll
   */
  @property({ reflect: true, attribute: 'animate-title', type: Boolean })
  animateTitle = true;

  /**
   * Sets the close button icon description
   */
  @property({ reflect: true, attribute: 'close-icon-description' })
  closeIconDescription = 'Close';

  /**
   * Determines whether the side panel should render the condensed version (affects action buttons primarily)
   */
  @property({ type: Boolean, reflect: true, attribute: 'condensed-actions' })
  condensedActions = false;

  /**
   * Sets the current step of the side panel
   */
  @property({ reflect: true, attribute: 'current-step', type: Number })
  currentStep;

  /**
   * Determines whether the side panel should render with an overlay
   */
  @property({ attribute: 'include-overlay', type: Boolean, reflect: true })
  includeOverlay = false;

  /**
   * Sets the label text which will display above the title text
   */
  @property({ reflect: true, attribute: 'label-text' })
  labelText;

  /**
   * Sets the icon description for the navigation back icon button
   */
  @property({ reflect: true, attribute: 'navigation-back-icon-description' })
  navigationBackIconDescription = 'Back';

  /**
   * `true` if the side-panel should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * SidePanel placement.
   */
  @property({ reflect: true, type: String })
  placement = SIDE_PANEL_PLACEMENT.RIGHT;

  /**
   * Prevent closing on click outside of side-panel
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
   * Selector for page content, used to push content to side except
   */
  @property({ reflect: true, attribute: 'selector-page-content' })
  selectorPageContent = '';

  /**
   * SidePanel size.
   */
  @property({ reflect: true, type: String })
  size = SIDE_PANEL_SIZE.MEDIUM;

  /**
   * Determines if this panel slides in
   */
  @property({ attribute: 'slide-in', type: Boolean, reflect: true })
  slideIn = false;

  /**
   * Sets the title text
   */
  @property({ reflect: false, type: String })
  title;

  async connectObservers() {
    await this.updateComplete;
    this._hObserveResize = observeResize(this._resizeObserver, this._sidePanel);
  }

  disconnectObservers() {
    if (this._hObserveResize) {
      this._hObserveResize = this._hObserveResize.release();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.disconnectObservers();
    this.connectObservers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.disconnectObservers();
  }

  render() {
    const {
      closeIconDescription,
      condensedActions,
      currentStep,
      includeOverlay,
      labelText,
      navigationBackIconDescription,
      open,
      placement,
      size,
      slideIn,
      title,
    } = this;

    if (!open && !this._isOpen) {
      return html``;
    }

    const actionsMultiple = ['', 'single', 'double', 'triple'][
      this._actionsCount
    ];

    const titleTemplate = html`<div
      class=${`${blockClass}__title`}
      ?no-label=${!!labelText}>
      <h2 class=${title ? `${blockClass}__title-text` : ''} title=${title}>
        ${title}
      </h2>

      ${this._doAnimateTitle
        ? html`<h2
            class=${`${blockClass}__collapsed-title-text`}
            title=${title}
            aria-hidden="true">
            ${title}
          </h2>`
        : ''}
    </div>`;

    const headerHasTitleClass = this.title
      ? ` ${blockClass}__header--has-title `
      : '';
    const headerTemplate = html`
      <div
        class=${`${blockClass}__header${headerHasTitleClass}`}
        ?detail-step=${currentStep > 0}
        ?no-title-animation=${!this._doAnimateTitle}
        ?reduced-motion=${this._reducedMotion.matches}>
        <!-- render back button -->
        ${currentStep > 0
          ? html`<cds-icon-button
              align="bottom-left"
              aria-label=${navigationBackIconDescription}
              kind="ghost"
              size="sm"
              class=${`${prefix}--btn ${blockClass}__navigation-back-button`}
              @click=${this._handleNavigateBack}>
              ${ArrowLeft16({ slot: 'icon' })}
              <span slot="tooltip-content">
                ${navigationBackIconDescription}
              </span>
            </cds-icon-button>`
          : ''}

        <!-- render title label -->
        ${title?.length && labelText?.length
          ? html` <p class=${`${blockClass}__label-text`}>${labelText}</p>`
          : ''}

        <!-- title -->
        ${title ? titleTemplate : ''}

        <!-- render slug and close button area -->
        <div class=${`${blockClass}__slug-and-close`}>
          <slot name="slug" @slotchange=${this._handleSlugChange}></slot>
          <!-- {normalizedSlug} -->
          <cds-icon-button
            align="bottom-right"
            aria-label=${closeIconDescription}
            kind="ghost"
            size="sm"
            class=${`${blockClass}__close-button`}
            @click=${this._handleCloseClick}>
            ${Close20({ slot: 'icon' })}
            <span slot="tooltip-content"> ${closeIconDescription} </span>
          </cds-icon-button>
        </div>

        <!-- render sub title -->
        <p
          class=${this._hasSubtitle ? `${blockClass}__subtitle-text` : ''}
          ?hidden=${!this._hasSubtitle}
          ?no-title-animation=${!this._doAnimateTitle}
          ?no-action-toolbar=${!this._hasActionToolbar}
          ?no-title=${!title}>
          <slot
            name="subtitle"
            @slotchange=${this._handleSubtitleChange}></slot>
        </p>

        <div
          class=${this._hasActionToolbar ? `${blockClass}__action-toolbar` : ''}
          ?hidden=${!this._hasActionToolbar}
          ?no-title-animation=${!this._doAnimateTitle}>
          <slot
            name="action-toolbar"
            @slotchange=${this._handleActionToolbarChange}></slot>
        </div>
      </div>
    `;

    const mainTemplate = html`<div
      class=${`${blockClass}__inner-content`}
      ?scrolls=${!this._doAnimateTitle}>
      <cds-layer level="1">
        <slot></slot>
      </cds-layer>
    </div> `;

    const sidePanelAnimateTitleClass = this._doAnimateTitle
      ? ` ${blockClass}--animated-title`
      : '';

    return html`
      <div
        class=${`${blockClass}${sidePanelAnimateTitleClass}`}
        part="dialog"
        role="complementary"
        placement="${placement}"
        ?has-slug=${this._hasSlug}
        ?open=${this._isOpen}
        ?opening=${open && !this._isOpen}
        ?closing=${!open && this._isOpen}
        ?condensed-actions=${condensedActions}
        ?overlay=${includeOverlay || slideIn}
        ?slide-in=${slideIn}
        size=${size}>
        <a
          id="start-sentinel"
          class="sentinel"
          hidden
          href="javascript:void 0"
          role="navigation"></a>

        ${this._doAnimateTitle
          ? html`<div class=${`${blockClass}__animated-scroll-wrapper`} scrolls>
              ${headerTemplate} ${mainTemplate}
            </div>`
          : html` ${headerTemplate} ${mainTemplate}`}

        <cds-button-set-base
          class=${`${blockClass}__actions-container`}
          ?hidden=${this._actionsCount === 0}
          ?condensed=${condensedActions}
          actions-multiple=${actionsMultiple}
          size=${size}>
          <slot name="actions" @slotchange=${this._handleActionsChange}></slot>
        </cds-button-set-base>

        <a
          id="end-sentinel"
          class="sentinel"
          hidden
          href="javascript:void 0"
          role="navigation"></a>
      </div>

      ${includeOverlay
        ? html`<div
            ?slide-in=${slideIn}
            class=${`${blockClass}__overlay`}
            ?open=${this.open}
            ?opening=${open && !this._isOpen}
            ?closing=${!open && this._isOpen}
            tabindex="-1"
            @click=${this._handleClickOnOverlay}></div>`
        : ''}
    `;
  }

  async updated(changedProperties) {
    if (changedProperties.has('condensedActions')) {
      this._checkUpdateActionSizes();
    }

    if (changedProperties.has('currentStep')) {
      this._handleCurrentStepUpdate();
    }

    if (changedProperties.has('_doAnimateTitle')) {
      this?._animateScrollWrapper?.removeEventListener(
        'scroll',
        this._scrollObserver
      );

      if (this._doAnimateTitle) {
        this?._animateScrollWrapper?.addEventListener(
          'scroll',
          this._scrollObserver
        );
      } else {
        this?._sidePanel?.style?.setProperty(
          `--${blockClass}--scroll-animation-progress`,
          '0'
        );
      }
    }

    if (
      changedProperties.has('_isOpen') ||
      changedProperties.has('animateTitle')
    ) {
      /* @state property changed */
      this._checkSetDoAnimateTitle();
    }

    if (
      changedProperties.has('slideIn') ||
      changedProperties.has('open') ||
      changedProperties.has('includeOverlay')
    ) {
      this._adjustPageContent();
    }

    if (changedProperties.has('open')) {
      this._checkSetOpen();

      this.disconnectObservers();
      if (this.open) {
        this.connectObservers();

        this._launcher = this.ownerDocument!.activeElement;
        const focusNode =
          this.selectorInitialFocus &&
          this.querySelector(this.selectorInitialFocus);

        await (this.constructor as typeof CDSSidePanel)._delay();
        if (focusNode) {
          // For cases where a `carbon-web-components` component (e.g. `<cds-button>`) being `primaryFocusNode`,
          // where its first update/render cycle that makes it focusable happens after `<cds-side-panel>`'s first update/render cycle
          (focusNode as HTMLElement).focus();
        } else if (
          !tryFocusElems(
            this.querySelectorAll(
              (this.constructor as typeof CDSSidePanel).selectorTabbable
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
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return selectorTabbable;
  }

  /**
   * The name of the custom event fired before this side-panel is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this side-panel.
   */
  static get eventBeforeClose() {
    return `${prefix}-side-panel-beingclosed`;
  }

  /**
   * The name of the custom event fired after this side-panel is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-side-panel-closed`;
  }

  /**
   * The name of the custom event fired on clicking the navigate back button
   */
  static get eventNavigateBack() {
    return `${prefix}-side-panel-navigate-back`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSSidePanel;
