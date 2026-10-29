/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/tag/__tests__/tag-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 */

import { TagComponent } from '../../../generated/Tag';
import { DismissibleTagComponent } from '../../../generated/DismissibleTag';
import { SelectableTagComponent } from '../../../generated/SelectableTag';
import { OperationalTagComponent } from '../../../generated/OperationalTag';
import { TagSkeletonComponent } from '../../../generated/TagSkeleton';
import { AiLabelComponent } from '../../../generated/AiLabel';
import { render } from '../../../testing/render';

const imports = [
  TagComponent,
  DismissibleTagComponent,
  SelectableTagComponent,
  OperationalTagComponent,
  TagSkeletonComponent,
  AiLabelComponent,
];

describe('cds-ng-tag (parity with web-components tag-test.js)', () => {
  it('should render', async () => {
    const { fixture } = await render(
      `<cds-ng-tag type="red">test-tag</cds-ng-tag>`,
      imports
    );
    expect(fixture.nativeElement.querySelector('cds-ng-tag')).toBeTruthy();
  });

  describe('automated accessibility testing', () => {
    it.todo('should have no Axe violations');
  });

  describe('cds-dismissible-tag', () => {
    it('should render', async () => {
      const { fixture } = await render(
        `<cds-ng-dismissible-tag tagTitle="Close tag" text="Tag content"></cds-ng-dismissible-tag>`,
        imports
      );
      expect(
        fixture.nativeElement.querySelector('cds-ng-dismissible-tag')
      ).toBeTruthy();
    });

    it('does not render a dismiss tooltip when disabled', async () => {
      const { fixture } = await render(
        `<cds-ng-dismissible-tag [disabled]="true" text="Tag content"></cds-ng-dismissible-tag>`,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-dismissible-tag'
      ) as any;
      await el.updateComplete;

      expect(
        el.shadowRoot?.querySelector('cds-tooltip, cds-ng-tooltip')
      ).toBeNull();
      expect(el.shadowRoot?.querySelector('button')?.disabled).toBe(true);
    });

    it('should support onClose event', async () => {
      const { fixture } = await render(
        `<cds-ng-dismissible-tag tagTitle="Close tag" text="Tag content"></cds-ng-dismissible-tag>`,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-dismissible-tag'
      ) as any;
      await el.updateComplete;

      let detail: any = null;
      el.addEventListener('cds-ng-dismissible-tag-closed', (e: any) => {
        detail = e.detail;
      });

      const buttonElement = el.shadowRoot?.querySelector('button');
      buttonElement?.click();
      await el.updateComplete;

      expect(detail).toBeTruthy();
    });

    it('should respect decorator prop', async () => {
      const { fixture } = await render(
        `
        <cds-ng-dismissible-tag tagTitle="Close tag" text="Tag content">
          <cds-ng-ai-label slot="decorator" alignment="bottom-left"></cds-ng-ai-label>
        </cds-ng-dismissible-tag>
        `,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-dismissible-tag'
      ) as any;
      const slot = el.shadowRoot?.querySelector('slot[name="decorator"]');
      const assigned = slot?.assignedNodes({ flatten: true }) || [];
      const aiLabel = assigned.find((node: any) =>
        node.tagName?.toLowerCase().includes('ai-label')
      );
      expect(aiLabel).toBeTruthy();
    });

    it('should respect deprecated slug prop', async () => {
      const { fixture } = await render(
        `
        <cds-ng-dismissible-tag tagTitle="Close tag" text="Tag content">
          <cds-ng-ai-label slot="slug" alignment="bottom-left"></cds-ng-ai-label>
        </cds-ng-dismissible-tag>
        `,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-dismissible-tag'
      ) as any;
      const slot = el.shadowRoot?.querySelector('slot[name="slug"]');
      const assigned = slot?.assignedNodes({ flatten: true }) || [];
      const aiLabel = assigned.find((node: any) =>
        node.tagName?.toLowerCase().includes('ai-label')
      );
      expect(aiLabel).toBeTruthy();
    });
  });

  it('should allow for a custom label', async () => {
    const { fixture } = await render(
      `<cds-ng-tag type="red">Johnny Ramone</cds-ng-tag>`,
      imports
    );
    const el = fixture.nativeElement.querySelector('cds-ng-tag') as any;
    expect(el.textContent?.trim()).toContain('Johnny Ramone');
  });

  it('should allow for a custom icon', async () => {
    const { fixture } = await render(
      `<cds-ng-tag type="red"><svg slot="icon"></svg> Dee Dee Ramone</cds-ng-tag>`,
      imports
    );
    const el = fixture.nativeElement.querySelector('cds-ng-tag') as any;
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector('slot[name="icon"]');
    const assigned = slot?.assignedNodes({ flatten: true }) || [];
    const icon = assigned.find(
      (node: any) => node.tagName?.toLowerCase() === 'svg'
    );
    expect(icon).toBeTruthy();
  });

  it('should respect decorator prop', async () => {
    const { fixture } = await render(
      `
      <cds-ng-tag type="red">
        <cds-ng-ai-label slot="decorator" alignment="bottom-left"></cds-ng-ai-label>
      </cds-ng-tag>
      `,
      imports
    );
    const el = fixture.nativeElement.querySelector('cds-ng-tag') as any;
    const slot = el.shadowRoot?.querySelector('slot[name="decorator"]');
    const assigned = slot?.assignedNodes({ flatten: true }) || [];
    const aiLabel = assigned.find((node: any) =>
      node.tagName?.toLowerCase().includes('ai-label')
    );
    expect(aiLabel).toBeTruthy();
  });

  it('should respect deprecated slug prop', async () => {
    const { fixture } = await render(
      `
      <cds-ng-tag type="red">
        <cds-ng-ai-label slot="slug" alignment="bottom-left"></cds-ng-ai-label>
      </cds-ng-tag>
      `,
      imports
    );
    const el = fixture.nativeElement.querySelector('cds-ng-tag') as any;
    const slot = el.shadowRoot?.querySelector('slot[name="slug"]');
    const assigned = slot?.assignedNodes({ flatten: true }) || [];
    const aiLabel = assigned.find((node: any) =>
      node.tagName?.toLowerCase().includes('ai-label')
    );
    expect(aiLabel).toBeTruthy();
  });

  describe('cds-selectable-tag', () => {
    it('should render a selectable tag', async () => {
      const { fixture } = await render(
        `<cds-ng-selectable-tag text="Tag content"></cds-ng-selectable-tag>`,
        imports
      );
      expect(
        fixture.nativeElement.querySelector('cds-ng-selectable-tag')
      ).toBeTruthy();
    });

    it('should select the selectable tag', async () => {
      const { fixture } = await render(
        `<cds-ng-selectable-tag text="Tag content"></cds-ng-selectable-tag>`,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-selectable-tag'
      ) as any;
      const buttonElement =
        el.shadowRoot?.querySelector('cds-ng-tag, cds-tag') || el;
      buttonElement?.click();
      await el.updateComplete;

      expect(el.hasAttribute('selected') || el.selected).toBe(true);
    });

    it('should call cds-selectable-tag-beingselected', async () => {
      const { fixture } = await render(
        `<cds-ng-selectable-tag text="Tag content"></cds-ng-selectable-tag>`,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-selectable-tag'
      ) as any;
      await el.updateComplete;

      let called = false;
      el.addEventListener('cds-ng-selectable-tag-beingselected', () => {
        called = true;
      });

      const buttonElement =
        el.shadowRoot?.querySelector('cds-ng-tag, cds-tag') || el;
      buttonElement?.click();
      await el.updateComplete;

      expect(called).toBe(true);
    });

    it('should call cds-selectable-tag-selected', async () => {
      const { fixture } = await render(
        `<cds-ng-selectable-tag text="Tag content"></cds-ng-selectable-tag>`,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-selectable-tag'
      ) as any;
      await el.updateComplete;

      let called = false;
      el.addEventListener('cds-ng-selectable-tag-selected', () => {
        called = true;
      });

      const buttonElement =
        el.shadowRoot?.querySelector('cds-ng-tag, cds-tag') || el;
      buttonElement?.click();
      await el.updateComplete;

      expect(called).toBe(true);
    });
  });

  describe('cds-skeleton-tag', () => {
    it('should render a skeleton state', async () => {
      const { fixture } = await render(
        `<cds-ng-tag-skeleton></cds-ng-tag-skeleton>`,
        imports
      );
      expect(
        fixture.nativeElement.querySelector('cds-ng-tag-skeleton')
      ).toBeTruthy();
    });

    it('should render a skeleton state with a small size', async () => {
      const { fixture } = await render(
        `<cds-ng-tag-skeleton size="sm"></cds-ng-tag-skeleton>`,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-tag-skeleton'
      ) as any;
      const spanElement = el.shadowRoot?.querySelector('span');
      expect(
        spanElement?.classList.contains('cds-ng--layout--size-sm') ||
          spanElement?.classList.contains('cds--layout--size-sm')
      ).toBe(true);
    });
  });

  describe('cds-operational-tag', () => {
    it('should render a operational state', async () => {
      const { fixture } = await render(
        `<cds-ng-operational-tag type="red" text="Tag content"></cds-ng-operational-tag>`,
        imports
      );
      expect(
        fixture.nativeElement.querySelector('cds-ng-operational-tag')
      ).toBeTruthy();
    });

    it('should expose part on tag', async () => {
      const { fixture } = await render(
        `<cds-ng-operational-tag text="Tag content"></cds-ng-operational-tag>`,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-operational-tag'
      ) as any;
      expect(el.shadowRoot?.querySelector('[part="tag"]')).toBeTruthy();
    });

    it('should not set icon styles for label-only operational tag', async () => {
      const { fixture } = await render(
        `<cds-ng-operational-tag text="Tag content"></cds-ng-operational-tag>`,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-operational-tag'
      ) as any;
      const tag = el.shadowRoot?.querySelector('cds-ng-tag, cds-tag');
      expect(tag?.hasAttribute('has-custom-icon')).toBe(false);
    });

    it('should set icon styles when operational tag has an icon', async () => {
      const { fixture } = await render(
        `
        <cds-ng-operational-tag text="Tag content">
          <span slot="icon"></span>
        </cds-ng-operational-tag>
        `,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-operational-tag'
      ) as any;
      await el.updateComplete;
      const tag = el.shadowRoot?.querySelector('cds-ng-tag, cds-tag');
      if (tag) await tag.updateComplete;

      expect(tag?.hasAttribute('has-custom-icon')).toBe(true);
    });
  });

  describe('cds-selectable-tag', () => {
    it('should not set icon styles for label-only selectable tag', async () => {
      const { fixture } = await render(
        `<cds-ng-selectable-tag text="Tag content"></cds-ng-selectable-tag>`,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-selectable-tag'
      ) as any;
      const tag = el.shadowRoot?.querySelector('cds-ng-tag, cds-tag');
      expect(tag?.hasAttribute('has-custom-icon')).toBe(false);
    });

    it('should set icon styles when selectable tag has an icon', async () => {
      const { fixture } = await render(
        `
        <cds-ng-selectable-tag text="Tag content">
          <span slot="icon"></span>
        </cds-ng-selectable-tag>
        `,
        imports
      );
      const el = fixture.nativeElement.querySelector(
        'cds-ng-selectable-tag'
      ) as any;
      await el.updateComplete;
      const tag = el.shadowRoot?.querySelector('cds-ng-tag, cds-tag');
      if (tag) await tag.updateComplete;

      expect(tag?.hasAttribute('has-custom-icon')).toBe(true);
    });
  });

  it('should render as a filter tag', async () => {
    const { fixture } = await render(
      `<cds-ng-tag [filter]="true">Tag content</cds-ng-tag>`,
      imports
    );
    const el = fixture.nativeElement.querySelector('cds-ng-tag') as any;
    const closeIcon = el.shadowRoot?.querySelector(
      'button.cds-ng--tag__close-icon, button.cds--tag__close-icon'
    );
    expect(closeIcon).toBeTruthy();
  });

  it('should handle close button click', async () => {
    const { fixture } = await render(
      `<cds-ng-tag [filter]="true" title="Close tag">onClose</cds-ng-tag>`,
      imports
    );
    const el = fixture.nativeElement.querySelector('cds-ng-tag') as any;
    await el.updateComplete;

    let detail: any = null;
    el.addEventListener('cds-ng-tag-closed', (e: any) => {
      detail = e.detail;
    });

    const buttonElement = el.shadowRoot?.querySelector(
      'button.cds-ng--tag__close-icon, button.cds--tag__close-icon'
    );
    buttonElement?.click();
    await el.updateComplete;

    expect(detail).toBeTruthy();
  });
});
