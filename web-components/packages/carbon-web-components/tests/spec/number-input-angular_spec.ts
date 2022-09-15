/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
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
import BXNumberInput from '../../src/components/number-input/number-input';
import { BXNumberInputDirective } from '../../src/directives-angular/number-input';

@Component({
  template: `
    <form>
      <bx-number-input [(ngModel)]="model.number" name="number"></bx-number-input>
    </form>
  `,
})
class NumberInputAngularTest {
  model = {
    number: 0,
  };
}

describe('Angular directive for bx-number-input', () => {
  beforeAll(function () {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [BXNumberInputDirective, NumberInputAngularTest],
      imports: [FormsModule],
    });
  });

  it('should send the value to model upon `change` event', async function () {
    const fixture = TestBed.createComponent(NumberInputAngularTest);
    fixture.detectChanges(); // Ensures event handlers are set up
    await Promise.resolve(); // Ensures event handlers are set up
    const debugElement = fixture.debugElement.query(By.css('bx-number-input'));
    (debugElement as unknown as BXNumberInput).value = '16';
    await Promise.resolve(); // Ensure the `value` is propagated to the `<input>` in shadow DOM
    debugElement.triggerEventHandler('change', { target: debugElement });
    fixture.detectChanges();
    expect(fixture.componentInstance.model.number).toBe(16);
  });

  it('should send the value to model upon `bx-number-input` event', async function () {
    const fixture = TestBed.createComponent(NumberInputAngularTest);
    fixture.detectChanges(); // Ensures event handlers are set up
    await Promise.resolve(); // Ensures event handlers are set up
    const debugElement = fixture.debugElement.query(By.css('bx-number-input'));
    (debugElement as unknown as BXNumberInput).value = '16';
    await Promise.resolve(); // Ensure the `value` is propagated to the `<input>` in shadow DOM
    debugElement.triggerEventHandler('bx-number-input', { target: debugElement });
    fixture.detectChanges();
    expect(fixture.componentInstance.model.number).toBe(16);
  });
});
