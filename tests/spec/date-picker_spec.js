import 'core-js/modules/es6.weak-map'; // For PhantomJS
import DatePicker from '../../src/components/date-picker/date-picker';
import noCalHTML from '../../src/components/date-picker/date-picker--without-calendar.html';
import singleCalHTML from '../../src/components/date-picker/date-picker--single-calendar.html';

describe('Test data picker', function () {
  describe('Constructor', function () {
    it('Should throw if root element is not given', function () {
      expect(() => {
        new DatePicker();
      }).to.throw(Error);
    });

    it('Should throw if root element is not a DOM element', function () {
      expect(() => {
        new DatePicker(document.createTextNode(''));
      }).to.throw(Error);
    });
  });

  describe('Creating a date picker without calendar', function () {
    let element;
    let datePicker;
    const container = document.createElement('div');
    container.innerHTML = noCalHTML;

    before(function () {
      document.body.appendChild(container);
      element = document.querySelector('[data-date-picker]');
      datePicker = new DatePicker(element);
    });

    it('Should not add a calendar', function () {
      expect(element.calendar).to.be.undefined;
    });

    after(function () {
      datePicker.release();
      document.body.removeChild(container);
    });
  });

  describe('Creating a date picker with a single mode calendar', function () {
    let element;
    let datePicker;
    let datePickerInput;
    let datePickerIcon;
    const container = document.createElement('div');
    container.innerHTML = singleCalHTML;

    before(function () {
      document.body.appendChild(container);
      element = document.querySelector('[data-date-picker]');
      datePicker = new DatePicker(element);
      datePickerInput = document.querySelector('[data-date-picker-input]');
      datePickerIcon = document.querySelector('[data-date-picker-icon]');
    });

    it('Should add a calendar', function () {
      expect(element.calendar).not.to.be.undefined;
    });

    it('Should show the calendar when the input field is clicked', function () {
      datePickerInput.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      expect(element.calendar.calendarContainer.classList.contains('open')).to.be.true;
    });

    it('Should show the calendar when the calendar icon is clicked', function () {
      datePickerIcon.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.calendar.calendarContainer.classList.contains('open')).to.be.true;
    });

    it('Should hide the calendar on click outside the date picker', function () {
      element.calendar.close();
      container.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.calendar.calendarContainer.classList.contains('open')).to.be.false;
    });

    it('Should hide the calendar on click outside the date picker', function () {
      element.calendar.close();
      container.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(element.calendar.calendarContainer.classList.contains('open')).to.be.false;
    });

    it('Should update the input field with the selected date', function () {
      element.calendar.open();
      element.calendar.calendarContainer.querySelector('.flatpickr-day').dispatchEvent(new CustomEvent('click', { bubbles: true }));
    });

    after(function () {
      datePicker.release();
      document.body.removeChild(container);
    });
  });
});
