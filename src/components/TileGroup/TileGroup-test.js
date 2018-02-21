import React from 'react';
import { mount } from 'enzyme';
import TileGroup from '../TileGroup';
import RadioTile from '../RadioTile';

describe('TileGroup', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <TileGroup defaultSelected="female" name="gender">
        <RadioTile labelText="Male" value="male" />
        <RadioTile labelText="Female" value="female" />
      </TileGroup>
    );

    describe('wrapping div', () => {
      const div = wrapper.first('div');

      it('renders a div', () => {
        expect(div.length).toEqual(1);
      });

      it('sets classes that are passed via className prop', () => {
        wrapper.setProps({ className: 'extra-class' });
        expect(div.hasClass('extra-class'));
      });

      it('sets disabled attribute if disabled prop is set', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.first().props().disabled).toEqual(true);
      });
    });

    describe('children', () => {
      const tileButton = () => wrapper.find(RadioTile);

      it('renders expected number of children', () => {
        expect(tileButton().length).toEqual(2);
      });

      it('should set checked property based on defaultSelected prop', () => {
        expect(
          tileButton()
            .last()
            .props().checked
        ).toEqual(true);
      });

      it('should set checked property based on valueSelected prop', () => {
        wrapper.setProps({ valueSelected: 'male' });
        expect(
          tileButton()
            .first()
            .props().checked
        ).toEqual(true);
        wrapper.setProps({ valueSelected: 'female' });
        expect(
          tileButton()
            .last()
            .props().checked
        ).toEqual(true);
      });

      it('should set expected props on children', () => {
        const firstChild = tileButton().first();
        expect(firstChild.props().name).toEqual('gender');
        expect(firstChild.props().value).toEqual('male');
      });
    });
  });

  describe('onChange event', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <TileGroup onChange={onChange} name="gender">
        <RadioTile labelText="Male" value="male" />
        <RadioTile labelText="Female" value="female" />
      </TileGroup>
    );

    const firstRadio = wrapper.find(RadioTile).first();
    const args = ['male', 'gender', { test: 'test event' }];

    it('first child should not have checked set initially', () => {
      expect(firstRadio.props().checked).toEqual(false);
    });

    it('invoking onChange sets checked on correct child', () => {
      firstRadio.props().onChange(...args);
      wrapper.update();
      expect(
        wrapper
          .find(RadioTile)
          .first()
          .props().checked
      ).toEqual(true);
    });

    it('should invoke onChange with correct arguments', () => {
      expect(onChange).toBeCalledWith(...args);
    });

    it('calling onChange with same args should not call onChange prop', () => {
      onChange.mockClear();
      firstRadio.props().onChange(...args);
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
