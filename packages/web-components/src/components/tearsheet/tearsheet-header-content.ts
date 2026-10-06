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
import {
  registerFocusableContainers,
  unregisterFocusableContainers,
} from '../../utilities/manageFocusTrap/manageFocusTrap';
import {
  tearsheetContext,
  defaultTearsheetState,
  type TearsheetContextValue,
} from './tearsheet-context';
import CDSTearsheetHeader from './tearsheet-header';
import { consume } from '@lit/context';
import Close20 from '@carbon/icons/es/close/20.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import { prefix as carbonPrefix } from '../../globals/settings';

const blockClass = `${prefix}--tearsheet`;

/** Minimal interface used to read the protected uniqueId from CDSTearsheet
 *  without importing the class (avoids circular dep). */
interface CDSTearsheetHost extends HTMLElement {
  readonly uniqueId: string;
}

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
class CDSTearsheetHeaderContent extends HostListenerMixin(LitElement) {
  @property({ reflect: true })
  slot = 'header-content';

  @property({ reflect: true })
  title: string = '';

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

  @state() private _hasTitleStart = false;
  @state() private _hasTitleEnd = false;
  @state() private _hasDecorator = false;
  @state() private _hasAILabel = false;
  @state() private _hasLabel = false;
  @state() private _hasDescription = false;
  @state() private _hasHeaderActions = false;
  @state() private _hasExtraContent = false;
  @state() private _isMobileOrNarrow = false;

  // Use the `sm` breakpoint (≤320 px) — this matches the tearsheet's narrow
  // layout breakpoint at which the close button moves above the header-actions
  // in the DOM. The previous `md` value (≤672 px) was too wide and caused the
  // wrong container-registration order (and therefore wrong Tab order) on
  // normal tablet viewports that are not actually narrow-layout.
  private smMediaQuery = `(max-width: ${breakpoints.sm.width})`;
  private isMobileDevice = new MatchMediaController(
    this,
    this.smMediaQuery,
    false
  );

  @consume({ context: tearsheetContext, subscribe: true })
  private _tearsheetCtx?: TearsheetContextValue;

  private get isNarrowVariant(): boolean {
    return (
      (this._tearsheetCtx?.state ?? defaultTearsheetState).variant === 'narrow'
    );
  }

  protected override firstUpdated(): void {
    this._checkSlots();
    this._isMobileOrNarrow =
      this.isMobileDevice?.matches || this.isNarrowVariant;

    this._registerContainers();
  }

  /**
   * Registers focusable containers for the focus trap in the correct order for
   * the current layout. Container registration order maps directly to the order
   * `getAllFocusableElements` collects elements, so it must match the flattened
   * DOM tab order:
   *
   * - Desktop/Wide:  light DOM first (header-actions), then shadow root (close btn)
   * - Mobile/Narrow: shadow root first (close btn), then light DOM (header-actions)
  
   * Call this method whenever the layout changes so that re-registration puts
   * the containers back in the correct order.
   */
  private _registerContainers(): void {
    const uniqueId = this._uniqueId;
    if (!uniqueId) return;

    // Clear existing registrations so we can re-register in the correct order.
    unregisterFocusableContainers(this, uniqueId);
    unregisterFocusableContainers(this.shadowRoot, uniqueId);

    if (this._isMobileOrNarrow) {
      // Mobile/narrow: shadow DOM (close button) tabs before slotted header-actions
      registerFocusableContainers(this.shadowRoot, uniqueId);
      registerFocusableContainers(this, uniqueId);
    } else {
      // Desktop/wide: slotted header-actions tab before close button
      registerFocusableContainers(this, uniqueId);
      registerFocusableContainers(this.shadowRoot, uniqueId);
    }
  }

  /** Cached uniqueId of the parent cds-tearsheet. Resolved once in
   *  connectedCallback so we avoid repeated DOM traversal on every update. */
  private _uniqueId: string = '';

