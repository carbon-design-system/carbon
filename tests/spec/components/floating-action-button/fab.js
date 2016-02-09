import '../../../../global/js/custom-event';
import FabButton from '../../../../components/floating-action-button/fab';

describe('Test floating action button', function () {
  describe('Constructor', function () {
    it(`Should throw if root element is not given`, function () {
      expect(() => {
        new FabButton(); // eslint-disable-line no-new
      }).to.throw;
    });

    it(`Should throw if root element is not a DOM element`, function () {
      expect(() => {
        new FabButton(document.createTextNode('')); // eslint-disable-line no-new
      }).to.throw;
    });
  });

  describe('Toggling', function () {
    let element;

    before(function () {
      element = document.createElement('a');
      new FabButton(element); // eslint-disable-line no-new
      document.body.appendChild(element);
    });

    it(`Should cancel the event for <a>`, function () {
      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
      expect(element.dispatchEvent(new CustomEvent('click', { cancelable: true }))).to.be.false;
    });

    it(`Should turn to open state from closed state`, function () {
      element.classList.add('fab--close');
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('fab--close')).to.be.false;
    });

    it(`Should turn to closed state from open state`, function () {
      element.dispatchEvent(new CustomEvent('click'));
      expect(element.classList.contains('fab--close')).to.be.true;
    });

    afterEach(function () {
      element.classList.remove('fab--close');
    });

    after(function () {
      document.body.removeChild(element);
    });
  });
});
