import React from 'react';
import { mount } from 'enzyme';
import ListBox from '../';

describe('ListBoxMenuIcon', () => {
  it('should render', () => {
    const openWrapper = mount(<ListBox.MenuIcon isOpen={true} />);
    const closedWrapper = mount(<ListBox.MenuIcon isOpen={false} />);
    expect(openWrapper).toMatchSnapshot();
    expect(closedWrapper).toMatchSnapshot();
  });

  it('should call `translateWithId` to determine the description', () => {
    const translateWithId = jest.fn(() => 'message');
    mount(<ListBox.MenuIcon isOpen={true} translateWithId={translateWithId} />);
    expect(translateWithId).toHaveBeenCalledWith('close.menu');

    translateWithId.mockClear();

    mount(
      <ListBox.MenuIcon isOpen={false} translateWithId={translateWithId} />
    );
    expect(translateWithId).toHaveBeenCalledWith('open.menu');
  });
});
