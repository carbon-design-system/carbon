import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Flatpickr from 'flatpickr';
import ReactDOM from 'react-dom';

// Weekdays shorthand for english locale
Flatpickr.l10ns.en.weekdays.shorthand.forEach((day, index) => {
  const currentDay = Flatpickr.l10ns.en.weekdays.shorthand;
  if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
    currentDay[index] = 'Th';
  } else {
    currentDay[index] = currentDay[index].charAt(0);
  }
});

class DatePicker extends Component {
  state = {
    cal: {},
  };

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    short: PropTypes.bool,
    datePickerType: PropTypes.string,
    dateFormat: PropTypes.string,
  };

  static defaultProps = {
    short: false,
    dateFormat: 'm/d/Y',
  };

  componentDidMount() {
    if (
      this.props.datePickerType === 'single' ||
      this.props.datePickerType === 'range'
    ) {
      this.initDatePickerCalendar();
    }
  }

  componentWillUnmount() {
    if (
      this.props.datePickerType === 'range' ||
      this.props.datePickerType === 'single'
    ) {
      this.state.cal.destroy();
    }
  }

  addKeyboardEvents = cal => {
    const input = ReactDOM.findDOMNode(this.inputField).querySelector(
      '.bx--date-picker__input'
    );
    input.addEventListener('keydown', e => {
      if (e.which === 40) {
        cal.calendarContainer.focus();
      }
    });
    cal.calendarContainer.addEventListener('keydown', e => {
      if (e.which === 9 && this.props.datePickerType === 'range') {
        this._updateClassNames(cal);
        input.focus();
      }
    });
  };

  rightArrowHTML() {
    return `
      <svg width="8" height="12" viewBox="0 0 8 12" fill-rule="evenodd">
        <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z"></path>
      </svg>`;
  }

  leftArrowHTML() {
    return `
      <svg width="8" height="12" viewBox="0 0 8 12" fill-rule="evenodd">
        <path d="M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z"></path>
      </svg>`;
  }

  initDatePickerCalendar = () => {
    const input = ReactDOM.findDOMNode(this.inputField).querySelector(
      '.bx--date-picker__input'
    );
    const calendar = new Flatpickr(input, {
      mode: this.props.datePickerType,
      allowInput: true,
      dateFormat: this.props.dateFormat,
      onClose: selectedDates => {
        this.updateClassNames(calendar);
        this.updateInputFields(selectedDates);
        if (this.props.datePickerType === 'range') {
          const toInputField = ReactDOM.findDOMNode(
            this.toInputField
          ).querySelector('.bx--date-picker__input');
          if (calendar.selectedDates.length === 1) {
            input.focus();
          } else {
            toInputField.focus();
          }
          toInputField.classList.remove('bx--focused');
        }
      },
      onChange: () => {
        this.updateClassNames(calendar);
        if (this.props.datePickerType === 'range') {
          const toInputField = ReactDOM.findDOMNode(
            this.toInputField
          ).querySelector('.bx--date-picker__input');
          if (calendar.selectedDates.length === 1 && calendar.isOpen) {
            toInputField.classList.add('bx--focused');
          } else {
            toInputField.classList.remove('bx--focused');
          }
        }
      },
      onMonthChange: () => {
        this.updateClassNames(calendar);
      },
      onYearChange: () => {
        this.updateClassNames(calendar);
      },
      onOpen: () => {
        this.updateClassNames(calendar);
      },
      nextArrow: this.rightArrowHTML(),
      prevArrow: this.leftArrowHTML(),
    });
    if (this.props.datePickerType === 'range') {
      const toInputField = ReactDOM.findDOMNode(
        this.toInputField
      ).querySelector('.bx--date-picker__input');
      toInputField.addEventListener('click', () => {
        toInputField.focus();
        calendar.open();
        this.updateClassNames(calendar);
      });
      this.addInputLogic(toInputField);
    }
    this.setState({
      cal: calendar,
    });
    this.addKeyboardEvents(calendar);
    this.updateClassNames(calendar);
    this.addInputLogic(input);
  };

  addInputLogic = input => {
    const inputField = input;
    inputField.addEventListener('change', () => {
      const inputDate = this.state.cal.parseDate(new Date(inputField.value));
      if (!isNaN(inputDate.valueOf())) {
        this.state.cal.setDate(inputDate);
      }
      this.updateClassNames(this.state.cal);
    });
  };

  openCalendar = () => {
    this.state.cal.open();
  };

  updateClassNames = calendar => {
    const calendarContainer = calendar.calendarContainer;
    calendarContainer.classList.add('bx--date-picker__calendar');
    calendarContainer
      .querySelector('.flatpickr-month')
      .classList.add('bx--date-picker__month');
    calendarContainer
      .querySelector('.flatpickr-weekdays')
      .classList.add('bx--date-picker__weekdays');
    calendarContainer
      .querySelector('.flatpickr-days')
      .classList.add('bx--date-picker__days');
    [
      ...calendarContainer.querySelectorAll('.flatpickr-weekday'),
    ].forEach(item => {
      const currentItem = item;
      currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
      currentItem.classList.add('bx--date-picker__weekday');
    });
    [...calendarContainer.querySelectorAll('.flatpickr-day')].forEach(item => {
      item.classList.add('bx--date-picker__day');
      if (
        item.classList.contains('today') &&
        calendar.selectedDates.length > 0
      ) {
        item.classList.add('no-border');
      } else if (
        item.classList.contains('today') &&
        calendar.selectedDates.length === 0
      ) {
        item.classList.remove('no-border');
      }
    });
  };

  updateInputFields = selectedDates => {
    const input = ReactDOM.findDOMNode(this.inputField).querySelector(
      '.bx--date-picker__input'
    );
    if (this.props.datePickerType === 'range') {
      const toInput = ReactDOM.findDOMNode(
        this.toInputField
      ).querySelector('.bx--date-picker__input');
      if (selectedDates.length === 2) {
        input.value = this.formatDate(selectedDates[0]);
        toInput.value = this.formatDate(selectedDates[1]);
      } else if (selectedDates.length === 1) {
        input.value = this.formatDate(selectedDates[0]);
      }
    } else if (selectedDates.length === 1) {
      input.value = this.formatDate(selectedDates[0]);
    }
    this.updateClassNames(this.state.cal);
  };

  formatDate = date => this.state.cal.formatDate(date, this.props.dateFormat);

  render() {
    const {
      children,
      className,
      short,
      datePickerType,
      dateFormat, // eslint-disable-line
      ...other
    } = this.props;

    const datePickerClasses = classNames('bx--date-picker', className, {
      'bx--date-picker--short': short,
      'bx--date-picker--simple': datePickerType === 'simple',
      'bx--date-picker--single': datePickerType === 'single',
      'bx--date-picker--range': datePickerType === 'range',
    });

    const datePickerIcon = datePickerType === 'range'
      ? <svg
          onClick={this.openCalendar}
          className="bx--date-picker__icon"
          width="17"
          height="19"
          viewBox="0 0 17 19"
        >
          <path d="M12 0h2v2.7h-2zM3 0h2v2.7H3z" />
          <path d="M0 2v17h17V2H0zm15 15H2V7h13v10z" />
          <path d="M9.9 15H8.6v-3.9H7.1v-.9c.9 0 1.7-.3 1.8-1.2h1v6z" />
        </svg>
      : '';

    const childArray = React.Children.toArray(children);
    const childrenWithProps = childArray.map((child, index) => {
      if (index === 0 && child.type.name === 'DatePickerInput') {
        return React.cloneElement(child, {
          datePickerType,
          ref: (inputField) => this.inputField = inputField,
        });
      } else if (index === 1 && child.type.name === 'DatePickerInput') {
        return React.cloneElement(child, {
          datePickerType,
          ref: (toInputField) => this.toInputField = toInputField,
        });
      } else if (index === 0) {
        return React.cloneElement(child, {
          ref: (inputField) => this.inputField = inputField,
        });
      } else if (index === 1) {
        return React.cloneElement(child, {
          ref: (toInputField) => this.toInputField = toInputField,
        });
      }
    });

    return (
      <div className="bx--form-item">
        <div className={datePickerClasses} {...other}>
          {childrenWithProps}
          {datePickerIcon}
        </div>
      </div>
    );
  }
}

export default DatePicker;
