/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/carbon-web-components/es/components/button/button.js';
import '@carbon/carbon-web-components/es/components/form/form-item.js';
import '@carbon/carbon-web-components/es/components/input/input.js';
import '@carbon/carbon-web-components/es/components/notification/inline-notification.js';

const submit = async (formData) => {
  // Simulates server latency
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500)
  );
  // In a real-word application, you can simply do:
  // `await fetch('https://your.server/path/to/the/endpoint', { method: 'POST', body: formData })`
  const username = formData.get('username');
  if (!username) {
    throw Object.assign(new Error('Login failed'), {
      errors: {
        username: 'User does not exist',
      },
    });
  } else if (!['john', 'anne'].includes(username)) {
    throw Object.assign(new Error('Login failed'), {
      errors: {
        username: 'Wrong user name (Has to be john or anne)',
      },
    });
  } else if (formData.get('password') !== 'form') {
    throw Object.assign(new Error('Login failed'), {
      errors: {
        password: 'Wrong password (Has to be the name of the parent directory of this example directory)',
      },
    });
  } else {
    const values = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }
    alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`); // eslint-disable-line no-alert
  }
};

(() => {
  const notification = document.getElementById('notification');
  const form = document.getElementById('form-login');
  const inputUsername = document.getElementById('input-username');
  const inputPassword = document.getElementById('input-password');
  const btnLogin = document.getElementById('btn-login');
  const btnReset = document.getElementById('btn-reset');

  let pristine;

  notification.open = false;

  const setPristine = (value) => {
    pristine = value;
    btnReset.disabled = Boolean(pristine);
  };

  const setSubmitting = (value) => {
    inputUsername.disabled = value;
    inputPassword.disabled = value;
    btnLogin.disabled = value;
    btnReset.disabled = value || pristine;
  };

  const setValidity = (errors = {}) => {
    notification.open = 'username' in errors || 'password' in errors;
    inputUsername.invalid = 'username' in errors;
    inputUsername.validityMessage = errors.username;
    inputPassword.invalid = 'password' in errors;
    inputPassword.validityMessage = errors.password;
  };

  const login = async () => {
    // Gathers the form data
    // In modern browsers, `formdata` event is fired automatically upon `form.submit()`, etc.
    const formData = new FormData(form);
    const event = new CustomEvent('formdata', { bubbles: true, cancelable: false, composed: false });
    event.formData = formData;
    form.dispatchEvent(event);
    // Submits the form
    setSubmitting(true);
    try {
      await submit(formData);
      setValidity();
    } catch ({ errors }) {
      setValidity(errors);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    notification.open = false;
    inputUsername.invalid = false;
    inputUsername.value = '';
    inputPassword.invalid = false;
    inputPassword.value = '';
    setPristine(true);
  };

  inputUsername.addEventListener('input', () => {
    setPristine(false);
  });

  inputPassword.addEventListener('input', () => {
    setPristine(false);
  });

  btnLogin.addEventListener('click', async () => {
    login();
  });

  btnReset.addEventListener('click', () => {
    reset();
  });
})();
