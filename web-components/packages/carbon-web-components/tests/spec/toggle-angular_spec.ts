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
import BXToggle from '../../src/components/toggle/toggle';
import { BXToggleDirective } from '../../src/directives-angular/toggle';

@Component({
  template: `
    <form>
      <bx-toggle [(ngModel)]="model.checked" name="checked"></bx-toggle>
    </form>
  `,
})
class ToggleAngularTest {
  model = {
    checked: false,
  };
}

describe('Angular directive for bx-toggle', () => {
  beforeAll(function () {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [BXToggleDirective, ToggleAngularTest],
      imports: [FormsModule],
    });
  });

  it('should send the value to model upon `bx-toggle-changed` event', async function () {
    const fixture = TestBed.createComponent(ToggleAngularTest);
    fixture.detectChanges(); // Ensures event handlers are set up
    await Promise.resolve(); // Ensures event handlers are set up
    const debugElement = fixture.debugElement.query(By.css('bx-toggle'));
    (debugElement as unknown as BXToggle).checked = true;
    debugElement.triggerEventHandler('bx-toggle-changed', { target: debugElement });
    fixture.detectChanges();
    expect(fixture.componentInstance.model.checked).toBe(true);
  });
});
