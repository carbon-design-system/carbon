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
import { BXSliderDirective } from '../../src/directives-angular/slider';

@Component({
  template: `
    <form>
      <bx-slider [(ngModel)]="model.number" name="number"></bx-slider>
    </form>
  `,
})
class SliderAngularTest {
  model = {
    number: 0,
  };
}

describe('Angular directive for bx-slider', () => {
  beforeAll(function () {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [BXSliderDirective, SliderAngularTest],
      imports: [FormsModule],
    });
  });

  it('should send the value to model upon `input` event', async function () {
    const fixture = TestBed.createComponent(SliderAngularTest);
    fixture.detectChanges(); // Ensures event handlers are set up
    await Promise.resolve(); // Ensures event handlers are set up
    const debugElement = fixture.debugElement.query(By.css('bx-slider'));
    debugElement.triggerEventHandler('bx-slider-changed', { target: debugElement, detail: { value: 16 } });
    fixture.detectChanges();
    expect(fixture.componentInstance.model.number).toBe(16);
  });
});
