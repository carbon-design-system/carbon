import Checkbox from '../../src/components/checkbox/checkbox';

describe('Checkbox', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new Checkbox();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new checkbox(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Test checkbox', function() {
    it('Should add checked attribute when it is checked', function() {
      element.checked = true;
      element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
      expect(element.hasAttribute('checked')).to.be.true;
    });
  
    it('Should remove checked attribute when it is unchecked', function() {
      element.setAttribute('checked', '');
      element.checked = false;
      element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
      expect(element.hasAttribute('checked')).to.be.false;
    });
  
    it('Should provide a way to remove event listener', function() {
      handle = handle.release();
      element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
      expect(element.hasAttribute('checked')).to.be.false;
    });
  });
});
/*
describe('Test checkbox', function() {
  let element;
  let handle;

  before(function() {
    handle = initCheckbox();
    element = document.createElement('input');
    element.type = 'checkbox';
    document.body.appendChild(element);
  });

  beforeEach(function() {
    element.removeAttribute('checked');
  });

  it('Should add checked attribute when it is checked', function() {
    element.checked = true;
    element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
    expect(element.hasAttribute('checked')).to.be.true;
  });

  it('Should remove checked attribute when it is unchecked', function() {
    element.setAttribute('checked', '');
    element.checked = false;
    element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
    expect(element.hasAttribute('checked')).to.be.false;
  });

  it('Should provide a way to remove event listener', function() {
    handle = handle.release();
    element.dispatchEvent(new CustomEvent('change', { bubbles: true }));
    expect(element.hasAttribute('checked')).to.be.false;
  });

  after(function() {
    if (handle) {
      handle = handle.release();
    }
    document.body.removeChild(element);
  });
});
*/
