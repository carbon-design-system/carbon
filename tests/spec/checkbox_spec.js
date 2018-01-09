import Checkbox from '../../src/components/checkbox/checkbox';
import HTML from '../../src/components/checkbox/checkbox.html';

describe('Test Checkbox', function() {
  describe('Constructor', function() {
    let element;
    let instance;
    let container;

    before(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('.bx--checkbox');
      instance = new Checkbox(element);
    });

    it('Should throw if root element is not given', function() {
      expect(() => {
        new Checkbox();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new Checkbox(document.createTextNode(''));
      }).to.throw(Error);
    });

    it('should set default options', function() {
      expect(instance.options).to.deep.equal({
        selectorInit: '.bx--checkbox',
      });
    });

    after(function() {
      document.body.removeChild(container);
      instance.release();
    });
  });

  describe('Test Checkbox', function() {
    let container;
    let elem;
    let checkbox;

    before(function() {
      container = document.createElement('div');
      elem = document.createElement('input');
      elem.setAttribute('type', 'checkbox');
      container.appendChild(elem);
      checkbox = Checkbox.create(elem);
    });

    beforeEach(function() {
      container.classList.add('bx--checkbox-label');
      container.setAttribute('data-contained-checkbox-state', 'false');
      elem.setAttribute('aria-checked', 'false');
      elem.removeAttribute('checked');
      elem.checked = false;
      elem.indeterminate = false;
    });

    it('setState should support mixed state', function() {
      checkbox.setState('mixed');
      expect(elem.indeterminate, 'indeterminate on element').to.be.true;
      expect(elem.checked, 'checked prop on element').to.be.false;
      expect(elem.getAttribute('aria-checked')).to.equal('mixed');
    });

    it('setState should support checked state', function() {
      checkbox.setState('true');
      expect(elem.indeterminate, 'indeterminate on element').to.be.false;
      expect(elem.checked, 'checked prop on element').to.be.true;
      expect(elem.getAttribute('aria-checked')).to.equal('true');
    });

    it('setState should support unchecked state', function() {
      checkbox.setState('false');
      expect(elem.indeterminate, 'indeterminate on element').to.be.false;
      expect(elem.checked, 'checked prop on element').to.be.false;
      expect(elem.getAttribute('aria-checked')).to.equal('false');
    });

    it('Should check checkbox on click', function() {
      elem.checked = true;
      elem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(elem.checked, 'checked prop on element').to.be.true;
    });

    it('Should uncheck checkbox on click', function() {
      elem.checked = false;
      elem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(elem.checked, 'checked prop on element').to.be.false;
    });

    it('Should show the checkbox upon focusing in nested checkbox', function() {
      container.classList.add('bx--checkbox-label');
      elem.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      expect(container.classList.contains('bx--checkbox-label__focus')).to.be.true;
    });

    it('Should hide the checkbox upon blur in nested checkbox', function() {
      container.classList.add('bx--checkbox-label');
      container.classList.add('bx--checkbox-label__focus');
      elem.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      expect(container.classList.contains('bx--checkbox-label__focus')).to.be.false;
    });

    after(function() {
      if (checkbox) {
        checkbox = checkbox.release();
      }
    });
  });
});
