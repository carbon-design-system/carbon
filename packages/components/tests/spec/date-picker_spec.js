import DatePicker from '../../src/components/date-picker/date-picker';
import singleCalHTML from '../../html/date-picker/date-picker--single.html';
import rangeCalHTML from '../../html/date-picker/date-picker--range.html';

describe('Test date picker', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new DatePicker();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new DatePicker(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });
  });

  describe('Creating a date picker with a single mode calendar', function() {
    let element;
    let datePicker;
    let datePickerInput;
    let datePickerIcon;
    const container = document.createElement('div');
    container.innerHTML = singleCalHTML;

    beforeAll(function() {
      document.body.appendChild(container);
      element = document.querySelector('[data-date-picker]');
      datePicker = new DatePicker(element);
      datePickerInput = document.querySelector('[data-date-picker-input]');
      datePickerIcon = document.querySelector('[data-date-picker-icon]');
    });

    it('Should add a calendar', function() {
      expect(datePicker.calendar).not.toBe(undefined);
    });

    it('Should be a single calendar and not range mode', function() {
      expect(datePicker.calendar.config.mode === 'single').toBe(true);
    });

    it('Should show the calendar when the input field is clicked', function() {
      datePickerInput.dispatchEvent(
        new CustomEvent('focus', { bubbles: true })
      );
      expect(
        datePicker.calendar.calendarContainer.classList.contains('open')
      ).toBe(true);
    });

    it('Should show the calendar when the calendar icon is clicked', function() {
      datePickerIcon.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        datePicker.calendar.calendarContainer.classList.contains('open')
      ).toBe(true);
    });

    it('Should hide the calendar on click outside the date picker', function() {
      // Avoid using open() API as we force it open during the event loop where open() is called
      datePicker.calendar.calendarContainer.classList.add('open');
      datePicker.calendar.isOpen = true;
      container.dispatchEvent(
        Object.assign(new CustomEvent('mousedown', { bubbles: true }), {
          which: 1,
        })
      );
      expect(
        datePicker.calendar.calendarContainer.classList.contains('open')
      ).toBe(false);
    });

    it('Should update the selected date in the calendar when input changes', function() {
      datePickerInput.value = '10/10/2017';
      datePickerInput.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          detail: { isNotFromFlatpickr: true },
        })
      );
      expect(datePicker.calendar.selectedDates[0].valueOf()).toBe(
        datePicker.calendar.parseDate(datePickerInput.value).valueOf()
      );
    });

    afterEach(function() {
      // Quick way to get ready for next test before we set false to shouldForceOpen upon the timer
      datePicker.shouldForceOpen = false;
    });

    afterAll(function() {
      datePicker.release();
      document.body.removeChild(container);
    });
  });

  describe('Creating a date picker with a range mode calendar', function() {
    let element;
    let datePicker;
    let datePickerInputFrom;
    let datePickerInputTo;
    let datePickerIcon;
    const container = document.createElement('div');
    container.innerHTML = rangeCalHTML;

    beforeAll(function() {
      document.body.appendChild(container);
      element = document.querySelector('[data-date-picker]');
      datePicker = new DatePicker(element);
      datePickerInputFrom = document.querySelector(
        '[data-date-picker-input-from]'
      );
      datePickerInputTo = document.querySelector(
        '[data-date-picker-input-from]'
      );
      datePickerIcon = document.querySelector('[data-date-picker-icon]');
    });

    it('Should add a calendar', function() {
      expect(datePicker.calendar).not.toBe(undefined);
    });

    it('Should be a range calendar', function() {
      expect(datePicker.calendar.config.mode === 'range').toBe(true);
    });

    it('Should show the calendar when the first input field is clicked', function() {
      datePickerInputFrom.dispatchEvent(
        new CustomEvent('focus', { bubbles: true })
      );
      expect(
        datePicker.calendar.calendarContainer.classList.contains('open')
      ).toBe(true);
    });

    it('Should show the calendar when the second input field is clicked', function() {
      datePickerInputTo.dispatchEvent(
        new CustomEvent('focus', { bubbles: true })
      );
      expect(
        datePicker.calendar.calendarContainer.classList.contains('open')
      ).toBe(true);
    });

    it('Should show the calendar when the calendar icon is clicked', function() {
      datePickerIcon.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(
        datePicker.calendar.calendarContainer.classList.contains('open')
      ).toBe(true);
    });

    it('Should hide the calendar on click outside the date picker', function() {
      // Avoid using open() API as we force it open during the event loop where open() is called
      datePicker.calendar.calendarContainer.classList.add('open');
      datePicker.calendar.isOpen = true;
      container.dispatchEvent(
        Object.assign(new CustomEvent('mousedown', { bubbles: true }), {
          which: 1,
        })
      );
      expect(
        datePicker.calendar.calendarContainer.classList.contains('open')
      ).toBe(false);
    });

    it('Should update the selected date in the calendar when input changes', function() {
      datePickerInputFrom.value = '10/10/2017';
      datePickerInputFrom.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          detail: { isNotFromFlatpickr: true },
        })
      );
      expect(datePicker.calendar.selectedDates[0].valueOf()).toBe(
        datePicker.calendar.parseDate(datePickerInputFrom.value).valueOf()
      );
    });

    afterEach(function() {
      // Quick way to get ready for next test before we set false to shouldForceOpen upon the timer
      datePicker.shouldForceOpen = false;
    });

    afterAll(function() {
      datePicker.release();
      document.body.removeChild(container);
    });
  });
});
