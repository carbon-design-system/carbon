import React from 'react';
import TableData from '../TableData';
import { mount, shallow } from 'enzyme';

describe('TableData', () => {
  describe('Renders as expected', () => {
    const td = shallow(<TableData>Content</TableData>);

    it('should render a table data element', () => {
      expect(td.find('td').length).toEqual(1);
    });

    it('should add extra classes that are passed via className for the td', () => {
      td.setProps({ className: 'extra-class' });
      const tdEl = td.find('td');
      expect(tdEl.hasClass('extra-class')).toEqual(true);
    });
  });

  describe('events', () => {
    const onClick = jest.fn();
    let wrapper;
    let icon;

    beforeEach(() => {
      wrapper = mount(
        <table>
          <tbody>
            <tr>
              <TableData expanded onClick={onClick}>
                Content
              </TableData>
            </tr>
          </tbody>
        </table>
      );

      icon = wrapper.find('.bx--table-expand__svg').first();
    });

    afterEach(() => {
      onClick.mockClear();
    });

    it('should fire onClick on click', () => {
      icon.simulate('click');
      expect(onClick).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should fire onClick on enter or space', () => {
      icon.simulate('keypress', { which: 13 });
      expect(onClick).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalledTimes(1);
      icon.simulate('keypress', { which: 32 });
      expect(onClick).toHaveBeenCalledTimes(2);
      icon.simulate('keypress', { which: 1 });
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });
});
