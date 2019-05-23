import TextArea from '../../src/components/text-area/text-area';
import TextAreaHTML from '../../html/text-area/text-area.html';
import CharacterCounterHTML from '../../html/text-area/text-area--character-counter.html';
import flattenOptions from '../utils/flatten-options';
import { prefix } from '../../src/globals/js/settings';

describe('Test textarea', () => {
  describe('Constructor', () => {
    let instance;
    const container = document.createElement('div');
    container.innerHTML = TextAreaHTML;

    beforeAll(() => {
      document.body.appendChild(container);
      instance = new TextArea(document.querySelector('[data-text-area]'));
    });

    it('Should throw if root element is not given', () => {
      expect(() => {
        new TextArea();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', () => {
      expect(() => {
        new TextArea(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should set default options', () => {
      expect(flattenOptions(instance.options)).toEqual({
        selectorInit: '[data-text-area]',
        selectorCharCounter: `.${prefix}--text-area--character-counter--length`,
      });
    });

    afterAll(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });

  describe('Character counter', () => {
    let textArea;
    let charCounter;
    const container = document.createElement('div');
    container.innerHTML = CharacterCounterHTML;
    const aKeyInput = new InputEvent('input', {
      inputType: 'insertText',
      type: 'input',
      bubbles: true,
      data: 'a',
    });
    if (!aKeyInput.data) {
      aKeyInput.data = 'a';
    }
    const deleteKeyInput = new InputEvent('input', {
      inputType: 'deleteContentBackward',
      type: 'input',
      bubbles: true,
      data: null,
    });

    beforeAll(() => {
      document.body.appendChild(container);
      new TextArea(document.querySelector('[data-text-area]'));
      textArea = document.querySelector('[data-text-area] textarea');
      charCounter = document.querySelector(
        `.${prefix}--text-area--character-counter--length`
      );
    });

    beforeEach(() => {
      textArea.value = '';
    });

    it('Should increment character counter on input value length increase', () => {
      textArea.value += aKeyInput.data;
      textArea.dispatchEvent(aKeyInput);
      expect(textArea.value).toBe('a');
      expect(charCounter.textContent).toBe('1');
    });

    it('Should decrement character counter on input value length decrease', () => {
      textArea.dispatchEvent(deleteKeyInput);
      expect(textArea.value).toBe('');
      expect(charCounter.textContent).toBe('0');
    });

    afterAll(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });
});
