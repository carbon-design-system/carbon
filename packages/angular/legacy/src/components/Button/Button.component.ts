/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import CDSButton from '@carbon/web-components/es/components/button/button.js';
import CDSButtonSet from '@carbon/web-components/es/components/button/button-set.js';
import CDSButtonSkeleton from '@carbon/web-components/es/components/button/button-skeleton.js';
import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';

defineCustomElement(CDSButton, { name: 'cds-ng-button' });
defineCustomElement(CDSButtonSet, { name: 'cds-ng-button-set' });
defineCustomElement(CDSButtonSkeleton, { name: 'cds-ng-button-skeleton' });

/**
 * Legacy Angular wrapper for the Carbon `cds-button` Web Component.
 *
 * @deprecated Legacy wrapper provided for backward compatibility with `carbon-components-angular`.
 * For new development and modernized features, import from `@carbon/angular` directly:
 * ```ts
 * import { ButtonComponent } from '@carbon/angular';
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
      [isExpressive]="isExpressive"
      [isSelected]="isSelected"
      [attr.kind]="kind"
      [attr.link-role]="linkRole"
      [openTooltip]="openTooltip"
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
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
   * Size variant. Defaults to `"lg"`.
   */
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'lg';

  /** `tabindex` attribute. */
  @Input() tabIndex: number | undefined;

  /** `target` attribute for link buttons. */
  @Input() target: string | undefined;

  /**
   * Tooltip alignment for icon-only buttons.
   */
  @Input() tooltipAlignment: 'left' | '' | 'right' = '';

  /**
   * Tooltip position for icon-only buttons.
   */
  @Input() tooltipPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';

  /**
   * Tooltip text for icon-only buttons (also used as `aria-label`).
   */
  @Input() tooltipText: string | undefined;

  /**
   * Native button `type` attribute.
   */
  @Input() type: 'button' | 'reset' | 'submit' = 'button';

  /** Emitted when the button or inner `<a>` is clicked. */
  @Output() readonly buttonClick = new EventEmitter<MouseEvent>();
}
