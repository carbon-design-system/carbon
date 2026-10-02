/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DISPLAY_NAMEComponent } from '../DISPLAY_NAME.component';

describe('DISPLAY_NAMEComponent', () => {
  let fixture: ComponentFixture<DISPLAY_NAMEComponent>;
  let component: DISPLAY_NAMEComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DISPLAY_NAMEComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DISPLAY_NAMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: add Layer 1 tests (input reflection, output emission, CVA)
});
