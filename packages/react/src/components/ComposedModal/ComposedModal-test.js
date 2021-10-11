/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '../Button';
import ComposedModal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../ComposedModal';
import InlineLoading from '../InlineLoading';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('<ModalHeader />', () => {
  describe('Renders as expected', () => {
    const titleWrapper = mount(<ModalHeader title="Something" />);
    const labelWrapper = mount(<ModalHeader label="Something" />);

    it('does not render title if no title', () => {
      expect(
        labelWrapper.find(`.${prefix}--modal-header__heading`).exists()
      ).toBe(false);
    });

    it('does not render label if no label', () => {
      expect(
        titleWrapper.find(`.${prefix}--modal-header__label`).exists()
      ).toBe(false);
    });

    it('renders title if title text', () => {
      expect(
        titleWrapper.find(`.${prefix}--modal-header__heading`).exists()
      ).toBe(true);
    });

    it('renders label if label text', () => {
      expect(
        labelWrapper.find(`.${prefix}--modal-header__label`).exists()
      ).toBe(true);
    });
  });
});

describe('<ModalBody />', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <ModalBody className="extra-class">
        <p>Test</p>
      </ModalBody>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('p').length).toBe(1);
    });

    it('renders wrapper as expected', () => {
      expect(wrapper.find(`.${prefix}--modal-content`).length).toBe(1);
    });

    it('renders extra classes passed in via className', () => {
      expect(
        wrapper.find(`.${prefix}--modal-content`).hasClass('extra-class')
      ).toEqual(true);
    });
  });
});

describe('<ModalFooter />', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <ModalFooter className="extra-class">
        <p>Test</p>
      </ModalFooter>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('p').length).toBe(1);
    });

    it('renders wrapper as expected', () => {
      expect(wrapper.length).toBe(1);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });

  describe('Should render buttons only if appropriate prop passed in', () => {
    const wrapper = shallow(
      <ModalFooter className="extra-class">
        <p>Test</p>
      </ModalFooter>
    );

    const primaryWrapper = shallow(<ModalFooter primaryButtonText="test" />);
    const secondaryWrapper = mount(<ModalFooter secondaryButtonText="test" />);
    const multipleSecondaryWrapper = mount(
      <ModalFooter
        secondaryButtons={[
          {
            buttonText: <InlineLoading />,
            onClick: jest.fn(),
          },
          {
            buttonText: 'Cancel',
            onClick: jest.fn(),
          },
        ]}
      />
    );

    it('does not render primary button if no primary text', () => {
      expect(wrapper.find(`.${prefix}--btn--primary`).exists()).toBe(false);
    });

    it('does not render secondary button if no secondary text', () => {
      expect(wrapper.find(`.${prefix}--btn--secondary`).exists()).toBe(false);
    });

    it('renders primary button if primary text', () => {
      const buttonComponent = primaryWrapper.find(Button);
      expect(buttonComponent.exists()).toBe(true);
      expect(buttonComponent.props().kind).toBe('primary');
    });

    it('renders primary button if secondary text', () => {
      const buttonComponent = secondaryWrapper.find(Button);
      expect(buttonComponent.exists()).toBe(true);
      expect(buttonComponent.props().kind).toBe('secondary');
    });

    it('correctly renders multiple secondary buttons', () => {
      const buttonComponents = multipleSecondaryWrapper.find(Button);
      expect(buttonComponents.length).toEqual(2);
      expect(buttonComponents.at(0).props().kind).toBe('secondary');
      expect(buttonComponents.at(1).props().kind).toBe('secondary');
    });
  });

  describe('Should render the appropriate buttons when `danger` prop is true', () => {
    const primaryWrapper = shallow(
      <ModalFooter primaryButtonText="test" danger />
    );
    const secondaryWrapper = mount(
      <ModalFooter secondaryButtonText="test" danger />
    );
    const multipleSecondaryWrapper = mount(
      <ModalFooter
        secondaryButtons={[
          {
            buttonText: <InlineLoading />,
            onClick: jest.fn(),
          },
          {
            buttonText: 'Cancel',
            onClick: jest.fn(),
          },
        ]}
      />
    );

    it('renders danger button if primary text && danger', () => {
      const buttonComponent = primaryWrapper.find(Button);
      expect(buttonComponent.exists()).toBe(true);
      expect(buttonComponent.props().kind).toBe('danger');
    });

    it('renders secondary button if secondary text && danger', () => {
      const buttonComponent = secondaryWrapper.find(Button);
      expect(buttonComponent.exists()).toBe(true);
      expect(buttonComponent.prop('kind')).toBe('secondary');
    });

    it('correctly renders multiple secondary buttons', () => {
      const buttonComponents = multipleSecondaryWrapper.find(Button);
      expect(buttonComponents.length).toEqual(2);
      expect(buttonComponents.at(0).props().kind).toBe('secondary');
      expect(buttonComponents.at(1).props().kind).toBe('secondary');
    });
  });
});

