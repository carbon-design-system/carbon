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
import '../../src/components/multi-select/multi-select';
import '../../src/components/multi-select/multi-select-item';
import { BXMultiSelectDirective } from '../../src/directives-angular/multi-select';

@Component({
  template: `
    <form>
      <bx-multi-select [(ngModel)]="model.selection" name="selection" open>
        <bx-multi-select-item value="all">Option 1</bx-multi-select-item>
        <bx-multi-select-item value="cloudFoundry">Option 2</bx-multi-select-item>
        <bx-multi-select-item value="staging">Option 3</bx-multi-select-item>
        <bx-multi-select-item value="dea">Option 4</bx-multi-select-item>
        <bx-multi-select-item value="router">Option 5</bx-multi-select-item>
      </bx-multi-select>
    </form>
  `,
})
class MultiSelectAngularTest {
  model = {
    selection: 'all',
  };
}

describe('Angular directive for bx-multi-select', () => {
  beforeAll(function () {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [BXMultiSelectDirective, MultiSelectAngularTest],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  it('should send the value to model upon `change` event', async function () {
    const fixture = TestBed.createComponent(MultiSelectAngularTest);
    fixture.detectChanges(); // Ensures event handlers are set up
    await Promise.resolve(); // Ensures event handlers are set up
    (document.querySelector('bx-multi-select-item[value="staging"]') as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model.selection).toBe('all,staging');
    (document.querySelector('bx-multi-select-item[value="staging"]') as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model.selection).toBe('all');
  });
});
