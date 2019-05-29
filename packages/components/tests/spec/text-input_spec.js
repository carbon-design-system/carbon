// only test JS class since it is only instantiated with password fields
import TextInput from '../../src/components/text-input/text-input';
import PasswordVisibilityHTML from '../../html/text-input/text-input--password.html';
import CharacterCounterHTML from '../../html/text-input/text-input--character-counter.html';
import flattenOptions from '../utils/flatten-options';
import { prefix } from '../../src/globals/js/settings';

describe('Test text input', () => {
  describe('Constructor', () => {
    let instance;
    const container = document.createElement('div');
    container.innerHTML = PasswordVisibilityHTML;

    beforeAll(() => {
      document.body.appendChild(container);
      instance = new TextInput(document.querySelector('[data-text-input]'));
    });

    it('Should throw if root element is not given', () => {
      expect(() => {
        new TextInput();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', () => {
      expect(() => {
        new TextInput(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should set default options', () => {
      expect(flattenOptions(instance.options)).toEqual({
        selectorInit: '[data-text-input]',
        selectorPasswordField: `.${prefix}--text-input[data-toggle-password-visibility]`,
        selectorPasswordVisibilityButton: `.${prefix}--text-input--password__visibility`,
        passwordIsVisible: `${prefix}--text-input--password-visible`,
        svgIconVisibilityOn: `svg.${prefix}--icon--visibility-on`,
        svgIconVisibilityOff: `svg.${prefix}--icon--visibility-off`,
        selectorCharCounter: `.${prefix}--text-input--character-counter--length`,
      });
    });

    afterAll(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });

  describe('Clicking password visibility button', () => {
    let textInput;
    let passwordVisibilityButton;
    const container = document.createElement('div');
    container.innerHTML = PasswordVisibilityHTML;

    beforeAll(() => {
      document.body.appendChild(container);
      new TextInput(document.querySelector('[data-text-input]'));
      textInput = document.querySelector('[data-text-input]');
      passwordVisibilityButton = document.querySelector(
        `.${prefix}--text-input--password__visibility`
      );
    });

    beforeEach(() => {
      textInput.classList.remove(`${prefix}--text-input--password-visible`);
    });

    it('Should set password visibility state on 2n+1 clicks', () => {
      passwordVisibilityButton.dispatchEvent(
        new CustomEvent('click', { bubbles: true })
      );
      expect(
        textInput.classList.contains(`${prefix}--text-input--password-visible`)
      ).toBe(true);
    });

    it('Should remove password visibility state on 2n clicks', () => {
      textInput.classList.add(`${prefix}--text-input--password-visible`);
      passwordVisibilityButton.dispatchEvent(
        new CustomEvent('click', { bubbles: true })
      );
      expect(
        textInput.classList.contains(`${prefix}--text-input--password-visible`)
      ).toBe(false);
    });

    afterAll(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });

  describe('Character counter', () => {
    let textInput;
    let charCounter;
    const container = document.createElement('div');
    container.innerHTML = CharacterCounterHTML;
    const aKeyInput = new InputEvent('input', {
      inputType: 'insertText',
      type: 'input',
      bubbles: true,
      data: 'a',
    });
    const deleteKeyInput = new InputEvent('input', {
      inputType: 'deleteContentBackward',
      type: 'input',
      bubbles: true,
      data: null,
    });
    if (!aKeyInput.data) {
      aKeyInput.data = 'a';
    }

    beforeAll(() => {
      document.body.appendChild(container);
      new TextInput(document.querySelector('[data-text-input]'));
      textInput = document.querySelector('[data-text-input] input');
      charCounter = document.querySelector(
        `.${prefix}--text-input--character-counter--length`
      );
    });

    beforeEach(() => {
      textInput.value = '';
    });

    it('Should increment character counter on input value length increase', () => {
      textInput.value += aKeyInput.data;
      textInput.dispatchEvent(aKeyInput);
      expect(textInput.value).toBe('a');
      expect(charCounter.textContent).toBe('1');
    });

    it('Should decrement character counter on input value length decrease', () => {
      textInput.dispatchEvent(deleteKeyInput);
      expect(textInput.value).toBe('');
      expect(charCounter.textContent).toBe('0');
    });

    afterAll(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });
});
