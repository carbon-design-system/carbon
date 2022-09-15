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
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import BXSelect from '../../src/components/select/select';
import '../../src/components/select/select-item';
import '../../src/components/select/select-item-group';
import { BXSelectDirective } from '../../src/directives-angular/select';

@Component({
  template: `
    <form>
      <bx-select [(ngModel)]="model.value" name="select">
        <bx-select-item-group label="Category 1">
          <bx-select-item value="all">Option 1</bx-select-item>
          <bx-select-item value="cloudFoundry">Option 2</bx-select-item>
        </bx-select-item-group>
        <bx-select-item-group label="Category 2">
          <bx-select-item value="staging">Option 3</bx-select-item>
          <bx-select-item value="dea">Option 4</bx-select-item>
          <bx-select-item value="router">Option 5</bx-select-item>
        </bx-select-item-group>
      </bx-select>
    </form>
  `,
})
class SelectAngularTest {
  model = {
    value: 'all',
  };
}

describe('Angular directive for bx-select', () => {
  beforeAll(function () {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [BXSelectDirective, SelectAngularTest],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  it('should send the value to model upon `input` event', async function () {
    const fixture = TestBed.createComponent(SelectAngularTest);
    fixture.detectChanges(); // Ensures event handlers are set up
    await Promise.resolve(); // Ensures event handlers are set up
    const debugElement = fixture.debugElement.query(By.css('bx-select'));
    (debugElement as unknown as BXSelect).value = 'staging';
    await Promise.resolve(); // Ensure the `value` is propagated to the `<input>` in shadow DOM
    debugElement.triggerEventHandler('input', { target: debugElement });
    fixture.detectChanges();
    expect(fixture.componentInstance.model.value).toBe('staging');
  });
});
