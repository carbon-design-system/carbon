/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 1 — Angular unit tests for ActionSetComponent.
 *
 * Architecture (ADR 0015, ADR 0020): the host element IS the cds-ng-action-set
 * web component. Every @Input() is forwarded to the host element as a property
 * via ngOnChanges.
 *
 * ActionSet has no @Output() events and no CVA.
 * Rendered shadow-DOM assertions live in `ActionSet.parity.spec.ts`.
 * Slot ordering and stacking layout are verified in `ActionSet.e2e.ts`.
 */

import { ButtonComponent } from '@carbon/angular/button';
import { ActionSetComponent } from '@carbon/angular/action-set';
import { render } from '../../../testing/render';

const imports = [ActionSetComponent, ButtonComponent];

const host = (el: HTMLElement) =>
  el.querySelector('cds-ng-action-set') as HTMLElement & Record<string, any>;

describe('ActionSetComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(
      `<cds-ng-action-set></cds-ng-action-set>`,
      imports
    );
    expect(host(fixture.nativeElement)).toBeTruthy();
  });

  it('host element is the web component itself', async () => {
    const { fixture } = await render(
      `<cds-ng-action-set></cds-ng-action-set>`,
      imports
    );
    expect(host(fixture.nativeElement)).not.toBeNull();
  });

  // ─── size ─────────────────────────────────────────────────────────────────

  (['sm', 'md', 'lg', 'xl', '2xl'] as const).forEach((size) => {
    it(`should forward [size]="${size}" as a property`, async () => {
      const { fixture } = await render(
        `<cds-ng-action-set size="${size}"></cds-ng-action-set>`,
        imports
      );
      expect(host(fixture.nativeElement).size).toBe(size);
    });
  });

  // ─── disableStacking ──────────────────────────────────────────────────────

  it('should default [disableStacking] to false', async () => {
    const { fixture } = await render(
      `<cds-ng-action-set></cds-ng-action-set>`,
      imports
    );
    expect(host(fixture.nativeElement).disableStacking).toBe(false);
  });

  it('should forward [disableStacking]=true as a property', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-action-set [disableStacking]="disableStacking"></cds-ng-action-set>`,
      imports,
      { disableStacking: false }
    );
    expect(host(fixture.nativeElement).disableStacking).toBe(false);

    h.disableStacking = true;
    await update();
    expect(host(fixture.nativeElement).disableStacking).toBe(true);
  });

  // ─── buttonSize ───────────────────────────────────────────────────────────

  it('should forward [buttonSize] as a property', async () => {
    const { fixture } = await render(
      `<cds-ng-action-set buttonSize="sm"></cds-ng-action-set>`,
      imports
    );
    expect(host(fixture.nativeElement).buttonSize).toBe('sm');
  });

  // ─── actions (array input) ────────────────────────────────────────────────

  it('should forward [actions] array as a property', async () => {
    const actions = [{ label: 'Cancel', kind: 'secondary' }];
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-action-set [actions]="actions"></cds-ng-action-set>`,
      imports,
      { actions }
    );
    expect(host(fixture.nativeElement).actions).toBe(actions);

    const newActions = [
      { label: 'Back', kind: 'secondary' },
      { label: 'Submit', kind: 'primary' },
    ];
    h.actions = newActions;
    await update();
    expect(host(fixture.nativeElement).actions).toBe(newActions);
  });
});
