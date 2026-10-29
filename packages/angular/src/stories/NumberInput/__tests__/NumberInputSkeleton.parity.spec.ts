/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/number-input/__tests__/number-input-skeleton-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 */

import { NumberInputSkeletonComponent } from '../../../generated/NumberInputSkeleton';
import { render } from '../../../testing/render';

const imports = [NumberInputSkeletonComponent];

describe('cds-ng-number-input-skeleton (parity with number-input-skeleton-test.js)', () => {
  it('should place custom class on host', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input-skeleton class="custom-class"></cds-ng-number-input-skeleton>`,
      imports
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-number-input-skeleton'
    ) as HTMLElement;
    expect(host.classList.contains('custom-class')).toBe(true);
  });

  it('should render skeleton component', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input-skeleton></cds-ng-number-input-skeleton>`,
      imports
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-number-input-skeleton'
    );
    expect(host).toBeTruthy();
  });

  it('should render label skeleton by default', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input-skeleton></cds-ng-number-input-skeleton>`,
      imports
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-number-input-skeleton'
    ) as HTMLElement & {
      shadowRoot: ShadowRoot;
    };
    const label = host.shadowRoot.querySelector(
      '.cds-ng--label.cds-ng--skeleton, .cds--label.cds--skeleton'
    );
    expect(label).toBeTruthy();
  });

  it('should hide label when hide-label is set', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input-skeleton [hideLabel]="true"></cds-ng-number-input-skeleton>`,
      imports
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-number-input-skeleton'
    ) as HTMLElement & {
      shadowRoot: ShadowRoot;
    };
    const label = host.shadowRoot.querySelector(
      '.cds-ng--label.cds-ng--skeleton, .cds--label.cds--skeleton'
    );
    expect(label).toBeNull();
  });

  it('should render input skeleton', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input-skeleton></cds-ng-number-input-skeleton>`,
      imports
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-number-input-skeleton'
    ) as HTMLElement & {
      shadowRoot: ShadowRoot;
    };
    const inputSkeleton = host.shadowRoot.querySelector(
      '.cds-ng--number.cds-ng--skeleton, .cds--number.cds--skeleton'
    );
    expect(inputSkeleton).toBeTruthy();
  });

  it('should render without a size class by default', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input-skeleton></cds-ng-number-input-skeleton>`,
      imports
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-number-input-skeleton'
    ) as HTMLElement & {
      shadowRoot: ShadowRoot;
    };
    const numberSkeleton = host.shadowRoot.querySelector(
      '.cds-ng--number, .cds--number'
    );
    const classes = numberSkeleton ? Array.from(numberSkeleton.classList) : [];
    expect(
      classes.some(
        (name) =>
          name.startsWith('cds-ng--number--') ||
          name.startsWith('cds--number--') ||
          name.startsWith('cds-ng--layout--size-') ||
          name.startsWith('cds--layout--size-')
      )
    ).toBe(false);
  });

  it('should render with xs size class when size is xs', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input-skeleton size="xs"></cds-ng-number-input-skeleton>`,
      imports
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-number-input-skeleton'
    ) as HTMLElement & {
      shadowRoot: ShadowRoot;
    };
    const numberSkeleton = host.shadowRoot.querySelector(
      '.cds-ng--number, .cds--number'
    );
    expect(
      numberSkeleton?.classList.contains('cds-ng--number--xs') ||
        numberSkeleton?.classList.contains('cds--number--xs')
    ).toBe(true);
    expect(
      numberSkeleton?.classList.contains('cds-ng--layout--size-xs') ||
        numberSkeleton?.classList.contains('cds--layout--size-xs')
    ).toBe(true);
  });

  it('should render with lg size class when size is lg', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input-skeleton size="lg"></cds-ng-number-input-skeleton>`,
      imports
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-number-input-skeleton'
    ) as HTMLElement & {
      shadowRoot: ShadowRoot;
    };
    const numberSkeleton = host.shadowRoot.querySelector(
      '.cds-ng--number, .cds--number'
    );
    expect(
      numberSkeleton?.classList.contains('cds-ng--number--lg') ||
        numberSkeleton?.classList.contains('cds--number--lg')
    ).toBe(true);
    expect(
      numberSkeleton?.classList.contains('cds-ng--layout--size-lg') ||
        numberSkeleton?.classList.contains('cds--layout--size-lg')
    ).toBe(true);
  });

  it('should update size dynamically', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-number-input-skeleton [size]="size"></cds-ng-number-input-skeleton>`,
      imports,
      { size: 'sm' }
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-number-input-skeleton'
    ) as HTMLElement & {
      getAttribute(name: string): string | null;
      updateComplete: Promise<void>;
    };
    await host.updateComplete;
    expect(host.getAttribute('size')).toBe('sm');

    h.size = 'lg';
    await update();
    await host.updateComplete;
    expect(host.getAttribute('size')).toBe('lg');
  });

  it('should toggle hide-label dynamically', async () => {
    const {
      fixture,
      host: h,
      update,
    } = await render(
      `<cds-ng-number-input-skeleton [hideLabel]="hideLabel"></cds-ng-number-input-skeleton>`,
      imports,
      { hideLabel: false }
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-number-input-skeleton'
    ) as HTMLElement & {
      shadowRoot: ShadowRoot;
      updateComplete: Promise<void>;
    };
    await host.updateComplete;

    let label = host.shadowRoot.querySelector(
      '.cds-ng--label.cds-ng--skeleton, .cds--label.cds--skeleton'
    );
    expect(label).toBeTruthy();

    h.hideLabel = true;
    await update();
    await host.updateComplete;

    label = host.shadowRoot.querySelector(
      '.cds-ng--label.cds-ng--skeleton, .cds--label.cds--skeleton'
    );
    expect(label).toBeNull();
  });
});
