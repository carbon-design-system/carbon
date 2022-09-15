/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../polyfills/angular';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import '../../src/components/dropdown/dropdown';
import '../../src/components/dropdown/dropdown-item';
import { BXDropdownDirective } from '../../src/directives-angular/dropdown';

@Component({
  template: `
    <form>
      <bx-dropdown [(ngModel)]="model.selection" name="selection" open>
        <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
        <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
        <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
        <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
        <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
      </bx-dropdown>
    </form>
  `,
})
class DropdownAngularTest {
  model = {
    selection: 'all',
  };
}

describe('Angular directive for bx-dropdown', () => {
  beforeAll(function () {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [BXDropdownDirective, DropdownAngularTest],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  it('should send the value to model upon `change` event', async function () {
    const fixture = TestBed.createComponent(DropdownAngularTest);
    fixture.detectChanges(); // Ensures event handlers are set up
    await Promise.resolve(); // Ensures event handlers are set up
    (document.querySelector('bx-dropdown-item[value="staging"]') as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model.selection).toBe('staging');
  });
});