  protected override updated(): void {
    const previousIsMobileOrNarrow = this._isMobileOrNarrow;
    this._isMobileOrNarrow =
      this.isMobileDevice?.matches || this.isNarrowVariant;

    if (this._isMobileOrNarrow !== previousIsMobileOrNarrow) {
      // Re-register containers in the correct order for the new layout.
      this._registerContainers();
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
   */
  getFirstFocusable(): HTMLElement | null {
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

    const closeBtn = this.shadowRoot?.querySelector<HTMLElement>(
      `.${blockClass}__close-button ${carbonPrefix}-icon-button:not([disabled])`
    );

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
   * Scoped per-instance (non-bubbling) so only this header-content reacts to
   * its own tearsheet opening.
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
        const match =
          this.closest(`${prefix}-tearsheet`)?.querySelector<HTMLElement>(
            selectorPrimaryFocus
          ) ?? null;
        focusTarget =
          match?.shadowRoot?.querySelector<HTMLElement>(
            'button:not([disabled]), input:not([disabled]):not([type="hidden"])'
          ) ?? match;
      }

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
   * the tab order and AT tree.
   */
  private _updateInertState(): void {
    const { fullyCollapsed } =
      this._tearsheetCtx?.state ?? defaultTearsheetState;

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
      this._hasTitleStart = this._titleStartSlot.assignedElements().length > 0;
    }
    if (this._titleEndSlot) {
      this._hasTitleEnd = this._titleEndSlot.assignedElements().length > 0;
    }
    if (this._labelSlot) {
      this._hasLabel = this._labelSlot.assignedElements().length > 0;
    }
    if (this._descriptionSlot) {
      this._hasDescription =
        this._descriptionSlot.assignedElements().length > 0;
    }
    if (this._headerActionsSlot) {
      this._hasHeaderActions =
        this._headerActionsSlot.assignedElements().length > 0;
    }
    if (this._defaultSlot) {
      this._hasExtraContent = this._defaultSlot.assignedElements().length > 0;
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
      const { fullyCollapsed } =
        this._tearsheetCtx?.state ?? defaultTearsheetState;
      childItems[0].setAttribute('size', fullyCollapsed ? 'xs' : 'sm');

      this._tearsheetCtx?.setState({
        hasDecorator: true,
        hasAILabel: this._hasAILabel,
      });

      let ancestor = this.parentElement;
      while (ancestor && !(ancestor instanceof CDSTearsheetHeader)) {
        ancestor = ancestor.parentElement;
      }
      if (ancestor instanceof CDSTearsheetHeader) {
        ancestor.setAttribute(this._hasAILabel ? 'ai-label' : 'decorator', '');
        ancestor.removeAttribute(this._hasAILabel ? 'decorator' : 'ai-label');
      }
    } else {
      this._tearsheetCtx?.setState({
        hasDecorator: false,
        hasAILabel: false,
      });

      let ancestor = this.parentElement;
      while (ancestor && !(ancestor instanceof CDSTearsheetHeader)) {
        ancestor = ancestor.parentElement;
      }
      if (ancestor instanceof CDSTearsheetHeader) {
        ancestor.removeAttribute('decorator');
        ancestor.removeAttribute('ai-label');
      }
    }
    this._updateHeaderOffset();
  }

  private _updateDecoratorSize() {
    const { fullyCollapsed } =
      this._tearsheetCtx?.state ?? defaultTearsheetState;
    const assigned = this._decoratorSlot?.assignedElements({ flatten: true });
    if (assigned?.length) {
      assigned[0].setAttribute('size', fullyCollapsed ? 'xs' : 'sm');
    }
  }

  private _updateHeaderOffset() {
    const { open, isSm } = this._tearsheetCtx?.state ?? defaultTearsheetState;
    if (!open) return;
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
      this._tearsheetCtx?.state ?? defaultTearsheetState;

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

            <cds-truncated-text
              class="${blockClass}__content__title"
              id="${blockClass}__header-title__truncatedText"
              value="${this.title}"
              lines="${fullyCollapsed ? 1 : 2}"></cds-truncated-text>

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

    // Cache the uniqueId once to avoid repeated closest() + cast on every update.
    const host = this.closest<HTMLElement & CDSTearsheetHost>(
      `${prefix}-tearsheet`
    );
    this._uniqueId = host?.uniqueId ?? '';
    this._parentTearsheet = host ?? null;

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
