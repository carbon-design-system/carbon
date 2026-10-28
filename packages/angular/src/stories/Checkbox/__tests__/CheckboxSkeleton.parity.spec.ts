/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/checkbox/__tests__/checkbox-skeleton-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 *
 * The WC test is a single snapshot test. The snapshot is replaced by the
 * assertion the title implies: the element renders its skeleton markup.
 */

import { CheckboxSkeletonComponent } from '../../../generated/CheckboxSkeleton';
import { render } from '../../../testing/render';

describe('cds-ng-checkbox-skeleton', () => {
  it('should render', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox-skeleton></cds-ng-checkbox-skeleton>`,
      [CheckboxSkeletonComponent]
    );
    const el = fixture.nativeElement.querySelector(
      'cds-ng-checkbox-skeleton'
    ) as HTMLElement & { shadowRoot: ShadowRoot };
    expect(el).toBeTruthy();
    expect(el.shadowRoot.querySelector('.cds-ng--checkbox-label')).toBeTruthy();
  });
});
