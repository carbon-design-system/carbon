/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, PropertyValues, html } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './tearsheet.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSTearsheetStack from './tearsheet-stack';
import { classMap } from 'lit-html/directives/class-map.js';
import { MatchMediaController } from '../../globals/js/utils/match-media-controller';
import { breakpoints } from '@carbon/layout';
import { ContextProvider } from '@lit/context';
import {
  blockClass,
  defaultTearsheetState,
  tearsheetContext,
  type TearsheetState,
} from './tearsheet-context';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { ifDefined } from 'lit/directives/if-defined.js';
import { stackManager } from './stack-signal';
import {
  trapFocus,
  clearFocusableContainers,
} from '../../utilities/manageFocusTrap/manageFocusTrap';

/**
 * Tearsheet component - A slide-out panel for displaying detailed content.
 *
 * @element cds-tearsheet
 * @slot header - The header content of the tearsheet
 * @slot influencer - Optional left sidebar content (wide variant only)
 * @slot body - Main body content
 * @slot footer - Footer content with actions
 * @fires cds-tearsheet-beingclosed - Fired when the tearsheet is about to close
 * @fires cds-tearsheet-closed - Fired after the tearsheet has closed
 * @fires cds-tearsheet-collapse-change - Fired when the header collapse state changes.
 *   `event.detail.collapsed` is `true` when collapsing, `false` when expanding.
 */
@customElement(`${prefix}-tearsheet`)
class CDSTearsheet extends HostListenerMixin(LitElement) {
  /**
   * Specifies whether the tearsheet is currently open.
   */
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  /**
   * User can pass any class names that will be added to the modal container
   */
  @property({ attribute: 'container-class-name' })
  containerClassName: string = '';

  /**
   * Default influencer takes 256px, this allows override eg: 300px, 20rem
   */
  @property({ attribute: 'influencer-width' })
  influencerWidth: string = '';

  /**
   * Default summary content takes 256px, this allows override eg: 300px, 20rem
   */
  @property({ attribute: 'summary-content-width' })
  summaryContentWidth: string = '';

  /**
   * Defines the gap from top of the viewport. Defaulted to 3rem
   */
  @property({ attribute: 'vertical-gap' })
  verticalGap: string = '';

  /**
   * Default to wide variant. Pass in narrow for narrow tearsheet
   */
  @property({ reflect: true })
  variant: 'wide' | 'narrow' = 'wide';

  /**
   * Specify the CSS selectors that match the floating menus (comma-separated)
   */
  @property({ attribute: 'selectors-floating-menus' })
  selectorsFloatingMenus: string = '';

  /**
   * Specify a CSS selector that matches the DOM element that should be focused when the Modal opens
   */
  @property({ attribute: 'selector-primary-focus' })
  selectorPrimaryFocus: string = '';

  /**
   * Prevents the modal from closing when clicking outside
   */
  @property({ type: Boolean, attribute: 'prevent-close-on-click-outside' })
  preventCloseOnClickOutside: boolean = false;

  /**
   * aria-label for the tearsheet dialog
   */
  @property({ reflect: true, attribute: 'aria-label' })
  ariaLabel: string = '';

  /**
   * Optional reference to the element that triggered the tearsheet to open.
   * When provided, focus is explicitly returned to this element on close.
   * If omitted, the component falls back to whichever element had focus at
   * open time (document.activeElement capture).
   *
   * Useful for stacking — the launcher is inside another open tearsheet so
   * automatic capture may pick up the wrong element after context-driven re-renders.
   *
   * @example
   * // In consumer JS, after getting a ref to the trigger button:
   * tearsheetEl.launcherButtonRef = openButton;
   */
  @property({ attribute: false })
  launcherButtonRef?: HTMLElement;

