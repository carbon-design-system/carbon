import React from 'react';
import Selection from '../Selection';
import { mount } from 'enzyme';

describe('Selection', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      initialSelectedItems: [],
      render: jest.fn(() => <div />),
    };
  });

  it('should render', () => {
    const wrapper = mount(<Selection {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to add or remove an item from the callback props', () => {
    const wrapper = mount(
      <Selection
        {...mockProps}
        render={({ onItemChange }) => (
          <button onClick={() => onItemChange(1)} />
        )}
      />
    );
    expect(wrapper.state('selectedItems').length).toBe(0);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('selectedItems').length).toBe(1);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('selectedItems').length).toBe(0);
  });

  it('should give a list of all selected items from the callback props', () => {
    const wrapper = mount(
      <Selection
        {...mockProps}
        render={({ selectedItems, onItemChange }) => (
          <div>
            <button onClick={() => onItemChange(1)} />
            <ul>
              {selectedItems.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        )}
      />
    );
    expect(wrapper.find('li').length).toBe(0);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('li').length).toBe(1);
  });

  it('should be able to clear the selection from the callback props', () => {
    const wrapper = mount(
      <Selection
        {...mockProps}
        render={({ onItemChange, clearSelection }) => (
          <div>
            <button id="add-item" onClick={() => onItemChange(1)} />
            <button id="clear-selection" onClick={clearSelection} />
          </div>
        )}
      />
    );
    expect(wrapper.state('selectedItems')).toEqual([]);
    wrapper.find('#add-item').simulate('click');
    expect(wrapper.state('selectedItems')).toEqual([1]);
    wrapper.find('#clear-selection').simulate('click');
    expect(wrapper.state('selectedItems')).toEqual([]);
  });
});
