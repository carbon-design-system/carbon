import ProductSwitcher from '../../src/components/ui-shell/product-switcher';
import UiShellHtml from '../../html/ui-shell/ui-shell.html';

describe('Popup Nav', function () {
  describe('Constructor', function () {
    let productSwitcher;

    it('Should throw if root element is not given', function () {
      expect(() => {
        productSwitcher = new ProductSwitcher();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        productSwitcher = new ProductSwitcher(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    afterEach(function () {
      if (productSwitcher) {
        productSwitcher = productSwitcher.release();
      }
    });
  });

  describe('Init Component by Launch functionality', function () {
    let button;
    let productSwitcher;
    let context;

    beforeAll(function () {
      const range = document.createRange();
      button = range
        .createContextualFragment(UiShellHtml)
        .querySelector('[data-product-switcher-target]');
      productSwitcher = range
        .createContextualFragment(UiShellHtml)
        .querySelector('[data-product-switcher]');
      document.body.appendChild(button);
      document.body.appendChild(productSwitcher);
      context = ProductSwitcher.init();
    });

    beforeEach(function () {
      button.classList.remove('bx--header__action--active');
      productSwitcher.classList.remove('bx--panel--expanded');
    });

    it('Should open the popup nav on button click', function () {
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(button.classList.contains('bx--header__action--active')).toBe(
        true
      );
      expect(productSwitcher.classList.contains('bx--panel--expanded')).toBe(
        true
      );
    });

    it('Should close an open popup nav on button click', function () {
      productSwitcher.classList.add('bx--panel--expanded');
      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(button.classList.contains('bx--header__action--active')).toBe(
        false
      );
      expect(productSwitcher.classList.contains('bx--panel--expanded')).toBe(
        false
      );
    });

    afterAll(function () {
      document.body.removeChild(button);
      document.body.removeChild(productSwitcher);
      context.release();
    });
  });
});