  /** Unique ID for this tearsheet instance.
   *  `protected` so child components can read it via `closest()` cast without
   *  bypassing TypeScript visibility — avoids the `& { uniqueId?: string }` cast pattern. */
  protected readonly uniqueId: string = `tearsheet-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Internal flag to track if stacking is enabled (via wrapper)
   */
  private _stackingEnabled: boolean = false;

  /**
   * Unsubscribe function returned by stackManager.subscribe().
   * Null when stacking is not enabled for this instance.
   */
  private _stackUnsubscribe: (() => void) | null = null;

  /**
   * Internal state for tracking if the tearsheet is in small screen mode
   */
  @state()
  private isSm: boolean = false;

  /**
   * Query the modal body element
   */
  @query(`${prefix}-modal-body`)
  private modalBodyElement?: HTMLElement;

  private _trapFocusAPI: { cleanup: () => void } | null = null;
  private _wasOpen = false;
  /** Fallback launcher captured from document.activeElement at open time. */
  private _launcher: Element | null = null;
  private smMediaQuery = `(max-width: ${breakpoints.md.width})`;
  private isSmallDevice = new MatchMediaController(
    this,
    this.smMediaQuery,
    false
  );

  /**
   * Context provider — owns the per-instance TearsheetState and exposes a
   * `setState` function so children can write back into it without needing any
   * uniqueId registry or WeakMap lookups.
   */
  private _ctx = new ContextProvider(this, {
    context: tearsheetContext,
    initialValue: {
      state: { ...defaultTearsheetState },
      setState: (patch) => this._updateState(patch),
    },
  });

  /** Merge a partial patch into the context state and trigger re-renders. */
  private _updateState(patch: Partial<TearsheetState>): void {
    this._ctx.setValue({
      state: { ...this._ctx.value.state, ...patch },
      setState: this._ctx.value.setState,
    });
    // ContextProvider.setValue notifies consumers but not the provider itself.
    // Request an update so the parent's render() picks up hasAILabel/hasDecorator.
    this.requestUpdate();
  }

  connectedCallback(): void {
    super.connectedCallback();

    // Listen for stack wrapper events first
    this.addEventListener(
      `${prefix}-tearsheet-stack-connected`,
      this.handleStackConnected as EventListener
    );
    this.addEventListener(
      `${prefix}-tearsheet-stack-step-size-changed`,
      this.handleStackStepSizeChanged as EventListener
    );

    // Check if this tearsheet is wrapped in a stack provider
    // This handles the case where the stack wrapper connected before this tearsheet
    this._checkForStackWrapper();

    // Set visibility class
    if (this.open) {
      this.classList.add('is-visible');
    } else {
      this.classList.remove('is-visible');
    }

    // Listen for close button click from header
    this.addEventListener(
      `${prefix}-tearsheet-header-close-button-clicked`,
      this.handleHeaderCloseButtonClick as EventListener
    );

    // Listen for internal collapse-change from header; re-dispatch as public event
    this.addEventListener(
      `${prefix}-tearsheet-header-collapse-change`,
      this.handleHeaderCollapseChange as EventListener
    );
  }

  protected override firstUpdated(): void {
    this.updateCSSCustomProperties();
    this.isSm = this.isSmallDevice?.matches || this.variant === 'narrow';
    // Populate initial context state derived from element properties.
    this._updateState({
      variant: this.variant,
      isSm: this.isSm,
      open: this.open,
      onClose: () => {
        this.open = false;
      },
    });
  }

  protected updated(_changedProperties: PropertyValues): void {
    this.updateIsSmState();
    this.handleOpenPropertyChange(_changedProperties);
    this.updateCSSPropertiesIfNeeded(_changedProperties);

    if (_changedProperties.has('variant')) {
      this._updateState({ variant: this.variant });
    }

    if (_changedProperties.has('isSm')) {
      this.updateInfluencerVisibility();
    }

    this.updateStackPropertiesIfNeeded();
  }

  private updateIsSmState(): void {
    const previousIsSm = this.isSm;
    this.isSm = this.isSmallDevice?.matches || this.variant === 'narrow';

    if (this.isSm !== previousIsSm) {
      this._updateState({ isSm: this.isSm });
    }
  }

  private handleOpenPropertyChange(_changedProperties: PropertyValues): void {
    if (!_changedProperties.has('open')) {
      return;
    }
    const wasOpen = this._wasOpen;
    const isOpen = this.open;

    this._updateState({ open: this.open });

    // Only register with stack manager if stacking is enabled
    if (this._stackingEnabled && this.modalBodyElement) {
      stackManager.notifyStack(this.uniqueId, this.open, this.modalBodyElement);
    }

    this.classList.toggle('is-visible', this.open);

    // Only update stack properties if stacking is enabled
    if (this._stackingEnabled) {
      this.updateStackProperties();
    }

    if (!wasOpen && isOpen) {
      // Reset collapse state every time the tearsheet opens fresh so it always
      // starts expanded.
      this._updateState({ fullyCollapsed: false });

      this._launcher = CDSTearsheet._getDeepActiveElement(this.ownerDocument);

      // Notify this tearsheet's own header-content to handle initial focus.
      // Non-bubbling so it only reaches listeners attached directly to this
      // element — prevents cross-instance focus stealing in stacking.
      this.dispatchEvent(
        new CustomEvent(`${prefix}-tearsheet-opened`, {
          bubbles: false,
          composed: false,
          detail: {
            selectorPrimaryFocus: this.selectorPrimaryFocus,
            uniqueId: this.uniqueId,
          },
        })
      );

      // Set up focus trap for Tab/Shift+Tab cycling.
      requestAnimationFrame(() => {
        this._trapFocusAPI = trapFocus(this as HTMLElement, this.uniqueId, () =>
          this._getFirstFocusable()
        );
      });
    }

    if (wasOpen && !isOpen) {
      const target = this.launcherButtonRef ?? this._launcher;
      this._launcher = null;
      if (target && typeof (target as HTMLElement).focus === 'function') {
        (target as HTMLElement).focus();
      }
    }

    this._wasOpen = isOpen;
  }

  private updateCSSPropertiesIfNeeded(
    _changedProperties: PropertyValues
  ): void {
    const hasRelevantChanges =
      _changedProperties.has('influencerWidth') ||
      _changedProperties.has('summaryContentWidth') ||
      _changedProperties.has('verticalGap');

    if (hasRelevantChanges) {
      this.updateCSSCustomProperties();
    }
  }

  private updateStackPropertiesIfNeeded(): void {
    if (!this._stackingEnabled) {
      return;
    }

    const stackState = stackManager.state;
    if (stackState.stack.length > 0) {
      this.updateStackProperties();
    }
  }

  /**
   * Update CSS custom properties for stacking
   */
  private updateStackProperties(): void {
    const stackState = stackManager.state;
    const depth = stackManager.getDepth(this.uniqueId);
    const scaleFactor = stackManager.getScaleFactor(this.uniqueId);
    const blockSizeChange = stackManager.getBlockSizeChange(this.uniqueId);

    // Manage --stack-activated class on host element
    if (stackState.stack.length > 1) {
      this.classList.add(`${blockClass}--stack-activated`);
    } else {
      this.classList.remove(`${blockClass}--stack-activated`);
    }

    if (depth !== -1) {
      this.style.setProperty('--stack-depth', depth.toString());
      this.style.setProperty('--scale-factor', scaleFactor.toString());
      this.style.setProperty('--block-size-change', blockSizeChange);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Cleanup focus trap and clear all registered containers
    this._trapFocusAPI?.cleanup();
    clearFocusableContainers();

    // Remove event listeners
    this.removeEventListener(
      `${prefix}-tearsheet-header-close-button-clicked`,
      this.handleHeaderCloseButtonClick as EventListener
    );
    this.removeEventListener(
      `${prefix}-tearsheet-stack-connected`,
      this.handleStackConnected as EventListener
    );
    this.removeEventListener(
      `${prefix}-tearsheet-stack-step-size-changed`,
      this.handleStackStepSizeChanged as EventListener
    );
    // Fix: this listener was added in connectedCallback but was never removed,
    // causing a memory leak and a duplicate listener on reconnect.
    this.removeEventListener(
      `${prefix}-tearsheet-header-collapse-change`,
      this.handleHeaderCollapseChange as EventListener
    );

    // Unsubscribe from the stack manager notification bus
    this._stackUnsubscribe?.();
    this._stackUnsubscribe = null;

    // Notify stack manager that this tearsheet is closing (only if stacking was enabled)
    if (this._stackingEnabled) {
      stackManager.notifyStack(this.uniqueId, false, null);
    }

    // Clean up CSS custom properties
    if (this.influencerWidth) {
      document.documentElement.style.removeProperty(
        '--tearsheet-influencer-width'
      );
    }
    if (this.summaryContentWidth) {
      document.documentElement.style.removeProperty(
        '--tearsheet-summary-content-width'
      );
    }
    if (this.verticalGap) {
      document.documentElement.style.removeProperty('--tearsheet-vertical-gap');
    }
  }

  /**
   * Update CSS custom properties for dynamic styling
   */
  private updateCSSCustomProperties(): void {
    if (this.influencerWidth) {
      document.documentElement.style.setProperty(
        '--tearsheet-influencer-width',
        this.influencerWidth
      );
    }
    if (this.summaryContentWidth) {
      document.documentElement.style.setProperty(
        '--tearsheet-summary-content-width',
        this.summaryContentWidth
      );
    }
    if (this.verticalGap) {
      document.documentElement.style.setProperty(
        '--tearsheet-vertical-gap',
        this.verticalGap
      );
    }
  }

  /**
   * Update influencer visibility based on slot content and screen size
   */
  private updateInfluencerVisibility(slot?: HTMLSlotElement): void {
    const influencerSlot =
      slot ||
      (this.shadowRoot?.querySelector(
        'slot[name="influencer"]'
      ) as HTMLSlotElement);

    if (!influencerSlot) {
      return;
    }

    const hasContent =
      influencerSlot.assignedNodes({ flatten: true }).length > 0;
    const shouldShow = hasContent && !this.isSm;

    // Update CSS class on modal body
    if (this.modalBodyElement) {
      if (shouldShow) {
        this.modalBodyElement.classList.add(
          `${blockClass}__body-layout--has-influencer`
        );
      } else {
        this.modalBodyElement.classList.remove(
          `${blockClass}__body-layout--has-influencer`
        );
      }
    }
  }

  /**
   * Pierces nested shadow roots to return the truly-focused element.
   */
  private static _getDeepActiveElement(
    doc: Document | null | undefined
  ): Element | null {
    if (!doc) return null;
    let el: Element | null = doc.activeElement;
    while (el?.shadowRoot?.activeElement) {
      el = el.shadowRoot.activeElement;
    }
    return el;
  }

  /**
   * Delegate to CDSTearsheetHeaderContent.getFirstFocusable()
   */
  private _getFirstFocusable(): HTMLElement | null {
    const headerContent = this.querySelector(
      `${prefix}-tearsheet-header-content`
    ) as (HTMLElement & { getFirstFocusable(): HTMLElement | null }) | null;
    return headerContent?.getFirstFocusable() ?? null;
  }

  /**
   * Check if this tearsheet is wrapped in a stack provider
   */
  private _checkForStackWrapper(): void {
    let parent = this.parentElement;
    while (parent) {
      if (parent instanceof CDSTearsheetStack) {
        this._enableStacking();
        return;
      }
      parent = parent.parentElement;
    }
    this._stackingEnabled = false;
  }

  /** Subscribe to stackManager so peer open/close events re-run CSS updates. */
  private _enableStacking(): void {
    if (this._stackingEnabled) return; // already subscribed
    this._stackingEnabled = true;
    this._stackUnsubscribe = stackManager.subscribe(() => {
      this.updateStackProperties();
    });
  }

  /**
   * Handle stack wrapper connected event
   */
  private handleStackConnected = (event: Event) => {
    event.stopPropagation();
    this._enableStacking();
  };

  /**
   * Handle stack step size changed event
   */
  private handleStackStepSizeChanged = (event: Event) => {
    event.stopPropagation();
    if (this._stackingEnabled && this.open) {
      this.updateStackProperties();
    }
  };

  /**
   * Handle influencer slot change
   */
  private handleInfluencerSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this.updateInfluencerVisibility(slot);
  };

  /**
   * Dispatches `cds-tearsheet-beingclosed` (cancelable).
   */
  private handleBeingClosed = (event: Event) => {
    const beforeCloseEvent = new CustomEvent(
      `${prefix}-tearsheet-beingclosed`,
      {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {},
      }
    );

    if (!this.dispatchEvent(beforeCloseEvent)) {
      event.preventDefault();
    }
  };

  /**
   * Dispatches `cds-tearsheet-closed` after the modal has fully closed.
   */
  private handleClosed = () => {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent(`${prefix}-tearsheet-closed`, {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
  };

  /**
   * Handle close button click from the header
   */
  private handleHeaderCloseButtonClick = (event: Event) => {
    event.stopPropagation();
    this.open = false;
  };

  /**
   * Intercepts the internal collapse-change event from the header and
   * re-dispatches it as the public `cds-tearsheet-collapse-change` event.
   */
  private handleHeaderCollapseChange = (event: Event) => {
    event.stopPropagation();
    const { collapsed } = (event as CustomEvent).detail;
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSTearsheet).eventCollapseChange,
        {
          bubbles: true,
          composed: true,
          detail: { collapsed },
        }
      )
    );
  };

  /**
   * Parse floating menu selectors from comma-separated string
   */
  private getFloatingMenuSelectors(): string {
    const defaultSelectors = [
      `.${prefix}--overflow-menu-options`,
      `.${prefix}--tooltip`,
      '.flatpickr-calendar',
      `.${blockClass}__container`,
      `.${prefix}--menu`,
    ];

    const customSelectors = this.selectorsFloatingMenus
      ? this.selectorsFloatingMenus.split(',').map((s) => s.trim())
      : [];

    return [...defaultSelectors, ...customSelectors].join(',');
  }

  render() {
    // Read from context value for reactive class bindings.
    const { hasAILabel, hasDecorator } = this._ctx.value.state;

    const classes = classMap({
      [blockClass]: true,
      [`${blockClass}--wide`]: this.variant === 'wide',
      [`${blockClass}--narrow`]: this.variant === 'narrow',
      [`${blockClass}--has-ai-label`]: hasAILabel,
      [`${blockClass}--has-decorator`]: hasDecorator && !hasAILabel,
    });

    const containerClasses = `${blockClass}__container ${this.containerClassName}`;

    const effectiveAriaLabel = this.ariaLabel || undefined;

    return html`<cds-modal
      class=${classes}
      size=${this.variant === 'narrow' ? 'sm' : 'lg'}
      ?open="${this.open}"
      container-class="${containerClasses}"
      ?prevent-close-on-click-outside="${this.preventCloseOnClickOutside}"
      managed-focus
      aria-label="${ifDefined(effectiveAriaLabel)}"
      selector-primary-focus="${ifDefined(
        this.selectorPrimaryFocus || undefined
      )}"
      selectors-floating-menus="${this.getFloatingMenuSelectors()}"
      @cds-modal-beingclosed="${this.handleBeingClosed}"
      @cds-modal-closed="${this.handleClosed}"
      ?full-width="${true}"
      ai-label="${ifDefined(hasAILabel || undefined)}">
      <slot name="header"></slot>
      <cds-modal-body class="${blockClass}__body-layout">
        <slot
          name="influencer"
          @slotchange=${this.handleInfluencerSlotChange}></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </cds-modal-body>
    </cds-modal>`;
  }

  static styles = styles;

  /**
   * Public event fired when the header collapse state changes.
   */
  static get eventCollapseChange() {
    return `${prefix}-tearsheet-collapse-change`;
  }
}

export default CDSTearsheet;
