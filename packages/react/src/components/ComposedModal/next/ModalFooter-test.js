import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '../../Button';
import { ModalFooter } from './ModalFooter';
import InlineLoading from '../../InlineLoading';
import { settings } from 'carbon-components';

const { prefix } = settings;

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
