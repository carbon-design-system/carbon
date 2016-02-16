import '../../../../global/js/custom-event';
import OverflowMenu from '../../../../components/overflow-menu/overflow-menu';

describe('Test Overflow menu', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new OverflowMenu(); // eslint-disable-line no-new
      }).to.throw;
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new OverflowMenu(document.createTextNode('')); // eslint-disable-line no-new
      }).to.throw;
    });
  });

  describe('Toggling a single overflow-menu', function () {
    let element;
    before(function () {
      element = document.createElement('a');
      new OverflowMenu(element); // eslint-disable-line no-new
      document.body.appendChild(element);
    });

    it(`Instantiates without open class`, function () {
      expect(element.classList.contains('open')).to.be.false;
    });

    it(`Prevents default behavior of anchor element on click event`, function () {
      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
      expect(element.dispatchEvent(new CustomEvent('click', { cancelable: true }))).to.be.false;
    });

    it(`Adds open class on click event`, function () {
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('open')).to.be.true;
    });

    it(`Removes open class on click event`, function () {
      element.classList.add('open');
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('open')).to.be.false;
    });

    it(`Adds open class then removes open class on click events`, function () {
      element.dispatchEvent(new CustomEvent('click'));
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('open')).to.be.false;
    });

    afterEach(function () {
      element.classList.remove('open');
    });

    after(function () {
      document.body.removeChild(element);
    });
  });

  describe('Toggling multiple overflow-menus', function () {
    let element1;
    let element2;
    let element3;

    before(function () {
      element1 = document.createElement('a');
      element2 = document.createElement('a');
      element3 = document.createElement('a');
      element1.setAttribute('data-overflow-menu', '');
      element2.setAttribute('data-overflow-menu', '');
      element3.setAttribute('data-overflow-menu', '');
      new OverflowMenu(element1); // eslint-disable-line no-new
      new OverflowMenu(element2); // eslint-disable-line no-new
      new OverflowMenu(element3); // eslint-disable-line no-new
      document.body.appendChild(element1);
      document.body.appendChild(element2);
      document.body.appendChild(element3);
    });

    it('All overflow-menus should instatiate without an open class', function () {
      expect(element1.classList.contains('open')).to.be.false;
      expect(element2.classList.contains('open')).to.be.false;
      expect(element3.classList.contains('open')).to.be.false;
    });

    it('One overflow-menu should open at a time on click event', function () {
      element1.dispatchEvent(new CustomEvent('click'));
      expect(element1.classList.contains('open')).to.be.true;
      expect(element2.classList.contains('open')).to.be.false;
      expect(element3.classList.contains('open')).to.be.false;
    });

    it('One overflow-menu should open at a time on multiple click events', function () {
      element1.dispatchEvent(new CustomEvent('click'));
      element2.dispatchEvent(new CustomEvent('click'));
      expect(element1.classList.contains('open')).to.be.false;
      expect(element2.classList.contains('open')).to.be.true;
      expect(element3.classList.contains('open')).to.be.false;
    });

    afterEach(function () {
      element1.classList.remove('open');
      element2.classList.remove('open');
      element3.classList.remove('open');
    });

    after(function () {
      document.body.removeChild(element1);
      document.body.removeChild(element2);
      document.body.removeChild(element3);
    });
  });
});
