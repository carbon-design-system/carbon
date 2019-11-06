/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pressTab, pressShiftTab, pressEnter, pressSpace } from '../keyboard';

afterEach(() => {
  // Clear out any modifications to `document.body` after each test run
  document.body.innerHTML = '';
});

test('pressTab should shift focus to the next focusable element', () => {
  const button1 = document.createElement('button');
  button1.textContent = 'Test button 1';
  const button2 = document.createElement('button');
  button2.textContent = 'Test button 2';

  document.body.appendChild(button1);
  // Add a non-interactive element in between our interactive elements. If this
  // receives focus, something is wrong with how we determine tab order
  document.body.appendChild(document.createElement('span'));
  document.body.appendChild(button2);

  expect(document.activeElement === document.body).toBe(true);
  pressTab();
  expect(document.activeElement === button1).toBe(true);
  pressTab();
  expect(document.activeElement === button2).toBe(true);
  pressTab();
  expect(document.activeElement === button1).toBe(true);
});

test('pressShiftTab should shift focus to the previous focusable element', () => {
  const button1 = document.createElement('button');
  button1.textContent = 'Test button 1';
  const button2 = document.createElement('button');
  button2.textContent = 'Test button 2';

  document.body.appendChild(button1);
  document.body.appendChild(document.createElement('span'));
  document.body.appendChild(button2);

  expect(document.activeElement === document.body).toBe(true);
  pressShiftTab();
  expect(document.activeElement === button2).toBe(true);
  pressShiftTab();
  expect(document.activeElement === button1).toBe(true);
  pressShiftTab();
  expect(document.activeElement === button2).toBe(true);
});

test('pressEnter should dispatch an additional click event on a button', () => {
  const button = document.createElement('button');
  const buttonOnClick = jest.fn();
  const buttonOnKeyDown = jest.fn();

  const span = document.createElement('span');
  const spanOnClick = jest.fn();
  const spanOnKeyDown = jest.fn();

  button.addEventListener('click', buttonOnClick);
  button.addEventListener('keydown', buttonOnKeyDown);

  span.addEventListener('click', spanOnClick);
  span.addEventListener('keydown', spanOnKeyDown);

  pressEnter(button);
  expect(buttonOnClick).toHaveBeenCalledTimes(1);
  expect(buttonOnKeyDown).toHaveBeenCalledTimes(1);
  expect(buttonOnKeyDown).toHaveBeenLastCalledWith(
    expect.objectContaining({
      key: 'Enter',
    })
  );

  pressEnter(span);
  expect(spanOnClick).not.toHaveBeenCalled();
  expect(spanOnKeyDown).toHaveBeenCalledTimes(1);
  expect(spanOnKeyDown).toHaveBeenLastCalledWith(
    expect.objectContaining({
      key: 'Enter',
    })
  );
});

test('pressSpace should dispatch an additional click event on a button', () => {
  const button = document.createElement('button');
  const buttonOnClick = jest.fn();
  const buttonOnKeyDown = jest.fn();

  const span = document.createElement('span');
  const spanOnClick = jest.fn();
  const spanOnKeyDown = jest.fn();

  button.addEventListener('click', buttonOnClick);
  button.addEventListener('keydown', buttonOnKeyDown);

  span.addEventListener('click', spanOnClick);
  span.addEventListener('keydown', spanOnKeyDown);

  pressSpace(button);
  expect(buttonOnClick).toHaveBeenCalledTimes(1);
  expect(buttonOnKeyDown).toHaveBeenCalledTimes(1);
  expect(buttonOnKeyDown).toHaveBeenLastCalledWith(
    expect.objectContaining({
      key: 'Space',
    })
  );

  pressSpace(span);
  expect(spanOnClick).not.toHaveBeenCalled();
  expect(spanOnKeyDown).toHaveBeenCalledTimes(1);
  expect(spanOnKeyDown).toHaveBeenLastCalledWith(
    expect.objectContaining({
      key: 'Space',
    })
  );
});
