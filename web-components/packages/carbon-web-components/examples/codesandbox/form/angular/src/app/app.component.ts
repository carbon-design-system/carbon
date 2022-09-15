/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'carbon-web-components/es/components/button/button';
import 'carbon-web-components/es/components/form/form-item';
import 'carbon-web-components/es/components/input/input';
import 'carbon-web-components/es/components/notification/inline-notification';

/**
 * The data model.
 */
class LoginModel {
  // eslint-disable-next-line no-empty-function, no-useless-constructor
  constructor(public username: string = '', public password: string = '') {}
}

/**
 * The application UI component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
// eslint-disable-next-line import/prefer-default-export
export class AppComponent {
  /**
   * The data model.
   */
  model = new LoginModel();

  /**
   * `true` if the form submission is in progress.
   */
  submitInProgress = false;

  /**
   * The `NgForm` instance.
   */
  @ViewChild('loginForm', { static: false })
  form: NgForm;

  /**
   * The form validation error message for `username` field.
   */
  get usernameValidityMessage() {
    const { form } = this.form || ({} as Partial<NonNullable<NgForm>>);
    if (form) {
      const control = form.get('username');
      if (control) {
        return control.getError('checkUsername');
      }
    }
    return null;
  }

  /**
   * The form validation error message for `password` field.
   */
  get passwordValidityMessage() {
    const { form } = this.form || ({} as Partial<NonNullable<NgForm>>);
    if (form) {
      const control = form.get('password');
      if (control) {
        return control.getError('checkPassword');
      }
    }
    return null;
  }

  /**
   * Resets the model.
   */
  resetModel() {
    this.model = new LoginModel();
  }

  /**
   * Handles form submission.
   */
  async handleClickLogin() {
    this.submitInProgress = true;
    await new Promise(resolve => {
      setTimeout(resolve, 500);
    }); // Simulates server latency
    const { form } = this.form || ({} as Partial<NonNullable<NgForm>>);
    const usernameControl = form.get('username');
    if (!usernameControl.value) {
      usernameControl.setErrors({ checkUsername: 'User does not exist' });
    } else if (!['john', 'anne'].includes(usernameControl.value)) {
      usernameControl.setErrors({ checkUsername: 'Wrong user name (Has to be john or anne)' });
    } else {
      usernameControl.setErrors(null);
    }
    const passwordControl = form.get('password');
    if (passwordControl.value !== 'angular') {
      passwordControl.setErrors({ checkPassword: 'Wrong password (Has to be the name of this example directory)' });
    } else {
      passwordControl.setErrors(null);
    }
    if (form.valid) {
      // eslint-disable-next-line no-alert
      alert(`You submitted:\n\n${JSON.stringify(form.value, null, 2)}`);
    }
    this.submitInProgress = false;
  }
}
