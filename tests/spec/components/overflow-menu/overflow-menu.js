import '../../../../global/js/custom-event';
import OverflowMenu from '../../../../components/overflow-menu/overflow-menu';

describe('Test overflow menu', function () {
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

  describe('Toggling', function () {
    let element;

    before(function () {
      element = document.createElement('a');
      new OverflowMenu(element); // eslint-disable-line no-new
      document.body.appendChild(element);
    });

    it(`Should cancel the event for <a>`, function () {
      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
      expect(element.dispatchEvent(new CustomEvent('click', { cancelable: true }))).to.be.false;
    });

    it(`Should turn to open state from closed state`, function () {
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('open')).to.be.true;
    });

    it(`Should turn to closed state from open state`, function () {
      element.classList.add('open');
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
});
