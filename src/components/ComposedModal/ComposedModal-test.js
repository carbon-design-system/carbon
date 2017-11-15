import React from 'react';
import { shallow } from 'enzyme';
import { ModalHeader, ModalBody, ModalFooter } from '../ComposedModal';

describe('<ModalHeader />', () => {
  describe('Renders as expected', () => {
    const titleWrapper = shallow(<ModalHeader title="Something" />);
    const labelWrapper = shallow(<ModalHeader label="Something" />);

    it('does not render title if no title', () => {
      expect(labelWrapper.find('.bx--modal-header__heading').exists()).toBe(
        false
      );
    });

    it('does not render label if no label', () => {
      expect(titleWrapper.find('.bx--modal-header__label').exists()).toBe(
        false
      );
    });

    it('renders title if title text', () => {
      expect(titleWrapper.find('.bx--modal-header__heading').exists()).toBe(
        true
      );
    });

    it('renders label if label text', () => {
      expect(labelWrapper.find('.bx--modal-header__label').exists()).toBe(true);
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
      expect(wrapper.length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--modal-content')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});

describe('<ModalFooter />', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
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

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--modal-footer')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });

  describe('Should render buttons only if appropriate prop passed in in', () => {
    const wrapper = shallow(
      <ModalFooter className="extra-class">
        <p>Test</p>
      </ModalFooter>
    );

    const primaryWrapper = shallow(<ModalFooter primaryButtonText="test" />);
    const secondaryWrapper = shallow(
      <ModalFooter secondaryButtonText="test" />
    );

    it('does not render primary button if no primary text', () => {
      expect(wrapper.find('.bx--btn--primary').exists()).toBe(false);
    });

    it('does not render secondary button if no secondary text', () => {
      expect(wrapper.find('.bx--btn--secondary').exists()).toBe(false);
    });

    it('renders primary button if primary text', () => {
      const buttonComponent = primaryWrapper.find('Button');
      expect(buttonComponent.exists()).toBe(true);
      expect(buttonComponent.props().kind).toBe('primary');
    });

    it('renders primary button if secondary text', () => {
      const buttonComponent = secondaryWrapper.find('Button');
      expect(buttonComponent.exists()).toBe(true);
      expect(buttonComponent.props().kind).toBe('secondary');
    });
  });
});
