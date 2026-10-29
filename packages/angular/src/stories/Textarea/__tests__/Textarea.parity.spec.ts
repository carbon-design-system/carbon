/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/textarea/__tests__/textarea-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 */

import { TestBed } from '@angular/core/testing';
import { TextareaComponent } from '../../../generated/Textarea';
import { TextareaSkeletonComponent } from '../../../generated/TextareaSkeleton';
import { render } from '../../../testing/render';

const imports = [TextareaComponent, TextareaSkeletonComponent];

const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-textarea') as HTMLElement & {
    value: string;
    counterMode: string;
    shadowRoot: ShadowRoot;
    updateComplete: Promise<void>;
  };

describe('cds-ng-textarea (parity with web-components textarea-test.js)', () => {
  it('should render correctly with label', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea label="Textarea label" helperText="Helper text"></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const label = host.shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(label?.textContent).toContain('Textarea label');
  });

  it('should render correctly with helper-text', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea label="Textarea label" helperText="Helper text"></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const helper = host.shadowRoot.querySelector(
      '.cds-ng--form__helper-text, .cds--form__helper-text'
    );
    expect(helper).toBeTruthy();
    expect(helper?.textContent).toContain('Helper text');
  });

  it('should reflect value to the textarea', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea value="Initial content"></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const textarea = host.shadowRoot.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe('Initial content');
  });

  it('should emit input event and update value', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const textarea = host.shadowRoot.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    textarea.value = 'Updated content';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    await host.updateComplete;
    expect(host.value).toBe('Updated content');
  });

  it('should support readonly and disabled attributes', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea [readonly]="true" [disabled]="true"></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const textarea = host.shadowRoot.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    expect(textarea.readOnly).toBe(true);
    expect(textarea.disabled).toBe(true);
  });

  it('should show invalid text when invalid is set', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea [invalid]="true" invalidText="Error occurred"></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const error = host.shadowRoot.querySelector(
      '.cds-ng--form-requirement, .cds--form-requirement'
    );
    expect(error?.textContent).toContain('Error occurred');
    expect(host.hasAttribute('invalid')).toBe(true);
  });

  it('should show warning text when warn is set', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea [warn]="true" warnText="This is a warning"></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const warning = host.shadowRoot.querySelector(
      '.cds-ng--form-requirement, .cds--form-requirement'
    );
    expect(warning?.textContent).toContain('This is a warning');
    expect(host.hasAttribute('warn')).toBe(true);
  });

  it('should apply hide-label and visually hide the label', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea label="Hidden label" [hideLabel]="true"></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const label = host.shadowRoot.querySelector('label');
    expect(
      label?.classList.contains('cds-ng--visually-hidden') ||
        label?.classList.contains('cds--visually-hidden')
    ).toBe(true);
  });

  it('should reflect cols and rows attributes', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea [cols]="50" [rows]="10"></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const textarea = host.shadowRoot.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    expect(textarea.getAttribute('cols')).toBe('50');
    expect(textarea.getAttribute('rows')).toBe('10');
  });

  // Layout tests are handled in Playwright E2E suites
  it.todo(
    'should stretch the inner textarea when the host grows in a flex column layout'
  );

  it('should accept pattern and required attributes', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea pattern="[A-Za-z]+" [required]="true"></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const textarea = host.shadowRoot.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    expect(textarea.getAttribute('pattern')).toBe('[A-Za-z]+');
    expect(host.hasAttribute('required')).toBe(true);
  });

  it('should forward data-* attributes', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea data-testid="textarea-id"></cds-ng-textarea>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    expect(host.getAttribute('data-testid')).toBe('textarea-id');
  });

  it('should support skeleton variant', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea-skeleton></cds-ng-textarea-skeleton>`,
      imports
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-textarea-skeleton'
    ) as HTMLElement & {
      shadowRoot: ShadowRoot;
    };
    expect(host).toBeTruthy();
    const skeleton = host.shadowRoot.querySelector(
      '.cds-ng--skeleton, .cds--skeleton'
    );
    expect(skeleton).toBeTruthy();
  });

  it('should support hide-label on skeleton variant', async () => {
    const { fixture } = await render(
      `<cds-ng-textarea-skeleton></cds-ng-textarea-skeleton>`,
      imports
    );
    const host = fixture.nativeElement.querySelector(
      'cds-ng-textarea-skeleton'
    ) as HTMLElement & {
      shadowRoot: ShadowRoot;
      updateComplete: Promise<void>;
    };
    await host.updateComplete;
    const label = host.shadowRoot.querySelector(
      '.cds-ng--label.cds-ng--skeleton, .cds--label.cds--skeleton'
    );
    expect(label).toBeTruthy();

    TestBed.resetTestingModule();

    const { fixture: fixtureHidden } = await render(
      `<cds-ng-textarea-skeleton [hideLabel]="true"></cds-ng-textarea-skeleton>`,
      imports
    );
    const hostHidden = fixtureHidden.nativeElement.querySelector(
      'cds-ng-textarea-skeleton'
    ) as HTMLElement & {
      shadowRoot: ShadowRoot;
      updateComplete: Promise<void>;
    };
    await hostHidden.updateComplete;
    const hiddenLabel = hostHidden.shadowRoot.querySelector(
      '.cds-ng--label.cds-ng--skeleton, .cds--label.cds--skeleton'
    );
    expect(hiddenLabel).toBeNull();
  });

  // Axe accessibility testing is covered in E2E suites
  it.todo('should be accessible');

  describe('counter mode behaviors', () => {
    it('should apply maxlength only in character mode', async () => {
      const { fixture } = await render(
        `<cds-ng-textarea [enableCounter]="true" counterMode="character" [maxCount]="100"></cds-ng-textarea>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const textarea = host.shadowRoot.querySelector(
        'textarea'
      ) as HTMLTextAreaElement;
      expect(textarea.getAttribute('maxlength')).toBe('100');
    });

    it('should remove maxlength when switching to word mode', async () => {
      const {
        fixture,
        host: h,
        update,
      } = await render(
        `<cds-ng-textarea [enableCounter]="true" [counterMode]="mode" [maxCount]="100"></cds-ng-textarea>`,
        imports,
        { mode: 'character' }
      );
      const host = wc(fixture.nativeElement);
      h.mode = 'word';
      await update();
      const textarea = host.shadowRoot.querySelector(
        'textarea'
      ) as HTMLTextAreaElement;
      expect(textarea.hasAttribute('maxlength')).toBe(false);
    });

    it('should add maxlength when switching back to character mode', async () => {
      const {
        fixture,
        host: h,
        update,
      } = await render(
        `<cds-ng-textarea [enableCounter]="true" [counterMode]="mode" [maxCount]="100"></cds-ng-textarea>`,
        imports,
        { mode: 'word' }
      );
      const host = wc(fixture.nativeElement);
      h.mode = 'character';
      await update();
      const textarea = host.shadowRoot.querySelector(
        'textarea'
      ) as HTMLTextAreaElement;
      expect(textarea.getAttribute('maxlength')).toBe('100');
    });
  });

  describe('slot support', () => {
    it('renders slotted label-text', async () => {
      const { fixture } = await render(
        `<cds-ng-textarea><span slot="label-text">Slotted Label</span></cds-ng-textarea>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const slot = host.shadowRoot.querySelector(
        'slot[name="label-text"]'
      ) as HTMLSlotElement;
      expect(slot).toBeTruthy();
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content?.textContent?.trim()).toBe('Slotted Label');
    });

    it('renders slotted helper-text', async () => {
      const { fixture } = await render(
        `<cds-ng-textarea><span slot="helper-text">Slotted Helper</span></cds-ng-textarea>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const slot = host.shadowRoot.querySelector(
        'div.cds-ng--form__helper-text slot[name="helper-text"], div.cds--form__helper-text slot[name="helper-text"]'
      ) as HTMLSlotElement;
      expect(slot).toBeTruthy();
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content?.textContent?.trim()).toBe('Slotted Helper');
    });

    it('renders slotted invalid-text', async () => {
      const { fixture } = await render(
        `<cds-ng-textarea [invalid]="true"><span slot="invalid-text">Slotted Invalid</span></cds-ng-textarea>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const slot = host.shadowRoot.querySelector(
        'slot[name="invalid-text"]'
      ) as HTMLSlotElement;
      expect(slot).toBeTruthy();
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content?.textContent?.trim()).toBe('Slotted Invalid');
    });

    it('renders slotted warn-text', async () => {
      const { fixture } = await render(
        `<cds-ng-textarea [warn]="true"><span slot="warn-text">Slotted Warning</span></cds-ng-textarea>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const slot = host.shadowRoot.querySelector(
        'slot[name="warn-text"]'
      ) as HTMLSlotElement;
      expect(slot).toBeTruthy();
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content?.textContent?.trim()).toBe('Slotted Warning');
    });
  });
});
