/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { prefix, carbonPrefix } from '../../globals/settings';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { SIDE_PANEL_SIZE, SIDE_PANEL_PLACEMENT } from './defs';
import styles from './side-panel.scss?lit';
import { selectorTabbable } from '@carbon/web-components/es/globals/settings.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import ArrowLeft16 from '@carbon/icons/es/arrow--left/16';
import Close16 from '@carbon/icons/es/close/16';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import { moderate02 } from '@carbon/motion';
import Handle from '../../globals/internal/handle';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/icon-button/index.js';
import '@carbon/web-components/es/components/layer/index.js';
import '../action-set/index.js';
import '@carbon-labs/wc-resizer/es/index.js';

export { SIDE_PANEL_SIZE, SIDE_PANEL_PLACEMENT };

const blockClass = `${prefix}--side-panel`;

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
 * SidePanel.
 *
 * @element c4p-side-panel
 * @csspart dialog The dialog.
 * @fires c4p-side-panel-beingclosed
 *   The custom event fired before this side-panel is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this side-panel.
 * @fires c4p-side-panel-closed - The custom event fired after this side-panel is closed upon a user gesture.
 * @fires c4p-side-panel-navigate-back - custom event fired when clicking navigate back (available when step > 0)
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

  /**
   * Reference to the resizer handle element
   */
  @query('clabs-resizer-handle')
  private _resizerHandle?: HTMLElement;

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
  _actionsMultiple: 'single' | 'double' | 'triple' | '' = '';

  @state()
  _slugCloseSize = 'sm';

  @state()
  _customHeaderElements: Element[] = [];

  @state()
  _sidePanelWidth?: number;

  @state()
  _accumulatedDelta = 0;

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
    const elements: HTMLElement[] = [];

    // Add back button if present (shadow DOM)
    if (this.currentStep > 0) {
      const backButton = this.shadowRoot?.querySelector<HTMLElement>(
        `.${blockClass}__navigation-back-button`
      );
      if (backButton) {
        elements.push(backButton);
      }
    }

    // Add tabbable elements from above-title slot (light DOM - breadcrumbs, etc.)
    const aboveTitleSlot = this.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="above-title"]'
    );
    if (aboveTitleSlot) {
      const aboveTitleElements = aboveTitleSlot
        .assignedElements({ flatten: true })
        .flatMap((el) =>
          Array.from(el.querySelectorAll<HTMLElement>(selectorTabbable))
        );
      elements.push(...aboveTitleElements);
    }

    // Add label text if present (shadow DOM)
    const labelText = this.shadowRoot?.querySelector<HTMLElement>(
      `.${blockClass}__label-text`
    );
    if (labelText) {
      elements.push(labelText);
    }

    // Add title if present (shadow DOM)
    const titleText = this.shadowRoot?.querySelector<HTMLElement>(
      `.${blockClass}__title-text`
    );
    if (titleText) {
      elements.push(titleText);
    }

    // Add slug elements if present (light DOM)
    if (this._hasSlug) {
      const slugElements = Array.from(
        this.querySelectorAll<HTMLElement>(`${carbonPrefix}-slug`)
      );
      elements.push(...slugElements);
    }

    // Add close button if not hidden (shadow DOM)
    if (!this.hideCloseButton) {
      const closeButton = this.shadowRoot?.querySelector<HTMLElement>(
        `.${blockClass}__close-button`
      );
      if (closeButton) {
        elements.push(closeButton);
      }
    }

    // Add subtitle if present (shadow DOM)
    const subtitleText = this.shadowRoot?.querySelector<HTMLElement>(
      `.${blockClass}__subtitle-text`
    );
    if (subtitleText && !subtitleText.hidden) {
      elements.push(subtitleText);
    }

    // Add tabbable elements from below-title slot (light DOM)
    const belowTitleSlot = this.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="below-title"]'
    );
    if (belowTitleSlot) {
      const belowTitleElements = belowTitleSlot
        .assignedElements({ flatten: true })
        .flatMap((el) =>
          Array.from(el.querySelectorAll<HTMLElement>(selectorTabbable))
        );
      elements.push(...belowTitleElements);
    }

    // Add action toolbar elements (light DOM)
    const actionToolbarSlot = this.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="action-toolbar"]'
    );
    if (actionToolbarSlot) {
      const actionToolbarElements = actionToolbarSlot
        .assignedElements({ flatten: true })
        .filter(
          (el): el is HTMLElement =>
            el instanceof HTMLElement &&
            typeof (el as HTMLElement).focus === 'function'
        );
      elements.push(...actionToolbarElements);
    }

    // Add body content tabbable elements (light DOM - default slot)
    const defaultSlot =
      this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
    if (defaultSlot) {
      const bodyElements = defaultSlot
        .assignedElements({ flatten: true })
        .flatMap((el) =>
          Array.from(el.querySelectorAll<HTMLElement>(selectorTabbable))
        );
      elements.push(...bodyElements);
    }

    // Add action buttons (light DOM)
    const actionsSlot = this.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="actions"]'
    );
    if (actionsSlot) {
      const actionElements = actionsSlot
        .assignedElements({ flatten: true })
        .filter(
          (el): el is HTMLElement =>
            el instanceof HTMLElement &&
            typeof (el as HTMLElement).focus === 'function'
        );
      elements.push(...actionElements);
    }

    // Filter for focusable items
    const all = elements.filter(
      (el): el is HTMLElement => typeof el?.focus === 'function'
    );

    return {
      first: all[0],
      last: all[all.length - 1],
      all,
    };
  }

  /**
   * Handle the keydown event.
   * Trap the focus inside the side-panel by tracking keydown.key == `Tab`
   *
   * @param {KeyboardEvent} event The keyboard event object.
   */
  @HostListener('keydown')
  protected _handleHostKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Tab' && !this.slideIn) {
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
        if (this.slideIn) {
          Object.keys(newValues).forEach((key) => {
            pageContentEl.style[key] = newValues[key];
          });
        }
      }
    }
  };

  private _checkSetOpen = () => {
    const { _sidePanel: sidePanel } = this;
    if (sidePanel && this._isOpen) {
      if (this._reducedMotion?.matches) {
        this._isOpen = false;
      } else {
        // wait until the side panel has transitioned off the screen to remove
        sidePanel.addEventListener('transitionend', () => {
          this._isOpen = false;
        });
      }
    } else if (this.open) {
      // allow the html to render before animating in the side panel
      // Use requestAnimationFrame to ensure the DOM is rendered before triggering animation
      requestAnimationFrame(() => {
        this._isOpen = this.open;
      });
    } else {
      // When closing, set immediately
      this._isOpen = false;
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

  private _handleCustomHeaderSlotChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const customHeaderElms = target?.assignedElements();
    customHeaderElms.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = `calc(1 - var(--${blockClass}--scroll-animation-progress))`;
        this._customHeaderElements.push(el);
      }
    });
  }

  private _handleActionToolbarChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const toolbarActions = target?.assignedElements();

    this._hasActionToolbar = toolbarActions && toolbarActions.length > 0;

    if (this._hasActionToolbar) {
      for (let i = 0; i < toolbarActions.length; i++) {
        const toolbarAction = toolbarActions[i];
        // toolbar actions size should always be sm
        toolbarAction.setAttribute('size', 'sm');

        // Add leading button class to first button
        if (i === 0) {
          toolbarAction.classList.add(
            `${blockClass}__action-toolbar-leading-button`
          );
        } else {
          toolbarAction.classList.remove(
            `${blockClass}__action-toolbar-leading-button`
          );
        }
      }
    }
  }

  private _handleActionsChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const actions = target?.assignedElements();

    // update slug size
    this._checkUpdateIconButtonSizes();

    const actionsCount = actions?.length ?? 0;
    this._actionsCount = actionsCount;

    // Set actions-multiple attribute for container query styling
    if (actionsCount === 1) {
      this._actionsMultiple = 'single';
    } else if (actionsCount === 2) {
      this._actionsMultiple = 'double';
    } else if (actionsCount === 3) {
      this._actionsMultiple = 'triple';
    } else {
      this._actionsMultiple = '';
    }
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
    const animationProgress =
      Math.min(scrollTop, scrollAnimationDistance) / scrollAnimationDistance;

    this?._sidePanel?.style?.setProperty(
      `--${blockClass}--scroll-animation-progress`,
      `${animationProgress}`
    );
    if (animationProgress === 1) {
      this._customHeaderElements.forEach((el) => {
        el.classList.add(`cds--visually-hidden`);
      });
    } else {
      this._customHeaderElements.forEach((el) => {
        el.classList.remove(`cds--visually-hidden`);
      });
    }
  };

  /**
   * Handles resize start event from the resizer handle
   */
  private _handleResizeStart = () => {
    this._sidePanelWidth = this._sidePanel?.clientWidth;
    this._accumulatedDelta = 0;
  };

  /**
   * Handles resize drag event from the resizer handle
   */
  private _handleResizeDrag = (event: CustomEvent) => {
    const { delta, isKeyboard, key } = event.detail;

    if (!this._sidePanelWidth) {
      this._sidePanelWidth = this._sidePanel?.clientWidth;
    }

    // Handle Home/End keys specially (like React implementation)
    if (isKeyboard && (key === 'Home' || key === 'End')) {
      if (key === 'Home') {
        // Home = maximize to 75vw
        this.style.setProperty('--c4p-side-panel-modified-size', '75vw');
      } else {
        // End = minimize to 16rem
        this.style.setProperty('--c4p-side-panel-modified-size', '16rem');
      }
      return;
    }

    let calculatedWidth: number;

    if (isKeyboard) {
      // For keyboard arrow keys, accumulate delta (like React implementation)
      this._accumulatedDelta += delta;
      calculatedWidth =
        this._sidePanelWidth -
        (this.placement === 'right'
          ? this._accumulatedDelta
          : -this._accumulatedDelta);
    } else {
      // For mouse events, use delta directly
      calculatedWidth =
        this._sidePanelWidth - (this.placement === 'right' ? delta : -delta);
    }

    // Remove transition during drag for smooth resizing
    if (this._sidePanel?.style) {
      this._sidePanel.style.transition = 'none';
    }

    // Clamp width between minimum (16rem = 256px) and maximum (75% of viewport)
    const minWidth = 256; // 16rem
    const maxWidth = window.innerWidth * 0.75;
    const newWidth = Math.max(minWidth, Math.min(maxWidth, calculatedWidth));

    // Apply the new width via CSS variable
    this.style.setProperty('--c4p-side-panel-modified-size', `${newWidth}px`);
  };

  /**
   * Handles resize end event from the resizer handle
   */
  private _handleResizeEnd = () => {
    this._accumulatedDelta = 0;
    this._sidePanel?.style?.removeProperty('transition');
    this._sidePanelWidth = this._sidePanel?.clientWidth;

    // Update ARIA attributes on the resizer handle
    if (this._resizerHandle) {
      this._resizerHandle.setAttribute(
        'aria-label',
        `side panel is covering ${this._getPanelWidthPercent()}% of screen`
      );
      this._resizerHandle.setAttribute(
        'aria-valuenow',
        this._getPanelWidthPercent().toString()
      );
    }
  };

  /**
   * Handles double-click/double-tap on resizer to reset size
   */
  private _handleResizeReset = () => {
    // Get the default size for current size setting
    const sizeMap = {
      xs: '16rem',
      sm: '20rem',
      md: '30rem',
      lg: '40rem',
      xl: '65rem',
      '2xl': '80rem',
    };

    const defaultSize = sizeMap[this.size] || sizeMap.md;
    const defaultSizeInPx = parseFloat(defaultSize) * 16;

    // Reset to default size (or 75vw if default is larger)
    this._sidePanelWidth = Math.min(defaultSizeInPx, window.innerWidth * 0.75);

    // Remove custom size
    this.style.removeProperty('--c4p-side-panel-modified-size');
  };

  /**
   * Get the percentage of screen width the panel is covering
   */
  private _getPanelWidthPercent = (customWidth?: string): number => {
    if (customWidth) {
      const remValue = parseFloat(customWidth);
      const remInPixels =
        remValue *
        parseFloat(getComputedStyle(document.documentElement).fontSize);
      return Math.round((remInPixels / window.innerWidth) * 100);
    }
    return Math.round(
      ((this._sidePanel?.clientWidth || 0) / window.innerWidth) * 100
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
  @property({
    reflect: true,
    attribute: 'close-icon-description',
    type: String,
  })
  closeIconDescription = 'Close';

  /**
   * Sets the close button tooltip alignment
   */
  @property({
    reflect: true,
    attribute: 'close-icon-tooltip-alignment',
    type: String,
  })
  closeIconTooltipAlignment = 'left';

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
   * Show/hide the "X" close button
   */
  @property({ attribute: 'hide-close-button', type: Boolean })
  hideCloseButton = false;

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
   * Determines if the side panel is resizable
   */
  @property({ type: Boolean, reflect: true })
  resizable = false;

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

    // Listen for resize events from resizer handle
    this.addEventListener(
      'resize-start',
      this._handleResizeStart as EventListener
    );
    this.addEventListener(
      'resize-drag',
      this._handleResizeDrag as EventListener
    );
    this.addEventListener('resize-end', this._handleResizeEnd as EventListener);
    this.addEventListener(
      'resize-reset',
      this._handleResizeReset as EventListener
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.disconnectObservers();

    // Remove resize event listeners
    this.removeEventListener(
      'resize-start',
      this._handleResizeStart as EventListener
    );
    this.removeEventListener(
      'resize-drag',
      this._handleResizeDrag as EventListener
    );
    this.removeEventListener(
      'resize-end',
      this._handleResizeEnd as EventListener
    );
    this.removeEventListener(
      'resize-reset',
      this._handleResizeReset as EventListener
    );
  }

  render() {
    const {
      closeIconDescription,
      closeIconTooltipAlignment,
      condensedActions,
      currentStep,
      includeOverlay,
      labelText,
      navigationBackIconDescription,
      open,
      placement,
      hideCloseButton,
      size,
      slideIn,
      title,
    } = this;

    if (!open && !this._isOpen) {
      return html``;
    }

    const titleTemplate = html` <div
      class=${`${blockClass}__title`}
      ?no-label=${!!labelText}
    >
      <h2 class=${title ? `${blockClass}__title-text` : ''} tabindex="0">
        ${title}
      </h2>
      ${this._doAnimateTitle
        ? html`<h2
            class=${`${blockClass}__collapsed-title-text`}
            aria-hidden="true"
          >
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
        ?reduced-motion=${this._reducedMotion.matches}
      >
        <!-- render back button -->
        ${currentStep > 0
          ? html`<cds-icon-button
              align="bottom-left"
              aria-label=${navigationBackIconDescription}
              kind="ghost"
              size="sm"
              class=${`${prefix}--btn ${blockClass}__navigation-back-button`}
              @click=${this._handleNavigateBack}
            >
              ${iconLoader(ArrowLeft16, { slot: 'icon' })}
              <span slot="tooltip-content">
                ${navigationBackIconDescription}
              </span>
            </cds-icon-button>`
          : ''}

        <!-- slot for custom header components -->
        <slot
          name="above-title"
          @slotchange=${this._handleCustomHeaderSlotChange}
        ></slot>

        <!-- render title label -->
        ${title?.length && labelText?.length
          ? html` <p class=${`${blockClass}__label-text`} tabindex="0">
              ${labelText}
            </p>`
          : ''}

        <!-- title -->
        ${title ? titleTemplate : ''}

        <!-- render slug and close button area -->
        <div class=${`${blockClass}__slug-and-close`}>
          <slot name="slug" @slotchange=${this._handleSlugChange}></slot>
          <!-- {normalizedSlug} -->
          ${!hideCloseButton
            ? html`<cds-icon-button
                align=${closeIconTooltipAlignment}
                aria-label=${closeIconDescription}
                kind="ghost"
                size="sm"
                class=${`${blockClass}__close-button`}
                @click=${this._handleCloseClick}
              >
                ${iconLoader(Close16, { slot: 'icon' })}
                <span slot="tooltip-content"> ${closeIconDescription} </span>
              </cds-icon-button>`
            : ''}
        </div>

        <!-- render sub title -->
        <p
          class=${this._hasSubtitle ? `${blockClass}__subtitle-text` : ''}
          ?hidden=${!this._hasSubtitle}
          ?no-title-animation=${!this._doAnimateTitle}
          ?no-action-toolbar=${!this._hasActionToolbar}
          ?no-title=${!title}
          tabindex="0"
        >
          <slot
            name="subtitle"
            @slotchange=${this._handleSubtitleChange}
          ></slot>
        </p>

        <!-- slot for custom header components -->
        <slot
          name="below-title"
          @slotchange=${this._handleCustomHeaderSlotChange}
        ></slot>

        <div
          class=${this._hasActionToolbar ? `${blockClass}__action-toolbar` : ''}
          ?hidden=${!this._hasActionToolbar}
          ?no-title-animation=${!this._doAnimateTitle}
        >
          <slot
            name="action-toolbar"
            @slotchange=${this._handleActionToolbarChange}
          ></slot>
        </div>
      </div>
    `;

    const mainTemplate = html`<div
      class=${`${blockClass}__inner-content`}
      ?scrolls=${!this._doAnimateTitle}
    >
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
        ?resizable=${this.resizable && !slideIn}
        size=${size}
      >
        ${!slideIn &&
        this.resizable &&
        typeof window !== 'undefined' &&
        window.innerWidth > 768
          ? html`<clabs-resizer-handle
              class="${blockClass}__resizer"
              orientation="horizontal"
              aria-valuemin="${this._getPanelWidthPercent('16rem')}"
              aria-valuemax="75"
              aria-valuenow="${this._getPanelWidthPercent()}"
              aria-label="side panel is covering ${this._getPanelWidthPercent()}% of screen"
              @resize-start=${this._handleResizeStart}
              @resize-drag=${this._handleResizeDrag}
              @resize-end=${this._handleResizeEnd}
              @resize-reset=${this._handleResizeReset}
            ></clabs-resizer-handle>`
          : ''}
        ${this._doAnimateTitle
          ? html`<div class=${`${blockClass}__animated-scroll-wrapper`} scrolls>
              ${headerTemplate} ${mainTemplate}
            </div>`
          : html` ${headerTemplate} ${mainTemplate}`}

        <c4p-action-set
          class=${`${blockClass}__actions-container`}
          ?hidden=${this._actionsCount === 0}
          size="md"
          button-size=${condensedActions ? 'md' : 'lg'}
          actions-multiple=${this._actionsMultiple}
        >
          <slot name="actions" @slotchange=${this._handleActionsChange}></slot>
        </c4p-action-set>
      </div>

      ${includeOverlay
        ? html`<div
            ?slide-in=${slideIn}
            class=${`${blockClass}__overlay`}
            ?open=${this.open}
            ?opening=${open && !this._isOpen}
            ?closing=${!open && this._isOpen}
            tabindex="-1"
            @click=${this._handleClickOnOverlay}
          ></div>`
        : ''}
    `;
  }

  async updated(changedProperties) {
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

        await (this.constructor as typeof CDSSidePanel)._delay();

        if (this.selectorInitialFocus?.trim()?.length) {
          const focusNode = this.querySelector(this.selectorInitialFocus);

          (focusNode as HTMLElement)?.focus();
        } else if (!this.slideIn) {
          const { first: _firstElement } = this.getFocusable();

          _firstElement?.focus();
        }
      } else if (
        this._launcher &&
        typeof (this._launcher as HTMLElement)?.focus === 'function'
      ) {
        (this._launcher as HTMLElement)?.focus();
        this._launcher = null;
      }
    }

    // Reset custom size when size prop changes or when resizable is disabled
    if (
      (changedProperties.has('size') && this.resizable && !this.slideIn) ||
      (changedProperties.has('resizable') && !this.resizable)
    ) {
      this.style.removeProperty('--c4p-side-panel-modified-size');
    }

    // Update stored width when resizable changes or panel opens
    if (
      (changedProperties.has('resizable') || changedProperties.has('open')) &&
      this.resizable &&
      !this.slideIn &&
      this.open
    ) {
      await this.updateComplete;
      this._sidePanelWidth = this._sidePanel?.clientWidth;
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
