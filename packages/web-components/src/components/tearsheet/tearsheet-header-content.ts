/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import '../modal/index';
import '../icon-button/index';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSAILabel from '../ai-label/ai-label';
import '../truncated-text';
import styles from './tearsheet-header-content.scss?lit';
import { MatchMediaController } from '../../globals/js/utils/match-media-controller';
import { breakpoints } from '@carbon/layout';
import { registerFocusableContainers } from '../../utilities/manageFocusTrap/manageFocusTrap';
import { tearsheetSignal, updateTearsheetSignals } from './tearsheet-signal';
import CDSTearsheetHeader from './tearsheet-header';
import { SignalWatcher } from '@lit-labs/signals';
import Close20 from '@carbon/icons/es/close/20.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import { prefix as carbonPrefix } from '../../globals/settings';

const blockClass = `${prefix}--tearsheet`;

/**
 * Tearsheet Header Content component - Contains the title, description, and decorative elements.
 *
 * @element cds-tearsheet-header-content
 * @slot label - Optional label text above the title
 * @slot title-start - Content before the title (e.g., icons)
 * @slot title-end - Content after the title (e.g., badges, tags)
 * @slot description - Custom description content below the title
 * @slot decorator - AI label or other decorative elements
 */
@customElement(`${prefix}-tearsheet-header-content`)
class CDSTearsheetHeaderContent extends SignalWatcher(
  HostListenerMixin(LitElement)
) {
  @property({ reflect: true })
  slot = 'header-content';

  /**
   *  The main title of the tearsheet.
   */
  @property({ reflect: true })
  title: string = '';

  /**
   * Internal ID for the title element (used only for the <h2> id in this shadow root)
   */
  private _titleId: string = `${blockClass}__title-${Math.random().toString(36).substr(2, 9)}`;

  @query('slot[name="title-start"]')
  private _titleStartSlot?: HTMLSlotElement;

  @query('slot[name="title-end"]')
  private _titleEndSlot?: HTMLSlotElement;

  @query('slot[name="decorator"]')
  private _decoratorSlot?: HTMLSlotElement;

  @query('slot[name="label"]')
  private _labelSlot?: HTMLSlotElement;

  @query('slot[name="description"]')
  private _descriptionSlot?: HTMLSlotElement;

  @query('slot[name="header-actions"]')
  private _headerActionsSlot?: HTMLSlotElement;

  @query('slot:not([name])')
  private _defaultSlot?: HTMLSlotElement;

  @state()
  private _hasTitleStart = false;

  @state()
  private _hasTitleEnd = false;

  @state()
  private _hasDecorator = false;

  @state()
  private _hasAILabel = false;

  @state()
  private _hasLabel = false;

  @state()
  private _hasDescription = false;

  @state()
  private _hasHeaderActions = false;

  @state()
  private _hasExtraContent = false;

  @state()
  private _isMobileOrNarrow = false;

  private mdMediaQuery = `(max-width: ${breakpoints.md.width})`;
  private isMobileDevice = new MatchMediaController(
    this,
    this.mdMediaQuery,
    false
  );

  private get isNarrowVariant(): boolean {
    return tearsheetSignal.get().variant === 'narrow';
  }

  protected override firstUpdated(): void {
    this._checkSlots();
    this._isMobileOrNarrow =
      this.isMobileDevice?.matches || this.isNarrowVariant;

    // Register containers in intentional order:
    // 1. `this` (light DOM) — finds header-action buttons and AI label (slot="decorator")
    // 2. `this.shadowRoot` — finds close button (cds-icon-button) and decorator slot host
    const uniqueId = tearsheetSignal.get().uniqueId;
    if (uniqueId) {
      registerFocusableContainers(this, uniqueId);
      registerFocusableContainers(this.shadowRoot, uniqueId);
    }
  }

  protected override updated(): void {
    const previousIsMobileOrNarrow = this._isMobileOrNarrow;
    this._isMobileOrNarrow =
      this.isMobileDevice?.matches || this.isNarrowVariant;

    if (this._isMobileOrNarrow !== previousIsMobileOrNarrow) {
      this.requestUpdate();
    }

    this._updateDecoratorSize();
    this._updateHeaderOffset();
    this._updateInertState();
  }

  private _focusTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Returns the element that should receive focus when this tearsheet opens.
   *
   * Priority order (desktop/wide):  close button → header-action button → AI label
   * Priority order (mobile/narrow): close button → AI label → header-action button
   *
   * Called by the parent cds-tearsheet (via querySelector) so focus logic stays
   * in the component that owns the DOM — no shared signal reads needed.
   */
  getFirstFocusable(): HTMLElement | null {
    // header-actions: consumer may slot a button directly OR wrap in a div
    const headerActionSlot = this.querySelector<HTMLElement>(
      '[slot="header-actions"]'
    );
    const headerActionBtn = headerActionSlot
      ? headerActionSlot.matches(
          `${carbonPrefix}-button:not([disabled]), button:not([disabled])`
        )
        ? headerActionSlot
        : headerActionSlot.querySelector<HTMLElement>(
            `${carbonPrefix}-button:not([disabled]), button:not([disabled])`
          )
      : null;

    // close button — lives in this component's own shadow DOM
    const closeBtn = this.shadowRoot?.querySelector<HTMLElement>(
      `.${blockClass}__close-button ${carbonPrefix}-icon-button:not([disabled])`
    );

    // AI label — consumer may slot cds-ai-label directly OR wrap it in a div
    const decoratorSlot = this.querySelector<HTMLElement>('[slot="decorator"]');
    const aiLabel = decoratorSlot
      ? decoratorSlot.matches(`${carbonPrefix}-ai-label`)
        ? decoratorSlot
        : decoratorSlot.querySelector<HTMLElement>(`${carbonPrefix}-ai-label`)
      : null;

    return this._isMobileOrNarrow
      ? (closeBtn ?? aiLabel ?? headerActionBtn ?? null)
      : (closeBtn ?? headerActionBtn ?? aiLabel ?? null);
  }

  /**
   * Handle the tearsheet-opened event dispatched by the parent cds-tearsheet.
   * Scoped per-instance (non-bubbling event) so only this header-content reacts
   * to its own tearsheet opening — no cross-instance focus stealing in stacking.
   *
   * The tearsheet slides in via CSS transform (~240ms). Browsers refuse to focus
   * an off-screen/mid-transform element, so we defer 100ms into the animation.
   */
  private _handleTearsheetOpened = (event: Event) => {
    const { selectorPrimaryFocus } = (event as CustomEvent).detail;

    if (this._focusTimer !== null) {
      clearTimeout(this._focusTimer);
      this._focusTimer = null;
    }

    this._focusTimer = setTimeout(() => {
      this._focusTimer = null;

      let focusTarget: HTMLElement | null = null;

      if (selectorPrimaryFocus) {
        // Consumer-specified selector: search this tearsheet's own light DOM.
        const match =
          this.closest(`${prefix}-tearsheet`)?.querySelector<HTMLElement>(
            selectorPrimaryFocus
          ) ?? null;
        // Drill into shadow root for the real focusable if it's a custom element
        // (e.g. cds-button → <button>, cds-text-input → <input>).
        focusTarget =
          match?.shadowRoot?.querySelector<HTMLElement>(
            'button:not([disabled]), input:not([disabled]):not([type="hidden"])'
          ) ?? match;
      }

      // Fall back to the priority-ordered first focusable in the header when
      // selectorPrimaryFocus was empty, or matched nothing in the DOM.
      if (!focusTarget) {
        const first = this.getFirstFocusable();
        focusTarget =
          first?.shadowRoot?.querySelector<HTMLElement>(
            'button:not([disabled])'
          ) ?? first;
      }

      focusTarget?.focus({ preventScroll: true });
    }, 100);
  };

  /**
   * Applies `inert` to collapsed header regions so they are removed from
   * the tab order and AT tree. CSS alone (opacity:0 / max-block-size:0)
   * does not prevent keyboard focus on hidden elements.
   *
   * Collapsed regions:
   *   - Everything in header-content except the title wrapper
   *     (description, label, extra slot content, "Read more" button)
   *   - Header-actions on small/narrow screens
   */
  private _updateInertState(): void {
    const { fullyCollapsed } = tearsheetSignal.get();

    // Header-content children except title wrapper
    const headerContent = this.shadowRoot?.querySelector(
      `.${blockClass}__header-content`
    );
    if (headerContent) {
      headerContent
        .querySelectorAll<HTMLElement>(
          `:scope > *:not(.${blockClass}__content__title-wrapper)`
        )
        .forEach((el) => {
          el.toggleAttribute('inert', fullyCollapsed);
        });
    }

    // Header-actions: inert on small/narrow when collapsed
    const headerActions = this.shadowRoot?.querySelector<HTMLElement>(
      `.${blockClass}__header-actions`
    );
    if (headerActions) {
      const shouldInert = fullyCollapsed && this._isMobileOrNarrow;
      headerActions.toggleAttribute('inert', shouldInert);
    }
  }

  private _checkSlots() {
    if (this._titleStartSlot) {
      const assignedNodes = this._titleStartSlot.assignedElements();
      this._hasTitleStart = assignedNodes.length > 0;
    }
    if (this._titleEndSlot) {
      const assignedNodes = this._titleEndSlot.assignedElements();
      this._hasTitleEnd = assignedNodes.length > 0;
    }
    if (this._labelSlot) {
      const assignedNodes = this._labelSlot.assignedElements();
      this._hasLabel = assignedNodes.length > 0;
    }
    if (this._descriptionSlot) {
      const assignedNodes = this._descriptionSlot.assignedElements();
      this._hasDescription = assignedNodes.length > 0;
    }
    if (this._headerActionsSlot) {
      const assignedNodes = this._headerActionsSlot.assignedElements();
      this._hasHeaderActions = assignedNodes.length > 0;
    }
    if (this._defaultSlot) {
      const assignedNodes = this._defaultSlot.assignedElements();
      this._hasExtraContent = assignedNodes.length > 0;
    }
  }

  private _handleSlotChange() {
    this._checkSlots();
  }

  private _handleDecoratorChange(e: Event) {
    this._hasAILabel = false;
    const childItems = (e.target as HTMLSlotElement).assignedElements();
    this._hasDecorator = childItems.length > 0;
    if (this._hasDecorator) {
      for (const item of childItems) {
        if (item instanceof CDSAILabel) {
          this._hasAILabel = true;
          break;
        }
      }
      // Set decorator size based on collapse state
      const { fullyCollapsed } = tearsheetSignal.get();
      childItems[0].setAttribute('size', fullyCollapsed ? 'xs' : 'sm');

      // Push decorator state into signal so cds-tearsheet can read it
      // without a tag-name querySelector
      updateTearsheetSignals({
        hasDecorator: true,
        hasAILabel: this._hasAILabel,
      });

      // Update host attributes for CSS targeting.
      // Walk ancestors with instanceof — tag-name independent.
      let ancestor = this.parentElement;
      while (ancestor && !(ancestor instanceof CDSTearsheetHeader)) {
        ancestor = ancestor.parentElement;
      }
      if (ancestor instanceof CDSTearsheetHeader) {
        ancestor.setAttribute(this._hasAILabel ? 'ai-label' : 'decorator', '');
        ancestor.removeAttribute(this._hasAILabel ? 'decorator' : 'ai-label');
      }
    } else {
      // Push cleared decorator state into signal
      updateTearsheetSignals({ hasDecorator: false, hasAILabel: false });

      let ancestor = this.parentElement;
      while (ancestor && !(ancestor instanceof CDSTearsheetHeader)) {
        ancestor = ancestor.parentElement;
      }
      if (ancestor instanceof CDSTearsheetHeader) {
        ancestor.removeAttribute('decorator');
        ancestor.removeAttribute('ai-label');
      }
    }
    // Update header offset CSS variable
    this._updateHeaderOffset();
  }

  private _updateDecoratorSize() {
    const { fullyCollapsed } = tearsheetSignal.get();
    const assigned = this._decoratorSlot?.assignedElements({ flatten: true });
    if (assigned?.length) {
      assigned[0].setAttribute('size', fullyCollapsed ? 'xs' : 'sm');
    }
  }

  private _updateHeaderOffset() {
    const { open, isSm } = tearsheetSignal.get();
    if (!open) {
      return;
    }
    // Mirror React: querySelector `.cds--ai-label` and read clientWidth.
    // clientWidth is available synchronously after render (no rAF needed).
    // React: `AILabelWidth + 24 + (isSm ? 8 : 0)`
    const AILabelWidth =
      this.querySelector('[slot="decorator"]')?.clientWidth ?? 0;
    const offset = AILabelWidth + 24 + (isSm ? 8 : 0);
    document.documentElement.style.setProperty(
      '--tearsheet-header-action-offset',
      `${offset}px`
    );
  }

  render() {
    const { fullyCollapsed, hideCloseButton, closeIconDescription, onClose } =
      tearsheetSignal.get();

    const decoratorTemplate = html`
      <div
        class="${blockClass}__decorator"
        role="${this._hasDecorator ? 'complementary' : undefined}"
        aria-label="${this._hasDecorator ? 'Decorator' : undefined}">
        <slot
          name="decorator"
          @slotchange=${this._handleDecoratorChange}></slot>
      </div>
    `;

    const closeButtonTemplate = !hideCloseButton
      ? html`
          <div
            class="${blockClass}__close-button ${carbonPrefix}--modal-close-button">
            <cds-icon-button
              class="${carbonPrefix}--modal-close"
              kind="ghost"
              size="${fullyCollapsed ? 'md' : 'lg'}"
              align="left"
              aria-label="${closeIconDescription || 'Close'}"
              @click="${() => {
                onClose?.();
                this.dispatchEvent(
                  new CustomEvent(
                    `${prefix}-tearsheet-header-close-button-clicked`,
                    { bubbles: true, composed: true }
                  )
                );
              }}">
              ${iconLoader(Close20, {
                slot: 'icon',
                class: `${carbonPrefix}--modal-close__icon`,
              })}
              <span slot="tooltip-content"
                >${closeIconDescription || 'Close'}</span
              >
            </cds-icon-button>
          </div>
        `
      : html``;

    const headerActionsTemplate = this._hasHeaderActions
      ? html`
          <div class="${blockClass}__header-actions">
            <slot
              name="header-actions"
              @slotchange="${this._handleSlotChange}"></slot>
          </div>
        `
      : html`<slot
          name="header-actions"
          @slotchange="${this._handleSlotChange}"></slot>`;

    const titleClasses = classMap({
      [`${blockClass}__header-title`]: true,
      [`${blockClass}__header-title--no-content-below`]:
        !this._hasDescription && !this._hasExtraContent,
    });

    const headerContentTemplate = html`
      <div class="${blockClass}__header-content">
        <!-- Label -->
        ${this._hasLabel
          ? html`
              <div class="${blockClass}__header-label">
                <slot
                  name="label"
                  @slotchange="${this._handleSlotChange}"></slot>
              </div>
            `
          : html`<slot
              name="label"
              @slotchange="${this._handleSlotChange}"></slot>`}

        <div class="${blockClass}__content__title-wrapper">
          <h2 class="${titleClasses}" id="${this._titleId}">
            <!-- Title Start -->
            ${this._hasTitleStart
              ? html`
                  <span class="${blockClass}__title-start">
                    <slot
                      name="title-start"
                      @slotchange="${this._handleSlotChange}"></slot>
                  </span>
                `
              : html`<slot
                  name="title-start"
                  @slotchange="${this._handleSlotChange}"></slot>`}

            <!-- Title (main text) — limit to 1 line when collapsed so it fits
                 in the reduced-height collapsed bar -->
            <cds-truncated-text
              class="${blockClass}__content__title"
              id="${blockClass}__header-title__truncatedText"
              value="${this.title}"
              lines="${tearsheetSignal.get().fullyCollapsed
                ? 1
                : 2}"></cds-truncated-text>

            <!-- Title End -->
            ${this._hasTitleEnd
              ? html`
                  <span class="${blockClass}__title-end">
                    <slot
                      name="title-end"
                      @slotchange="${this._handleSlotChange}"></slot>
                  </span>
                `
              : html`<slot
                  name="title-end"
                  @slotchange="${this._handleSlotChange}"></slot>`}
          </h2>
        </div>

        <!-- Description -->
        ${this._hasDescription
          ? html`
              <div class="${blockClass}__header-description">
                <slot
                  name="description"
                  @slotchange="${this._handleSlotChange}"></slot>
              </div>
            `
          : html`<slot
              name="description"
              @slotchange="${this._handleSlotChange}"></slot>`}

        <!-- Extra children -->
        ${this._hasExtraContent
          ? html`
              <div class="${blockClass}__header-content--extra">
                <slot @slotchange="${this._handleSlotChange}"></slot>
              </div>
            `
          : html`<slot @slotchange="${this._handleSlotChange}"></slot>`}
      </div>
    `;

    // DOM order drives tab order:
    //   Desktop/Wide: header-actions → decorator → close-button → header-content
    //   Mobile/Narrow: decorator → close-button → header-content → header-actions
    //
    // On mobile the decorator and close button are position:absolute (top-right corner),
    // so they are visually first. Placing them first in DOM order aligns tab order with
    // visual order: AI label → close button → content → header-actions.
    return this._isMobileOrNarrow
      ? html`${decoratorTemplate} ${closeButtonTemplate}
        ${headerContentTemplate} ${headerActionsTemplate}`
      : html`${headerActionsTemplate} ${decoratorTemplate}
        ${closeButtonTemplate} ${headerContentTemplate}`;
  }

  /** Reference to the parent cds-tearsheet, stored for listener cleanup. */
  private _parentTearsheet: Element | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    let el: Element | null = this.parentElement;
    while (el) {
      if (el.tagName.toLowerCase() === `${prefix}-tearsheet`) {
        this._parentTearsheet = el;
        break;
      }
      el = el.parentElement;
    }
    this._parentTearsheet?.addEventListener(
      `${prefix}-tearsheet-opened`,
      this._handleTearsheetOpened as EventListener
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._parentTearsheet?.removeEventListener(
      `${prefix}-tearsheet-opened`,
      this._handleTearsheetOpened as EventListener
    );
    this._parentTearsheet = null;
    if (this._focusTimer !== null) {
      clearTimeout(this._focusTimer);
      this._focusTimer = null;
    }
  }

  static styles = styles;
}
export default CDSTearsheetHeaderContent;
