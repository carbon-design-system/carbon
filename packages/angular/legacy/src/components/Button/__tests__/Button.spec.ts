/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../Button.component';

describe('Legacy ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the legacy button component', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect disabled attribute on the inner cds-ng-button', () => {
    component.disabled = true;
    fixture.detectChanges();
    const wc = fixture.nativeElement.querySelector('cds-ng-button');
    expect(wc.getAttribute('disabled')).not.toBeNull();
  });

  it('should emit (buttonClick) when inner button is clicked', () => {
    const spy = jest.fn();
    component.buttonClick.subscribe(spy);
    const wc = fixture.nativeElement.querySelector('cds-ng-button');
    wc.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
