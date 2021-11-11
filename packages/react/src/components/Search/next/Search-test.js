/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Search16, Close16 } from '@carbon/icons-react';
import Search from '../Search';
// import { render, render } from 'enzyme';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { settings } from 'carbon-components';

const { prefix } = settings;

// /**
//  * Find the <div> element thats the search.
//  * @param {Enzymecontainer} container
//  * @returns {Enzymecontainer}
//  */
//  const container = (container) => {
//   return container.find(`.${prefix}--search`);
// };

// /**
//  * Find the <input> element.
//  * @param {Enzymecontainer} container
//  * @returns {Enzymecontainer}
//  */
//  const label = (container) => {
//   return container.find(`.${prefix}--search .${prefix}--label`);
// };

// /**
//  * Find the <input> element.
//  * @param {Enzymecontainer} container
//  * @returns {Enzymecontainer}
//  */
//  const textInput = (container) => {
//   return container.find(`.${prefix}--search-input`);
// };

describe('Search', () => {
  // let search;

  // beforeEach(() => {
  //   search = render(
  //     <Search
  //       id="test"
  //       className="extra-class"
  //       label="Search Field"
  //       labelText="testlabel"
  //     />
  //   );
  // });

  describe('renders as expected', () => {
    const container = render(
      <Search
        data-testid="search-test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
      />
    );

    const textInput = screen.getByRole('searchbox');
    const label = screen.getByLabelText('testlabel');

    screen.debug();

    describe('container', () => {
      it('should add extra classes that are passed via className', () => {
        expect(container.hasClass('extra-class')).toBe(true);
      });
    });

    describe('input', () => {
      it('renders as expected', () => {
        expect(textInput.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(textInput.hasClass(`${prefix}--search-input`)).toBe(true);
      });

      it('should set type as expected', () => {
        expect(textInput).toHaveAttribute('type', 'text');
        container.setProps({ type: 'email' });
        expect(container.find('input')).toHaveAttribute('type', 'email');
      });

      it('should set placeholder as expected', () => {
        expect(textInput.getByPlaceholderText('')).toBe(true);
        container.setProps({ placeholder: 'Enter text' });
        expect(container.find('input').getByPlaceholderText('Enter text')).toBe(
          true
        );
      });
    });

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass(`${prefix}--label`)).toBe(true);
      });

      it('should set label as expected', () => {
        expect(label).toBe(true);
        container.setProps({ labelText: 'email label' });
        expect(label.getByLabelText('email label')).toBe(true);
      });
    });

    describe('Large Search', () => {
      const large = render(
        <Search
          data-testid="search-test"
          size="lg"
          className="extra-class"
          label="Search Field"
          labelText="testlabel"
        />
      );

      const largeContainer = large.find(`.${prefix}--search`);

      it('renders correct search icon', () => {
        const icons = large.find(Search16);
        expect(icons.length).toBe(1);
      });

      it('should have the expected large class', () => {
        expect(largeContainer.hasClass(`${prefix}--search--lg`)).toBe(true);
      });

      it('should only have 1 button (clear)', () => {
        const btn = large.find('button');
        expect(btn.length).toBe(1);
      });

      it('renders two Icons', () => {
        const iconTypes = [Search16, Close16];
        const icons = large.findWhere((n) => iconTypes.includes(n.type()));
        expect(icons.length).toBe(2);
      });

      describe('buttons', () => {
        const btns = container.find('button');

        it('should be one button', () => {
          expect(btns.length).toBe(1);
        });

        it('should have type="button"', () => {
          const type1 = btns.first().instance().getAttribute('type');
          const type2 = btns.last().instance().getAttribute('type');
          expect(type1).toBe('button');
          expect(type2).toBe('button');
        });
      });

      describe('icons', () => {
        it('renders "search" icon', () => {
          const icons = container.find(Search16);
          expect(icons.length).toBe(1);
        });

        it('renders two Icons', () => {
          container.setProps({ size: undefined });
          const iconTypes = [Search16, Close16];
          const icons = container.findWhere((n) =>
            iconTypes.includes(n.type())
          );
          expect(icons.length).toBe(2);
        });
      });
    });

    describe('Small Search', () => {
      const small = render(
        <Search
          id="test"
          size="sm"
          className="extra-class"
          label="Search Field"
          labelText="testlabel"
        />
      );

      const smallContainer = small.find(`.${prefix}--search`);

      it('renders correct search icon', () => {
        const icons = small.find(Search16);
        expect(icons.length).toBe(1);
      });

      it('should have the expected small class', () => {
        expect(smallContainer.hasClass(`${prefix}--search--sm`)).toBe(true);
      });

      it('should only have 1 button (clear)', () => {
        const btn = small.find('button');
        expect(btn.length).toBe(1);
      });

      it('renders two Icons', () => {
        const iconTypes = [Search16, Close16];
        const icons = container.findWhere((n) => iconTypes.includes(n.type()));
        expect(icons.length).toBe(2);
      });
    });
  });

  describe('events', () => {
    describe('enabled textinput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();
      const onClear = jest.fn();

      const container = render(
        <Search
          data-testid="search-test"
          labelText="testlabel"
          onClick={onClick}
          onChange={onChange}
          onClear={onClear}
        />
      );

      const input = container.find('input');
      const eventObject = {
        target: {
          defaultValue: 'test',
        },
      };

      it('should invoke onClick when input is clicked', () => {
        input.simulate('click');
        expect(onClick).toHaveBeenCalled();
      });

      it('should invoke onChange when input value is changed', () => {
        input.simulate('change', eventObject);
        expect(onChange).toHaveBeenCalledWith(eventObject);
      });

      it('should invoke onClear when input value is cleared', () => {
        container.setProps({ value: 'test' });
        const focus = jest.fn();
        input.getElement().ref({
          focus,
        });
        container
          .find('button')
          .simulate('click', { target: { value: 'test' } });
        expect(onClear).toHaveBeenCalled();
        expect(focus).toHaveBeenCalled();
      });
    });
  });
});

// TODO Add skeleton tests

describe('Detecting change in value from props', () => {
  it('changes the hasContent state upon change in props', () => {
    const container = render(
      <Search
        data-testid="search-test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
        value="foo"
      />
    );
    expect(container.find('input')).not.toHaveClass(
      `${prefix}--search-close--hidden`
    );
    container.setProps({ value: '' });
    expect(container.find('input')).toHaveClass(
      `${prefix}--search-close--hidden`
    );
  });

  it('avoids change the hasContent state upon setting props, unless the value actually changes', () => {
    const container = render(
      <Search
        data-testid="search-test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
        value="foo"
      />
    );
    expect(container.find('input')).toHaveClass(
      `${prefix}--search-close--hidden`
    );
    container.setState({ hasContent: false });
    container.setProps({ value: 'foo' });
    expect(container.find('input')).not.toHaveClass(
      `${prefix}--search-close--hidden`
    );
  });
});
