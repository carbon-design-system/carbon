/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewEncapsulation,
} from '@angular/core';
// CUSTOM_ELEMENTS_SCHEMA is used by CDSAngularButtonModule below.
import CDSButton from '@carbon/web-components/es/components/button/button.js';
import CDSButtonSet from '@carbon/web-components/es/components/button/button-set.js';
import CDSButtonSkeleton from '@carbon/web-components/es/components/button/button-skeleton.js';
import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';

// Register backing WC elements under namespaced tags so the Angular selector
// `cds-button` never matches the internal `cds-ng-button` element.
defineCustomElement(CDSButton, { name: 'cds-ng-button' });
defineCustomElement(CDSButtonSet, { name: 'cds-ng-button-set' });
defineCustomElement(CDSButtonSkeleton, { name: 'cds-ng-button-skeleton' });

/**
 * Angular wrapper for the Carbon `cds-button` Web Component.
 *
 * Consumer-facing selector : `cds-button`
 * Internal WC tag          : `cds-ng-button`  (registered above)
 *
 * @example
 * ```html
 * <cds-button kind="primary" (buttonClick)="onClick($event)">Click me</cds-button>
 * ```
 */
@Component({
  selector: 'cds-button',
  template: `
    <cds-ng-button
      [attr.autofocus]="autofocus || null"
      [attr.batch-action]="batchAction || null"
      [attr.danger-description]="dangerDescription"
      [attr.disabled]="disabled || null"
      [attr.download]="download"
      [attr.href]="href"
      [attr.hreflang]="hreflang"
      [attr.is-expressive]="isExpressive || null"
      [attr.is-selected]="isSelected || null"
      [attr.kind]="kind"
      [attr.link-role]="linkRole"
      [attr.open-tooltip]="openTooltip || null"
      [attr.ping]="ping"
      [attr.rel]="rel"
      [attr.size]="size"
      [attr.tab-index]="tabIndex"
      [attr.target]="target"
      [attr.tooltip-alignment]="tooltipAlignment"
      [attr.tooltip-position]="tooltipPosition"
      [attr.tooltip-text]="tooltipText"
      [attr.type]="type"
      (click)="buttonClick.emit($event)"
      ><ng-content
    /></cds-ng-button>
  `,
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class ButtonComponent {
  /** Mirrors the native `autofocus` attribute. */
  @Input() autofocus = false;

  /** Whether this button is part of a batch-action toolbar. */
  @Input() batchAction = false;

  /**
   * Assistive text for the danger icon in danger-kind buttons.
   * Defaults to the WC built-in ("Dangerous action").
   */
  @Input() dangerDescription: string | undefined;

  /** Disables the button. */
  @Input() disabled = false;

  /** Value for the `download` attribute (link buttons only). */
  @Input() download: string | undefined;

  /** Turns the button into an `<a>` element with this `href`. */
  @Input() href: string | undefined;

  /** `hreflang` attribute for link buttons. */
  @Input() hreflang: string | undefined;

  /**
   * Renders the button at expressive size (48 px).
   * Corresponds to the WC `is-expressive` attribute.
   */
  @Input() isExpressive = false;

  /** Toggle selection state (used inside toolbars). */
  @Input() isSelected = false;

  /**
   * Visual variant.
   * @see BUTTON_KIND
   */
  @Input() kind:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'ghost'
    | 'danger'
    | 'danger-primary'
    | 'danger-tertiary'
    | 'danger-ghost' = 'primary';

  /** ARIA role for link buttons (defaults to `"link"`). */
  @Input() linkRole: string | undefined;

  /** Forces the tooltip open (icon-only buttons). */
  @Input() openTooltip = false;

  /** `ping` attribute for link buttons. */
  @Input() ping: string | undefined;

  /** `rel` attribute for link buttons. */
  @Input() rel: string | undefined;

  /**
   * Size variant.
   * One of: `"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"` | `"2xl"`.
   */
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';

  /** `tabindex` attribute. */
  @Input() tabIndex: number | undefined;

  /** `target` attribute for link buttons. */
  @Input() target: string | undefined;

  /**
   * Tooltip alignment for icon-only buttons.
   * One of: `"left"` | `""` (center) | `"right"`.
   */
  @Input() tooltipAlignment: 'left' | '' | 'right' = '';

  /**
   * Tooltip position for icon-only buttons.
   * One of: `"top"` | `"right"` | `"bottom"` | `"left"`.
   */
  @Input() tooltipPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';

  /**
   * Tooltip text for icon-only buttons (also used as `aria-label`).
   */
  @Input() tooltipText: string | undefined;

  /**
   * Native button `type` attribute.
   * One of: `"button"` | `"reset"` | `"submit"`.
   */
  @Input() type: 'button' | 'reset' | 'submit' = 'button';

  /** Emitted when the button or inner `<a>` is clicked. */
  @Output() readonly buttonClick = new EventEmitter<MouseEvent>();
}

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CDSAngularButtonModule {}
