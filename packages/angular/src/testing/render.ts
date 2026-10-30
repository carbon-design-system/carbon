/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Type,
  ViewEncapsulation,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Test helpers for porting `@carbon/web-components` tests to Angular.
 *
 * `render()` is the Angular counterpart of open-wc's `fixture(html\`...\`)`:
 * give it a template and it returns the host element, with the real web
 * components already rendered.
 */

export interface Rendered<T> {
  fixture: ComponentFixture<T>;
  /** The host component instance — mutate it to change bindings. */
  host: T;
  /** Query the Angular DOM (light DOM of the host). */
  query: <E extends Element = HTMLElement>(selector: string) => E;
  /** Re-run change detection and wait for every web component to re-render. */
  update: () => Promise<void>;
}

/**
 * Waits for all Lit elements under `root` to finish their pending update.
 * Equivalent to `await el.updateComplete` in the web component tests.
 */
export async function settle(root: ParentNode): Promise<void> {
  const elements = Array.from(root.querySelectorAll('*')) as Array<
    Element & { updateComplete?: Promise<unknown> }
  >;
  await Promise.all(elements.map((el) => el.updateComplete));
}

/**
 * Renders `template` in a standalone host component.
 *
 * @param template Angular template, e.g. `<cds-button kind="ghost">x</cds-button>`
 * @param imports Wrapper components used by the template.
 * @param props Initial properties on the host, referenced from the template.
 */
export async function render<T extends object = Record<string, unknown>>(
  template: string,
  imports: Array<Type<unknown>>,
  props: T = {} as T
): Promise<Rendered<T>> {
  @Component({
    standalone: true,
    imports,
    template,
    encapsulation: ViewEncapsulation.None,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  // eslint-disable-next-line @typescript-eslint/no-extraneous-class -- Angular needs a class to attach @Component to
  class HostComponent {}

  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture = TestBed.createComponent(HostComponent) as ComponentFixture<T>;
  Object.assign(fixture.componentInstance, props);

  const update = async () => {
    fixture.detectChanges();
    await settle(fixture.nativeElement);
    // Slotted content can trigger a second Lit update (`slotchange`).
    await settle(fixture.nativeElement);
  };
  await update();

  return {
    fixture,
    host: fixture.componentInstance,
    query: (selector) => fixture.nativeElement.querySelector(selector),
    update,
  };
}
