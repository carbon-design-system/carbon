/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListInput,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from './StructuredList';
import { mount, shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('StructuredListWrapper', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <StructuredListWrapper className="extra-class">hi</StructuredListWrapper>
    );

    it('should have the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--structured-list`)).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('By default, selection prop is false', () => {
      expect(wrapper.hasClass(`${prefix}--structured-list--selection`)).toEqual(
        false
      );
    });

    it('Should add the modifier class for selection when selection prop is true', () => {
      wrapper.setProps({ selection: true });
      expect(wrapper.hasClass(`${prefix}--structured-list--selection`)).toEqual(
        true
      );
    });
  });
});

describe('StructuredListHead', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <StructuredListHead className="extra-class">hi</StructuredListHead>
    );

    it('should have the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--structured-list-thead`)).toEqual(
        true
      );
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('Should accept other props from ...other', () => {
      const wrapperProps = shallow(
        <StructuredListHead title="title">hi</StructuredListHead>
      );
      expect(wrapperProps.props().title).toEqual('title');
    });
  });
});

describe('StructuredListInput', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<StructuredListInput className="extra-class" />);

    it('should have the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--structured-list-input`)).toEqual(
        true
      );
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('Should accept other props from ...other', () => {
      const wrapperProps = shallow(<StructuredListInput title="title" />);
      expect(wrapperProps.props().title).toEqual('title');
    });

    it('Should render unique id with multiple inputs when no id prop is given', () => {
      const wrapper1 = mount(<StructuredListInput className="extra-class" />);
      const wrapper2 = mount(<StructuredListInput className="extra-class" />);
      expect(wrapper1.find('[id]')).not.toEqual(wrapper2.find('[id]'));
    });
  });
});

describe('StructuredListRow', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<StructuredListRow className="extra-class" />);

    it('should have the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--structured-list-row`)).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should use correct class when head prop is true', () => {
      wrapper.setProps({ head: true });

      expect(
        wrapper.hasClass(`${prefix}--structured-list-row--header-row`)
      ).toEqual(true);
    });

    it('should use <div> HTML by default (or when label prop is false)', () => {
      const wrapperLabel = shallow(<StructuredListRow />);
      expect(wrapperLabel.getElement().type).toEqual('div');
    });

    it('should use <label> HTML when label prop is true', () => {
      const wrapperLabel = shallow(<StructuredListRow label />);
      expect(wrapperLabel.getElement().type).toEqual('label');
    });

    it('Should accept other props from ...other', () => {
      const wrapperProps = shallow(
        <StructuredListRow title="title">hi</StructuredListRow>
      );
      expect(wrapperProps.props().title).toEqual('title');
    });
  });
});

describe('StructuredListBody', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <StructuredListBody className="extra-class">hi</StructuredListBody>
    );

    it('should have the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--structured-list-tbody`)).toEqual(
        true
      );
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('Should accept other props from ...other', () => {
      const wrapperProps = shallow(
        <StructuredListBody title="title">hi</StructuredListBody>
      );
      expect(wrapperProps.props().title).toEqual('title');
    });
  });
});

describe('StructuredListCell', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <StructuredListCell className="extra-class">hi</StructuredListCell>
    );

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should have the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--structured-list-td`)).toEqual(true);
    });

    it('should use correct class when head prop is true', () => {
      wrapper.setProps({ head: true });
      expect(wrapper.hasClass(`${prefix}--structured-list-th`)).toEqual(true);
    });

    it('should use correct class when noWrap prop is true', () => {
      wrapper.setProps({ noWrap: true });
      expect(
        wrapper.hasClass(`${prefix}--structured-list-content--nowrap`)
      ).toEqual(true);
    });

    it('Should accept other props from ...other', () => {
      const wrapperProps = shallow(
        <StructuredListCell title="title">hi</StructuredListCell>
      );
      expect(wrapperProps.props().title).toEqual('title');
    });
  });
});
