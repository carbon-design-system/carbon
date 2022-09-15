/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../polyfills/angular';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import BXCheckbox from '../../src/components/checkbox/checkbox';
import { BXCheckboxDirective } from '../../src/directives-angular/checkbox';

@Component({
  template: `
    <form>
      <bx-checkbox [(ngModel)]="model.checked" name="checked"></bx-checkbox>
    </form>
  `,
})
class CheckboxAngularTest {
  model = {
    checked: false,
  };
}

describe('Angular directive for bx-checkbox', () => {
  beforeAll(function () {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [BXCheckboxDirective, CheckboxAngularTest],
      imports: [FormsModule],
    });
  });

  it('should send the value to model upon `bx-checkbox-changed` event', async function () {
    const fixture = TestBed.createComponent(CheckboxAngularTest);
    fixture.detectChanges(); // Ensures event handlers are set up
    await Promise.resolve(); // Ensures event handlers are set up
    const debugElement = fixture.debugElement.query(By.css('bx-checkbox'));
    (debugElement as unknown as BXCheckbox).checked = true;
    debugElement.triggerEventHandler('bx-checkbox-changed', { target: debugElement });
    fixture.detectChanges();
    expect(fixture.componentInstance.model.checked).toBe(true);
  });
});
