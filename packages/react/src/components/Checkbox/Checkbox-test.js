/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Checkbox from '../Checkbox';
import CheckboxSkeleton from '../Checkbox/Checkbox.Skeleton';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { prefix } = settings;

describe('Checkbox', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <Checkbox id="testing" labelText="testingLabel" className="extra-class" />
    );
    const label = wrapper.find('label');

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass(`${prefix}--checkbox-label`)).toEqual(true);
      });

      it('has the expected htmlFor value', () => {
        expect(label.props().htmlFor).toEqual('testing');
      });

      it('applies extra classes to label', () => {
        expect(label.hasClass('extra-class')).toEqual(true);
      });

      describe('input', () => {
        const input = () => wrapper.find('input');

        it('has id set as expected', () => {
          expect(input().props().id).toEqual('testing');
        });

        it('defaultChecked prop sets defaultChecked on input', () => {
          expect(input().props().defaultChecked).toBeUndefined();
          wrapper.setProps({ defaultChecked: true });
          expect(input().props().defaultChecked).toEqual(true);
        });
      });
    });
  });

  it('disabled prop on component sets disabled prop on input', () => {
    const wrapper = mount(
      <Checkbox id="test" labelText="testlabel" disabled />
    );

    const input = () => wrapper.find('input');
    expect(input().props().disabled).toEqual(true);

    wrapper.setProps({ disabled: false });
    expect(input().props().disabled).toEqual(false);
  });

  it('checked prop on component sets checked prop on input', () => {
    const wrapper = mount(<Checkbox id="test" labelText="testlabel" checked />);

    const input = () => wrapper.find('input');
    expect(input().props().checked).toEqual(true);

    wrapper.setProps({ checked: false });
    expect(input().props().checked).toEqual(false);
  });

  it('hideLabel hides the label visually', () => {
    const wrapper = mount(
      <Checkbox id="test" labelText="testlabel" hideLabel />
    );

    const label = wrapper.find('label');
    expect(label.length).toEqual(1);
    const span = wrapper.find('span');
    expect(span.hasClass(`${prefix}--visually-hidden`)).toEqual(true);
  });

  describe('events', () => {
    it('should invoke onChange with expected arguments', () => {
      const onChange = jest.fn();
      const id = 'test-input';
      const wrapper = mount(
        <Checkbox labelText="testlabel" id={id} onChange={onChange} />
      );

      const input = wrapper.find('input');
      const inputElement = input.instance();

      inputElement.checked = true;
      wrapper.find('input').simulate('change');

      const call = onChange.mock.calls[0];

      expect(call[0]).toEqual(true);
      expect(call[1]).toEqual(id);
      expect(call[2].target).toBe(inputElement);
    });
  });
});

describe('refs', () => {
  let container;

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    container = null;
  });

  it('should accept refs', () => {
    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.focus = this.focus.bind(this);
      }
      focus() {
        this.myRef.current.focus();
      }
      render() {
        return (
          <Checkbox
            id="test"
            labelText="testlabel"
            hideLabel
            ref={this.myRef}
          />
        );
      }
    }
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
    const wrapper = mount(<MyComponent />, {
      attachTo: document.querySelector('#container'),
    });
    expect(document.activeElement.type).toBeUndefined();
    wrapper.instance().focus();
    expect(document.activeElement.type).toEqual('checkbox');
  });

  it('should set indeterminate when accepting refs', () => {
    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }
      render() {
        return (
          <Checkbox
            id="test-id"
            labelText="test"
            indeterminate
            ref={this.myRef}
          />
        );
      }
    }
    const wrapper = mount(<MyComponent />);
    expect(wrapper.find('input').getDOMNode().indeterminate).toBe(true);
  });
});

describe('CheckboxSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(<CheckboxSkeleton />);
    const label = wrapper.find('span');

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass(`${prefix}--checkbox-label-text`)).toEqual(true);
        expect(label.hasClass(`${prefix}--skeleton`)).toEqual(true);
      });
    });
  });
});

describe('Checkbox accessibility', () => {
  afterEach(cleanup);

  it('should have no Axe violations', async () => {
    render(<Checkbox labelText="Checkbox label" id="test_id" />);
    await expect(
      screen.getByLabelText('Checkbox label')
    ).toHaveNoAxeViolations();
  });

  it('should have no Accessibility Checker violations', async () => {
    render(
      <main>
        <Checkbox labelText="Checkbox label" id="test_id" />
      </main>
    );
    await expect(screen.getByLabelText('Checkbox label')).toHaveNoACViolations(
      'Checkbox'
    );
  });

  it('can receive keyboard focus', () => {
    render(<Checkbox labelText="Checkbox label" id="test_id" />);
    userEvent.tab();
    expect(screen.getByLabelText('Checkbox label')).toHaveFocus();
  });

  it('should have an accessible label', () => {
    render(<Checkbox labelText="Checkbox label" id="test_id" />);
    expect(() => screen.getByText('Checkbox label')).not.toThrow();
  });

  it('should have an appropriate role', () => {
    render(<Checkbox labelText="Checkbox label" id="test_id" />);
    expect(() => screen.getByRole('checkbox')).not.toThrow();
  });
});
