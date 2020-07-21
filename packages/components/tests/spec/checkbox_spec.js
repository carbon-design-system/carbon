import Checkbox from '../../src/components/checkbox/checkbox';
import HTML from '../../html/checkbox/checkbox.html';
import flattenOptions from '../utils/flatten-options';

describe('Test Checkbox', function () {
  describe('Constructor', function () {
    let element;
    let instance;
    let container;

    beforeAll(function () {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('.bx--checkbox');
      instance = new Checkbox(element);
    });

    it('Should throw if root element is not given', function () {
      expect(() => {
        new Checkbox();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new Checkbox(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('should set default options', function () {
      expect(flattenOptions(instance.options)).toEqual({
        selectorInit: '.bx--checkbox',
        selectorContainedCheckboxState: '[data-contained-checkbox-state]',
        selectorContainedCheckboxDisabled: '[data-contained-checkbox-disabled]',
        classLabel: 'bx--checkbox-label',
        classLabelFocused: 'bx--checkbox-label__focus',
        attribContainedCheckboxState: 'data-contained-checkbox-state',
        attribContainedCheckboxDisabled: 'data-contained-checkbox-disabled',
      });
    });

    afterAll(function () {
      document.body.removeChild(container);
      instance.release();
    });
  });

  describe('Test Checkbox', function () {
    let container;
    let elem;
    let checkbox;

    beforeAll(function () {
      container = document.createElement('div');
      elem = document.createElement('input');
      elem.setAttribute('type', 'checkbox');
      container.appendChild(elem);
      checkbox = Checkbox.create(elem);
    });

    beforeEach(function () {
      container.classList.add('bx--checkbox-label');
      container.setAttribute('data-contained-checkbox-state', 'false');
      elem.setAttribute('aria-checked', 'false');
      elem.removeAttribute('checked');
      elem.checked = false;
      elem.indeterminate = false;
    });

    it('setState should support mixed state', function () {
      checkbox.setState('mixed');
      expect(elem.indeterminate, 'indeterminate on element').toBe(true);
      expect(elem.checked, 'checked prop on element').toBe(false);
      expect(elem.getAttribute('aria-checked')).toBe('mixed');
    });

    it('setState should support checked state', function () {
      checkbox.setState('true');
      expect(elem.indeterminate, 'indeterminate on element').toBe(false);
      expect(elem.checked, 'checked prop on element').toBe(true);
      expect(elem.getAttribute('aria-checked')).toBe('true');
    });

    it('setState should support unchecked state', function () {
      checkbox.setState('false');
      expect(elem.indeterminate, 'indeterminate on element').toBe(false);
      expect(elem.checked, 'checked prop on element').toBe(false);
      expect(elem.getAttribute('aria-checked')).toBe('false');
    });

    it('Should check checkbox on click', function () {
      elem.checked = true;
      elem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(elem.checked, 'checked prop on element').toBe(true);
    });

    it('Should uncheck checkbox on click', function () {
      elem.checked = false;
      elem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(elem.checked, 'checked prop on element').toBe(false);
    });

    it('Should show the checkbox upon focusing in nested checkbox', function () {
      container.classList.add('bx--checkbox-label');
      elem.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      expect(container.classList.contains('bx--checkbox-label__focus')).toBe(
        true
      );
    });

    it('Should hide the checkbox upon blur in nested checkbox', function () {
      container.classList.add('bx--checkbox-label');
      container.classList.add('bx--checkbox-label__focus');
      elem.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      expect(container.classList.contains('bx--checkbox-label__focus')).toBe(
        false
      );
    });

    afterAll(function () {
      if (checkbox) {
        checkbox = checkbox.release();
      }
    });
  });
});
