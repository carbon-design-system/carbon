/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 1 — Angular unit tests for ButtonComponent.
 *
 * These tests mirror the scenarios covered by the Web Components test suite
 * (`packages/web-components/src/components/button/__tests__/button-test.js`)
 * and serve as the TDD contract for the Angular wrapper layer.
 *
 * Because jsdom does not implement shadow DOM or the custom-element lifecycle,
 * the WC classes are stubbed (see `src/__mocks__`). Tests assert that every
 * `@Input()` binding is forwarded as the correct HTML attribute on the
 * `cds-ng-button` host element — i.e. the Angular ↔ WC interface is sound.
 *
 * Shadow-DOM rendering, class names applied by the WC, and real browser
 * interaction are verified at Layer 2 (Playwright / Button.e2e.ts) where the
 * full WC lifecycle runs in a real browser against built Storybook stories.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../Button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  /** Returns the inner `cds-ng-button` element rendered by the Angular wrapper. */
  const wc = () =>
    fixture.nativeElement.querySelector('cds-ng-button') as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ─── Selector isolation ────────────────────────────────────────────────────
  // Mirrors: WC test "should render an element with the button role"

  it('consumer selector (cds-button) must differ from internal WC tag (cds-ng-button)', () => {
    // Ensures no recursive matching: the Angular component renders a
    // `cds-ng-button`, not a `cds-button`, so Angular never recursively
    // instantiates ButtonComponent inside its own template.
    expect(wc()).not.toBeNull();
    const recursiveAngular = fixture.nativeElement.querySelector('cds-button');
    expect(recursiveAngular).toBeNull();
  });

  // ─── tabIndex ─────────────────────────────────────────────────────────────
  // Mirrors: WC "should support a custom tabIndex through props"

  it('should reflect [tabIndex] as "tab-index" attribute on the wc element', () => {
    component.tabIndex = -1;
    fixture.detectChanges();
    expect(wc().getAttribute('tab-index')).toBe('-1');
  });

  // ─── disabled ─────────────────────────────────────────────────────────────
  // Mirrors: WC "should use the disabled prop to set disabled on the <button>"

  it('should reflect [disabled] to the cds-ng-button element', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(wc().getAttribute('disabled')).not.toBeNull();
  });

  it('should omit the "disabled" attribute when disabled is false', () => {
    component.disabled = false;
    fixture.detectChanges();
    expect(wc().getAttribute('disabled')).toBeNull();
  });

  // ─── type ─────────────────────────────────────────────────────────────────
  // Mirrors: WC "should render with a default button type of button"
  //          WC "should support changing the button type to ${type}"

  it('should default [type] to "button"', () => {
    expect(wc().getAttribute('type')).toBe('button');
  });

  const buttonTypes = ['button', 'submit', 'reset'] as const;
  buttonTypes.forEach((type) => {
    it(`should reflect [type]="${type}" to the wc element`, () => {
      component.type = type;
      fixture.detectChanges();
      expect(wc().getAttribute('type')).toBe(type);
    });
  });

  // ─── href / link variant ───────────────────────────────────────────────────
  // Mirrors: WC "should render as an element with the role of `link` when the
  //          `href` prop is used"

  it('should reflect [href] to the cds-ng-button element', () => {
    component.href = 'https://example.com';
    fixture.detectChanges();
    expect(wc().getAttribute('href')).toBe('https://example.com');
  });

  // ─── kind ─────────────────────────────────────────────────────────────────
  // Mirrors: WC kind-matrix tests

  it('should default [kind] to "primary"', () => {
    expect(wc().getAttribute('kind')).toBe('primary');
  });

  const kinds = [
    'primary',
    'secondary',
    'ghost',
    'danger',
    'danger-primary',
    'danger-ghost',
    'danger-tertiary',
    'tertiary',
  ] as const;

  kinds.forEach((kind) => {
    it(`should reflect [kind]="${kind}" to the wc element`, () => {
      component.kind = kind;
      fixture.detectChanges();
      expect(wc().getAttribute('kind')).toBe(kind);
    });
  });

  // ─── dangerDescription ────────────────────────────────────────────────────
  // Mirrors: WC "does not render default danger assistive text when none is
  //          provided" / "renders custom danger assistive text when provided"

  it('should omit "danger-description" when dangerDescription is not set', () => {
    // default: undefined → attr omitted
    expect(wc().getAttribute('danger-description')).toBeNull();
  });

  it('should reflect [dangerDescription] as "danger-description" attribute', () => {
    component.dangerDescription = 'Gefahr';
    fixture.detectChanges();
    expect(wc().getAttribute('danger-description')).toBe('Gefahr');
  });

  // ─── size ─────────────────────────────────────────────────────────────────
  // Mirrors: WC "supports props.size" describe block

  it('should default [size] to "lg" (matches @carbon/react and the WC)', () => {
    expect(wc().getAttribute('size')).toBe('lg');
  });

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

  sizes.forEach((size) => {
    it(`should reflect [size]="${size}" to the wc element`, () => {
      component.size = size;
      fixture.detectChanges();
      expect(wc().getAttribute('size')).toBe(size);
    });
  });

  // ─── isExpressive / isSelected / openTooltip ──────────────────────────────
  // The WC declares these without an explicit `attribute:` name, so Lit only
  // observes the lowercased attribute (`isexpressive`, …). The wrapper must
  // therefore bind them as *properties*; a kebab-case attribute is ignored by
  // the real element. These tests assert the property is set and that no
  // ineffective kebab-case attribute is emitted.

  const wcProps = () =>
    wc() as HTMLElement & {
      isExpressive?: boolean;
      isSelected?: boolean;
      openTooltip?: boolean;
    };

  it('should bind [isExpressive] as a property on the wc element', () => {
    component.isExpressive = true;
    fixture.detectChanges();
    expect(wcProps().isExpressive).toBe(true);
    expect(wc().hasAttribute('is-expressive')).toBe(false);

    component.isExpressive = false;
    fixture.detectChanges();
    expect(wcProps().isExpressive).toBe(false);
  });

  // Mirrors: WC "should set aria-pressed on a selected ghost icon button"
  it('should bind [isSelected] as a property on the wc element', () => {
    component.isSelected = true;
    fixture.detectChanges();
    expect(wcProps().isSelected).toBe(true);
    expect(wc().hasAttribute('is-selected')).toBe(false);

    component.isSelected = false;
    fixture.detectChanges();
    expect(wcProps().isSelected).toBe(false);
  });

  // ─── tooltip ──────────────────────────────────────────────────────────────
  // Mirrors: WC tooltip-popover and tooltip-alignment describe blocks
  // Note: "should not error on tooltipAlignment even when hasIconOnly=false"

  it('should reflect [tooltipText] as "tooltip-text" attribute', () => {
    component.tooltipText = 'Add item';
    fixture.detectChanges();
    expect(wc().getAttribute('tooltip-text')).toBe('Add item');
  });

  const tooltipPositions = ['top', 'right', 'bottom', 'left'] as const;
  tooltipPositions.forEach((position) => {
    it(`should reflect [tooltipPosition]="${position}" as "tooltip-position" attribute`, () => {
      component.tooltipPosition = position;
      fixture.detectChanges();
      expect(wc().getAttribute('tooltip-position')).toBe(position);
    });
  });

  const tooltipAlignments = ['left', '', 'right'] as const;
  tooltipAlignments.forEach((alignment) => {
    it(`should reflect [tooltipAlignment]="${alignment || '(center)'}" as "tooltip-alignment" attribute`, () => {
      component.tooltipAlignment = alignment;
      fixture.detectChanges();
      // When alignment is '' the attr value is '' (empty string), not null.
      expect(wc().getAttribute('tooltip-alignment')).toBe(alignment);
    });
  });

  // Mirrors: WC "should not error on tooltipAlignment even when hasIconOnly=false"
  it('should accept [tooltipAlignment] regardless of hasIconOnly', () => {
    component.tooltipAlignment = 'left';
    fixture.detectChanges();
    expect(wc().getAttribute('tooltip-alignment')).toBe('left');
  });

  // ─── openTooltip ──────────────────────────────────────────────────────────

  it('should bind [openTooltip] as a property on the wc element', () => {
    component.openTooltip = true;
    fixture.detectChanges();
    expect(wcProps().openTooltip).toBe(true);
    expect(wc().hasAttribute('open-tooltip')).toBe(false);

    component.openTooltip = false;
    fixture.detectChanges();
    expect(wcProps().openTooltip).toBe(false);
  });

  // ─── batchAction ──────────────────────────────────────────────────────────

  it('should reflect [batchAction] as "batch-action" attribute when true', () => {
    component.batchAction = true;
    fixture.detectChanges();
    expect(wc().getAttribute('batch-action')).not.toBeNull();
  });

  it('should omit "batch-action" attribute when batchAction is false', () => {
    component.batchAction = false;
    fixture.detectChanges();
    expect(wc().getAttribute('batch-action')).toBeNull();
  });

  // ─── link-only attrs (download, hreflang, ping, rel, target, linkRole) ────

  it('should reflect [download] attribute', () => {
    component.download = 'file.pdf';
    fixture.detectChanges();
    expect(wc().getAttribute('download')).toBe('file.pdf');
  });

  it('should reflect [hreflang] attribute', () => {
    component.hreflang = 'en';
    fixture.detectChanges();
    expect(wc().getAttribute('hreflang')).toBe('en');
  });

  it('should reflect [ping] attribute', () => {
    component.ping = 'https://example.com/ping';
    fixture.detectChanges();
    expect(wc().getAttribute('ping')).toBe('https://example.com/ping');
  });

  it('should reflect [rel] attribute', () => {
    component.rel = 'noopener noreferrer';
    fixture.detectChanges();
    expect(wc().getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should reflect [target] attribute', () => {
    component.target = '_blank';
    fixture.detectChanges();
    expect(wc().getAttribute('target')).toBe('_blank');
  });

  it('should reflect [linkRole] as "link-role" attribute', () => {
    component.linkRole = 'link';
    fixture.detectChanges();
    expect(wc().getAttribute('link-role')).toBe('link');
  });

  // ─── @Output() emission ────────────────────────────────────────────────────

  it('should emit (buttonClick) when the wc-button is clicked', () => {
    const spy = jest.fn();
    component.buttonClick.subscribe(spy);

    (wc() as HTMLElement).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should NOT emit (buttonClick) before a click occurs', () => {
    const spy = jest.fn();
    component.buttonClick.subscribe(spy);
    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should wire [disabled] attr even though click suppression is owned by the WC', () => {
    // The WC is responsible for preventing clicks when disabled.
    // At the Angular layer we assert that the attribute is forwarded correctly.
    const spy = jest.fn();
    component.disabled = true;
    component.buttonClick.subscribe(spy);
    fixture.detectChanges();

    expect(wc().getAttribute('disabled')).not.toBeNull();
    // No synthetic click is fired here — that guard belongs to the WC (Layer 2).
    expect(spy).not.toHaveBeenCalled();
  });
});
