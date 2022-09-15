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
import '../../src/components/combo-box/combo-box';
import '../../src/components/combo-box/combo-box-item';
import { BXComboBoxDirective } from '../../src/directives-angular/combo-box';

@Component({
  template: `
    <form>
      <bx-combo-box [(ngModel)]="model.selection" name="selection" open>
        <bx-combo-box-item value="all">Option 1</bx-combo-box-item>
        <bx-combo-box-item value="cloudFoundry">Option 2</bx-combo-box-item>
        <bx-combo-box-item value="staging">Option 3</bx-combo-box-item>
        <bx-combo-box-item value="dea">Option 4</bx-combo-box-item>
        <bx-combo-box-item value="router">Option 5</bx-combo-box-item>
      </bx-combo-box>
    </form>
  `,
})
class ComboBoxAngularTest {
  model = {
    selection: 'all',
  };
}

describe('Angular directive for bx-combo-box', () => {
  beforeAll(function () {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [BXComboBoxDirective, ComboBoxAngularTest],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  it('should send the value to model upon `change` event', async function () {
    const fixture = TestBed.createComponent(ComboBoxAngularTest);
    fixture.detectChanges(); // Ensures event handlers are set up
    await Promise.resolve(); // Ensures event handlers are set up
    (document.querySelector('bx-combo-box-item[value="staging"]') as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model.selection).toBe('staging');
  });
});
