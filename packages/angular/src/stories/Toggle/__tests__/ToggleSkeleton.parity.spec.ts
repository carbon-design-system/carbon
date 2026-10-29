/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/toggle/__tests__/toggle-skeleton-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 */

import { ToggleSkeletonComponent } from '../../../generated/ToggleSkeleton';
import { render } from '../../../testing/render';

const imports = [ToggleSkeletonComponent];

describe('cds-ng-toggle-skeleton (parity with web-components toggle-skeleton-test.js)', () => {
  it('should support a custom class on the host', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle-skeleton class="custom-class"></cds-ng-toggle-skeleton>`,
      imports
    );
    const el = fixture.nativeElement.querySelector('cds-ng-toggle-skeleton');
    expect(el?.classList.contains('custom-class')).toBe(true);
  });

  it('should spread additional attributes on the host element', async () => {
    const { fixture } = await render(
      `<cds-ng-toggle-skeleton data-testid="skeleton"></cds-ng-toggle-skeleton>`,
      imports
    );
    const el = fixture.nativeElement.querySelector('cds-ng-toggle-skeleton');
    expect(el?.getAttribute('data-testid')).toBe('skeleton');
  });
});
