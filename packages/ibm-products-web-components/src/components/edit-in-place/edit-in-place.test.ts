/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  describe,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  it,
  expect,
  vi,
} from 'vitest';
import { prefix } from '../../globals/settings';
import './index';

// Suppress unhandled errors from Carbon tooltip cleanup during test teardown.
const originalAddEventListener = document.addEventListener;

beforeAll(() => {
  document.addEventListener = function (
    type: string,
    listener: any,
    options?: any
  ) {
    if (type === 'click') {
      const wrappedListener = (e: Event) => {
        try {
          listener(e);
        } catch (error) {
          // Suppress only tooltip cleanup errors during test teardown
          if (
            error instanceof TypeError &&
            error.message.includes('assignedElements')
          ) {
            return;
          }
          throw error;
        }
      };
      return originalAddEventListener.call(
        this,
        type,
        wrappedListener,
        options
      );
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
});

afterAll(() => {
  document.addEventListener = originalAddEventListener;
});

const template = (props: any = {}) => {
  const {
    cancelLabel = 'Cancel',
    editAlwaysVisible = false,
    editLabel = 'Edit',
    id = 'test-edit-in-place',
    inheritTypography = false,
    invalid = false,
    invalidText = 'Invalid',
    labelText = 'Test label',
    placeholder = 'Placeholder',
    readOnly = false,
    readOnlyLabel = 'Edit off',
    saveLabel = 'Save',
    size = 'sm',
    tooltipAlignment = 'top',
    value = 'Test value',
  } = props;

  return html`
    <c4p-edit-in-place
      id=${ifDefined(id)}
      cancel-label=${ifDefined(cancelLabel)}
      ?edit-always-visible=${editAlwaysVisible}
      edit-label=${ifDefined(editLabel)}
      ?inherit-typography=${inheritTypography}
      ?invalid=${invalid}
      invalid-text=${ifDefined(invalidText)}
      label-text=${ifDefined(labelText)}
      placeholder=${ifDefined(placeholder)}
      ?read-only=${readOnly}
      read-only-label=${ifDefined(readOnlyLabel)}
      save-label=${ifDefined(saveLabel)}
      size=${ifDefined(size)}
      tooltip-alignment=${ifDefined(tooltipAlignment)}
      value=${ifDefined(value)}
    ></c4p-edit-in-place>
  `;
};

describe(`${prefix}-edit-in-place`, () => {
  let elem: HTMLElement;

  beforeEach(() => {
    elem = document.createElement('div');
    document.body.appendChild(elem);
  });

  afterEach(() => {
    elem?.remove();
  });

  describe('Rendering', () => {
    it('should render with default values', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      expect(editInPlace).toBeTruthy();
    });

    it('should render with custom value', async () => {
      render(template({ value: 'Custom value' }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(`${prefix}-edit-in-place`) as any;
      expect(editInPlace.value).toBe('Custom value');
    });

    it('should render input element', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const input = editInPlace.shadowRoot?.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('should render with correct size class', async () => {
      render(template({ size: 'md' }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const container = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place--md`
      );
      expect(container).toBeTruthy();
    });

    it('should render edit button when not focused', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const editBtn = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__btn-edit`
      );
      expect(editBtn).toBeTruthy();
    });

    it('should show edit button always when editAlwaysVisible is true', async () => {
      render(template({ editAlwaysVisible: true }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const editBtn = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__btn-edit--always-visible`
      );
      expect(editBtn).toBeTruthy();
    });
  });

  describe('Invalid state', () => {
    it('should render invalid state', async () => {
      render(template({ invalid: true, invalidText: 'Error message' }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const container = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place--invalid`
      );
      expect(container).toBeTruthy();
    });

    it('should render invalid text', async () => {
      render(template({ invalid: true, invalidText: 'Error message' }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const warningText = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__warning-text`
      );
      expect(warningText?.textContent?.trim()).toBe('Error message');
    });

    it('should render warning icon when invalid', async () => {
      render(template({ invalid: true }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const warningIcon = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__warning-icon`
      );
      expect(warningIcon).toBeTruthy();
    });
  });

  describe('Read-only state', () => {
    it('should render read-only button', async () => {
      render(template({ readOnly: true }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const readOnlyBtn = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__btn-readonly`
      );
      expect(readOnlyBtn).toBeTruthy();
    });

    it('should have readonly attribute on input', async () => {
      render(template({ readOnly: true }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;
      expect(input.readOnly).toBe(true);
    });
  });

  describe('Events', () => {
    it('should fire change event when input value changes', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      const changeHandler = vi.fn();
      editInPlace.addEventListener(
        `${prefix}-edit-in-place-change`,
        changeHandler
      );

      input.value = 'New value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await Promise.resolve();

      expect(changeHandler).toHaveBeenCalled();
      expect(changeHandler.mock.calls[0][0].detail.value).toBe('New value');
    });

    it('should fire save event when save button is clicked', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(`${prefix}-edit-in-place`) as any;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      // Enter edit mode
      input.focus();
      await Promise.resolve();

      // Change value
      input.value = 'New value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await Promise.resolve();

      const saveHandler = vi.fn();
      editInPlace.addEventListener(`${prefix}-edit-in-place-save`, saveHandler);

      const saveBtn = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__btn-save`
      ) as HTMLElement;
      saveBtn?.click();
      await Promise.resolve();

      expect(saveHandler).toHaveBeenCalled();
    });

    it('should fire cancel event when cancel button is clicked', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(`${prefix}-edit-in-place`) as any;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      // Enter edit mode
      input.focus();
      await Promise.resolve();

      // Change value
      input.value = 'New value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await Promise.resolve();

      const cancelHandler = vi.fn();
      editInPlace.addEventListener(
        `${prefix}-edit-in-place-cancel`,
        cancelHandler
      );

      const cancelBtn = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__btn-cancel`
      ) as HTMLElement;
      cancelBtn?.click();
      await Promise.resolve();

      expect(cancelHandler).toHaveBeenCalled();
    });
  });

  describe('Keyboard interactions', () => {
    it('should save on Enter key', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(`${prefix}-edit-in-place`) as any;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      // Enter edit mode
      input.focus();
      await Promise.resolve();

      // Change value
      input.value = 'New value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await Promise.resolve();

      const saveHandler = vi.fn();
      editInPlace.addEventListener(`${prefix}-edit-in-place-save`, saveHandler);

      // Press Enter
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      });
      input.dispatchEvent(enterEvent);
      await Promise.resolve();

      expect(saveHandler).toHaveBeenCalled();
    });

    it('should cancel on Escape key', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(`${prefix}-edit-in-place`) as any;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      // Enter edit mode
      input.focus();
      await Promise.resolve();

      // Change value
      input.value = 'New value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await Promise.resolve();

      const cancelHandler = vi.fn();
      editInPlace.addEventListener(
        `${prefix}-edit-in-place-cancel`,
        cancelHandler
      );

      // Press Escape
      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      input.dispatchEvent(escapeEvent);
      await Promise.resolve();

      expect(cancelHandler).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on input', async () => {
      render(template({ labelText: 'Accessible label' }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;
      expect(input.getAttribute('aria-label')).toBe('Accessible label');
    });

    it('should have aria-invalid when invalid', async () => {
      render(template({ invalid: true }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('Focus behavior', () => {
    it('should exit edit mode when clicking outside the component', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(`${prefix}-edit-in-place`) as any;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      // Enter edit mode
      input.focus();
      await Promise.resolve();

      // Verify we're in edit mode (save/cancel buttons should be visible)
      let saveBtn = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__btn-save`
      );
      expect(saveBtn).toBeTruthy();

      // Change value
      input.value = 'New value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await Promise.resolve();

      // Create an element outside the component to click on
      const outsideElement = document.createElement('button');
      document.body.appendChild(outsideElement);

      // Simulate click outside by dispatching click event on the outside element
      outsideElement.click();
      await Promise.resolve();

      // Verify we've exited edit mode (save/cancel buttons should be gone)
      saveBtn = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__btn-save`
      );
      expect(saveBtn).toBeFalsy();

      // Cleanup
      outsideElement.remove();
    });

    it('should auto-save when clicking outside with valid changes', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(`${prefix}-edit-in-place`) as any;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      const saveHandler = vi.fn();
      editInPlace.addEventListener(`${prefix}-edit-in-place-save`, saveHandler);

      // Enter edit mode
      input.focus();
      await Promise.resolve();

      // Change value
      input.value = 'New value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await Promise.resolve();

      // Create an element outside the component to click on
      const outsideElement = document.createElement('button');
      document.body.appendChild(outsideElement);

      // Simulate click outside by dispatching click event on the outside element
      outsideElement.click();
      await Promise.resolve();

      // Verify save was called
      expect(saveHandler).toHaveBeenCalled();

      // Cleanup
      outsideElement.remove();
    });

    it('should auto-cancel when clicking outside without changes', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(`${prefix}-edit-in-place`) as any;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      const cancelHandler = vi.fn();
      editInPlace.addEventListener(
        `${prefix}-edit-in-place-cancel`,
        cancelHandler
      );

      // Enter edit mode
      input.focus();
      await Promise.resolve();

      // Don't change value, just click outside
      const outsideElement = document.createElement('button');
      document.body.appendChild(outsideElement);

      // Simulate click outside by dispatching click event on the outside element
      outsideElement.click();
      await Promise.resolve();

      // Verify cancel was called
      expect(cancelHandler).toHaveBeenCalled();

      // Cleanup
      outsideElement.remove();
    });

    it('should remain in edit mode when clicking within the component', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(`${prefix}-edit-in-place`) as any;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      // Enter edit mode
      input.focus();
      await Promise.resolve();

      // Change value
      input.value = 'New value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await Promise.resolve();

      // Click on the input itself (within component)
      input.click();
      await Promise.resolve();

      // Verify we're still in edit mode
      const saveBtn = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__btn-save`
      );
      expect(saveBtn).toBeTruthy();
    });

    it('should exit edit mode when tabbing out without changes', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(`${prefix}-edit-in-place`) as any;
      const input = editInPlace.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      const cancelHandler = vi.fn();
      editInPlace.addEventListener(
        `${prefix}-edit-in-place-cancel`,
        cancelHandler
      );

      // Enter edit mode
      input.focus();
      await Promise.resolve();

      // Verify we're in edit mode
      let saveBtn = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__btn-save`
      );
      expect(saveBtn).toBeTruthy();

      // Don't change value, just press Tab
      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
      });
      input.dispatchEvent(tabEvent);
      await Promise.resolve();

      // Verify cancel was called
      expect(cancelHandler).toHaveBeenCalled();

      // Verify we've exited edit mode
      saveBtn = editInPlace.shadowRoot?.querySelector(
        `.${prefix}--edit-in-place__btn-save`
      );
      expect(saveBtn).toBeFalsy();
    });
  });

  describe('CSS Parts', () => {
    it('should expose input part', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const input = editInPlace.shadowRoot?.querySelector('[part="input"]');
      expect(input).toBeTruthy();
    });

    it('should expose actions part', async () => {
      render(template(), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const actions = editInPlace.shadowRoot?.querySelector('[part="actions"]');
      expect(actions).toBeTruthy();
    });

    it('should expose invalid-text part when invalid', async () => {
      render(template({ invalid: true }), elem);
      await Promise.resolve();

      const editInPlace = elem.querySelector(
        `${prefix}-edit-in-place`
      ) as HTMLElement;
      const invalidText = editInPlace.shadowRoot?.querySelector(
        '[part="invalid-text"]'
      );
      expect(invalidText).toBeTruthy();
    });
  });
});
