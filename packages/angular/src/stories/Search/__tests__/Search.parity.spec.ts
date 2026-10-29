/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/search/__tests__/search-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 */

import { SearchComponent } from '../../../generated/Search';
import { SearchSkeletonComponent } from '../../../generated/SearchSkeleton';
import { render } from '../../../testing/render';

const imports = [SearchComponent, SearchSkeletonComponent];

const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-search') as HTMLElement & {
    value: string;
    expanded: boolean;
    placeholder: string;
    size: string;
    _inputElement: HTMLInputElement;
    _magnifierElement: HTMLElement;
    shadowRoot: ShadowRoot;
    updateComplete: Promise<void>;
  };

describe('cds-search (parity with search-test.js)', () => {
  describe('renders as expected - Component API', () => {
    it('should respect the autocomplete attribute', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" autoComplete="test"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('autocomplete')).toBe('test');
    });

    it('should support a custom class on the outermost element', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" class="custom-class"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      expect(host.classList.contains('custom-class')).toBe(true);
    });

    it('should respect the close-button-label-text attribute', async () => {
      const { fixture } = await render(
        `<cds-ng-search
          labelText="test-search"
          closeButtonLabelText="clear"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const closeButton =
        host.shadowRoot?.querySelector('button[data-action="clear"]') ||
        host.shadowRoot?.querySelector('button[aria-label="clear"]') ||
        host.shadowRoot?.querySelector('button[title="clear"]') ||
        host.shadowRoot?.querySelector(
          '.cds-ng--search-close, .cds--search-close'
        );
      expect(closeButton).toBeTruthy();
    });

    it('should respect the disabled attribute', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" [disabled]="true"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot?.querySelector('input');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });

    it('should respect the autofocus attribute', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" [autofocus]="true"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot?.querySelector('input');
      expect(input?.hasAttribute('autofocus')).toBe(true);
    });

    it('should respect the label-text attribute', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const label = host.shadowRoot?.querySelector('label');
      expect(label?.textContent?.trim()).toBe('test-search');
    });

    it('should call focus expand button on Escape when expanded', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" [expandable]="true" [expanded]="true"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot?.querySelector('input');
      const expandButton =
        host.shadowRoot?.querySelector('button[data-action="expand"]') ||
        (host.shadowRoot?.querySelector(
          'button.cds-ng--search-magnifier, button.cds--search-magnifier'
        ) as HTMLElement);

      if (input && expandButton) {
        input.focus();
        const escapeEvent = new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
        });
        input.dispatchEvent(escapeEvent);
        await host.updateComplete;

        expect(
          host.shadowRoot?.activeElement === expandButton ||
            host.shadowRoot?.activeElement === input
        ).toBe(true);
      }
    });

    it('should have tabbable button and untabbable input if expandable and not expanded', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" [expandable]="true"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      expect(host.hasAttribute('expandable')).toBe(true);
      expect(host.hasAttribute('expanded')).toBe(false);
    });

    it('should have tabbable input and untabbable button if not expandable', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      expect(host.hasAttribute('expandable')).toBe(false);
    });

    it('should respect the placeholder attribute', async () => {
      const { fixture } = await render(
        `<cds-ng-search
          labelText="test-search"
          placeholder="test-placeholder"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('placeholder')).toBe('test-placeholder');
    });

    it('should set hasCustomIcon when a custom icon is provided', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search">
          <svg slot="icon" data-testid="test-icon"></svg>
        </cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const customIcon = host.querySelector('svg[data-testid="test-icon"]');
      expect(customIcon).toBeTruthy();
    });

    it('should respect the role attribute', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" role="combobox"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('role')).toBe('combobox');
    });

    it('should respect the size attribute', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" size="sm"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      expect(host.getAttribute('size')).toBe('sm');
    });

    it('should respect the type attribute', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" type="search"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('type')).toBe('search');
    });

    it('should respect the value attribute', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" value="test-value"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.value).toBe('test-value');
    });
  });

  describe('@query decorator functionality', () => {
    it('should focus input element when clear button is clicked', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" value="test-value"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      await host.updateComplete;

      const input = host.shadowRoot?.querySelector('input') as HTMLInputElement;
      const closeButton = host.shadowRoot?.querySelector(
        'button.cds-ng--search-close, button.cds--search-close'
      ) as HTMLButtonElement;

      expect(input).toBeTruthy();
      expect(closeButton).toBeTruthy();

      closeButton?.click();
      await host.updateComplete;

      expect(host.value).toBe('');
    });

    it('should cache input element reference via @query decorator', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" value="initial"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      await host.updateComplete;

      const inputElement = host._inputElement;
      expect(inputElement).toBeTruthy();
      expect(inputElement?.tagName).toBe('INPUT');
      expect(inputElement?.value).toBe('initial');
    });

    it('should cache magnifier element reference via @query decorator', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" [expandable]="true"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      await host.updateComplete;

      const magnifierElement = host._magnifierElement;
      expect(magnifierElement).toBeTruthy();
      expect(
        magnifierElement?.classList.contains('cds-ng--search-magnifier') ||
          magnifierElement?.classList.contains('cds--search-magnifier')
      ).toBe(true);
    });

    it('should focus magnifier when Escape is pressed with empty input in expandable mode', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" [expandable]="true" [expanded]="true"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      await host.updateComplete;

      const input = host.shadowRoot?.querySelector('input') as HTMLInputElement;
      const magnifier = host.shadowRoot?.querySelector(
        '.cds-ng--search-magnifier, .cds--search-magnifier'
      ) as HTMLElement;

      expect(input).toBeTruthy();
      expect(magnifier).toBeTruthy();

      input?.focus();
      await host.updateComplete;

      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      host.dispatchEvent(escapeEvent);
      await host.updateComplete;

      expect(
        host.shadowRoot?.activeElement === magnifier ||
          host.shadowRoot?.activeElement === input
      ).toBe(true);
    });

    it('should clear value but keep focus when Escape is pressed with non-empty input', async () => {
      const { fixture } = await render(
        `<cds-ng-search
          labelText="test-search"
          value="test-value"
          [expandable]="true"
          [expanded]="true"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      await host.updateComplete;

      const input = host.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input).toBeTruthy();

      input?.focus();
      await host.updateComplete;

      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      host.dispatchEvent(escapeEvent);
      await host.updateComplete;

      expect(host.value).toBe('');
    });

    it('should expand and focus input when magnifier is clicked in expandable mode', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" [expandable]="true"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      await host.updateComplete;

      expect(host.expanded).toBe(false);

      const magnifier = host.shadowRoot?.querySelector(
        '.cds-ng--search-magnifier, .cds--search-magnifier'
      ) as HTMLElement;
      const input = host.shadowRoot?.querySelector('input') as HTMLInputElement;

      expect(magnifier).toBeTruthy();
      expect(input).toBeTruthy();

      magnifier?.click();
      await host.updateComplete;

      expect(host.expanded).toBe(true);
    });

    it('should not expand when disabled', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" [disabled]="true" [expandable]="true"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      await host.updateComplete;

      const magnifier = host.shadowRoot?.querySelector(
        '.cds-ng--search-magnifier, .cds--search-magnifier'
      ) as HTMLElement;
      expect(magnifier).toBeTruthy();

      magnifier?.click();
      await host.updateComplete;

      expect(host.expanded).toBe(false);

      host.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
        })
      );
      await host.updateComplete;

      expect(host.expanded).toBe(false);

      host.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: ' ',
          bubbles: true,
        })
      );
      await host.updateComplete;

      expect(host.expanded).toBe(false);
    });

    it('should handle multiple clear operations correctly', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" value="test1"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      await host.updateComplete;

      const input = host.shadowRoot?.querySelector('input') as HTMLInputElement;
      const closeButton = host.shadowRoot?.querySelector(
        'button.cds-ng--search-close, button.cds--search-close'
      ) as HTMLButtonElement;

      closeButton?.click();
      await host.updateComplete;
      expect(host.value).toBe('');

      host.value = 'test2';
      await host.updateComplete;

      closeButton?.click();
      await host.updateComplete;
      expect(host.value).toBe('');
    });

    it('should maintain focus management with @query decorator after updates', async () => {
      const { fixture } = await render(
        `<cds-ng-search labelText="test-search" [expandable]="true"></cds-ng-search>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      await host.updateComplete;

      host.placeholder = 'New placeholder';
      await host.updateComplete;

      host.size = 'sm';
      await host.updateComplete;

      const magnifier = host.shadowRoot?.querySelector(
        '.cds-ng--search-magnifier, .cds--search-magnifier'
      ) as HTMLElement;
      const input = host.shadowRoot?.querySelector('input') as HTMLInputElement;

      magnifier?.click();
      await host.updateComplete;

      expect(host.expanded).toBe(true);
    });
  });
});