describe('<ComposedModal />', () => {
  let container;

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    container = null;
  });

  it('renders', () => {
    const wrapper = mount(<ComposedModal open />);
    expect(wrapper).toMatchSnapshot();
  });

  it('changes the open state upon change in props', () => {
    const wrapper = mount(<ComposedModal open />);
    expect(wrapper.state().open).toEqual(true);
    wrapper.setProps({ open: false });
    expect(wrapper.state().open).toEqual(false);
  });

  it('should change class of <body> upon open state', () => {
    const wrapper = mount(<ComposedModal open />);
    expect(
      document.body.classList.contains('bx--body--with-modal-open')
    ).toEqual(true);
    wrapper.unmount();
    expect(
      document.body.classList.contains('bx--body--with-modal-open')
    ).toEqual(false);
    mount(<ComposedModal open={false} />);
    expect(
      document.body.classList.contains('bx--body--with-modal-open')
    ).toEqual(false);
  });

  it('avoids change the open state upon setting props, unless there the value actually changes', () => {
    const wrapper = mount(<ComposedModal />);
    wrapper.setProps({ open: true });
    wrapper.setState({ open: false });
    wrapper.setProps({ open: true });
    expect(wrapper.state().open).toEqual(false);
  });

  it('calls onClick upon user-initiated closing', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <ComposedModal open onClose={onClose}>
        <ModalHeader />
      </ComposedModal>
    );
    const button = wrapper.find(`.${prefix}--modal-close`).first();
    button.simulate('click');
    expect(wrapper.state().open).toEqual(false);
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('provides a way to prevent upon user-initiated closing', () => {
    const onClose = jest.fn(() => false);
    const wrapper = mount(
      <ComposedModal open onClose={onClose}>
        <ModalHeader />
      </ComposedModal>
    );
    const button = wrapper.find(`.${prefix}--modal-close`).first();
    button.simulate('click');
    expect(wrapper.state().open).toEqual(true);
  });

  it('should focus on the primary actionable button in ModalFooter by default', () => {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
    mount(
      <ComposedModal open>
        <ModalFooter primaryButtonText="Save" />
      </ComposedModal>,
      { attachTo: document.querySelector('#container') }
    );
    expect(
      document.activeElement.classList.contains(`${prefix}--btn--primary`)
    ).toEqual(true);
  });

  it('should focus on the element that matches selectorPrimaryFocus', () => {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
    mount(
      <ComposedModal open selectorPrimaryFocus={`.${prefix}--modal-close`}>
        <ModalHeader label="Optional Label" title="Example" />
        <ModalFooter primaryButtonText="Save" />
      </ComposedModal>,
      { attachTo: document.querySelector('#container') }
    );
    expect(
      document.activeElement.classList.contains(`${prefix}--modal-close`)
    ).toEqual(true);
  });
});
