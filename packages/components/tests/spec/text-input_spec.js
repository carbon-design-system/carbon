// only test JS class since it is only instantiated with password fields
import TextInput from '../../src/components/text-input/text-input';
import PasswordVisibilityHTML from '../../html/text-input/text-input--password.html';
import flattenOptions from '../utils/flatten-options';

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
        selectorPasswordField: `.bx--text-input[data-toggle-password-visibility]`,
        selectorPasswordVisibilityButton: `.bx--text-input--password__visibility__toggle`,
        selectorPasswordVisibilityTooltip: `.bx--text-input--password__visibility__toggle > .bx--assistive-text`,
        passwordIsVisible: `bx--text-input--password-visible`,
        svgIconVisibilityOn: 'svg.bx--icon--visibility-on',
        svgIconVisibilityOff: 'svg.bx--icon--visibility-off',
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
        '.bx--text-input--password__visibility__toggle'
      );
    });

    beforeEach(() => {
      textInput.classList.remove('bx--text-input--password-visible');
    });

    it('Should set password visibility state on 2n+1 clicks', () => {
      passwordVisibilityButton.dispatchEvent(
        new CustomEvent('click', { bubbles: true })
      );
      expect(
        textInput.classList.contains('bx--text-input--password-visible')
      ).toBe(true);
    });

    it('Should remove password visibility state on 2n clicks', () => {
      textInput.classList.add('bx--text-input--password-visible');
      passwordVisibilityButton.dispatchEvent(
        new CustomEvent('click', { bubbles: true })
      );
      expect(
        textInput.classList.contains('bx--text-input--password-visible')
      ).toBe(false);
    });

    afterAll(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
  });
});
