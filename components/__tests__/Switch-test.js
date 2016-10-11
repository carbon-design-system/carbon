import React from 'react';
import Switch from '../Switch';
import { shallow } from 'enzyme';

describe('Switch', () => {
  describe('component rendering', () => {
    const buttonWrapper = shallow(<Switch kind="button" text="test" />);
    const linkWrapper = shallow(<Switch kind="anchor" text="test" />);

    it('should render a button when kind is button', () => {
      expect(buttonWrapper.is('button')).toEqual(true);
    });

    it('should render a link when kind is link', () => {
      expect(linkWrapper.is('a')).toEqual(true);
    });

    it('should have the expected text', () => {
      expect(buttonWrapper.text()).toEqual('test');
      expect(linkWrapper.text()).toEqual('test');
    });

    it('should have the expected class', () => {
      const cls = 'bx--content-switcher__btn';

      expect(buttonWrapper.hasClass(cls)).toEqual(true);
      expect(linkWrapper.hasClass(cls)).toEqual(true);
    });

    it('should not have selected class', () => {
      const selectedClass = 'bx--content-switcher--selected';

      expect(buttonWrapper.hasClass(selectedClass)).toEqual(false);
      expect(linkWrapper.hasClass(selectedClass)).toEqual(false);
    });

    it('should have a selected class when selected is set to true', () => {
      const selected = true;

      buttonWrapper.setProps({ selected });
      linkWrapper.setProps({ selected });

      expect(buttonWrapper.hasClass('bx--content-switcher--selected')).toEqual(true);
      expect(linkWrapper.hasClass('bx--content-switcher--selected')).toEqual(true);
    });
  });

  describe('events', () => {
    const buttonOnClick = jest.fn();
    const linkOnClick = jest.fn();
    const index = 1;
    const name = 'first';
    const text = 'test';

    const buttonWrapper = shallow(
      <Switch
        index={index}
        name={name}
        kind="button"
        onClick={buttonOnClick}
        text={text}
      />
    );

    const linkWrapper = shallow(
      <Switch
        index={index}
        name={name}
        kind="button"
        onClick={linkOnClick}
        text={text}
      />
    );

    it('should invoke button onClick handler', () => {
      buttonWrapper.simulate('click', { preventDefault() { } });
      expect(buttonOnClick).toBeCalledWith({ index, name, text });
    });

    it('should invoke link onClick handler', () => {
      linkWrapper.simulate('click', { preventDefault() { } });
      expect(buttonOnClick).toBeCalledWith({ index, name, text });
    });
  });
});
