import 'core-js/modules/es6.weak-map'; // For PhantomJS
import TimePicker from '../../src/components/time-picker/time-picker';
import timePickerHTML from '../../src/components/time-picker/time-picker.html';

describe('Test data picker', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new TimePicker();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new TimePicker(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Create a time picker', function () {
    let element;
    let timePicker;
    const container = document.createElement('div');
    container.innerHTML = timePickerHTML;

    before(function () {
      document.body.appendChild(container);
      element = document.querySelector('[data-time-picker]');
      timePicker = new TimePicker(element);
    });

    after(function () {
      timePicker.release();
      document.body.removeChild(container);
    });
  });
});
