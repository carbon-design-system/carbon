import PropTypes from 'prop-types';
import React from 'react';
import { mount } from 'enzyme';
import InnerClickListener from '../InnerClickListener';

describe('InnerClickListener', () => {
  let onClickOutside;
  let handleRefSpy;
  let InnerChild;

  beforeEach(() => {
    onClickOutside = jest.fn();
    handleRefSpy = jest.spyOn(InnerClickListener.prototype, 'handleRef');
    InnerChild = class InnerChild extends React.Component {
      static propTypes = {
        innerRef: PropTypes.func.isRequired,
      };
      static defaultProps = {
        innerRef: () => {},
      };
      render() {
        return (
          <div>
            <div id="1">1</div>
            <div id="2" ref={this.props.innerRef}>
              2
            </div>
          </div>
        );
      }
    };
  });

  afterEach(() => {
    handleRefSpy.mockRestore();
  });

  it('should render', () => {
    const wrapper = mount(
      <InnerClickListener refKey="innerRef" onClickOutside={onClickOutside}>
        <InnerChild />
      </InnerClickListener>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call `handleRef` when mounting', () => {
    mount(
      <InnerClickListener refKey="innerRef" onClickOutside={onClickOutside}>
        <InnerChild />
      </InnerClickListener>
    );
    expect(handleRefSpy).toHaveBeenCalledTimes(1);
  });

  it('should call `onClickOutside` when clicked outside the node that has the ref', () => {
    const rootNode = document.createElement('div');
    rootNode.setAttribute('id', 'root');

    document.body.appendChild(rootNode);

    mount(
      <InnerClickListener refKey="innerRef" onClickOutside={onClickOutside}>
        <InnerChild />
      </InnerClickListener>,
      {
        attachTo: rootNode,
      }
    );

    document.getElementById('2').click();
    expect(onClickOutside).not.toHaveBeenCalled();

    document.getElementById('1').click();
    expect(onClickOutside).toHaveBeenCalledTimes(1);

    document.dispatchEvent(new MouseEvent('click'));
    expect(onClickOutside).toHaveBeenCalledTimes(2);
  });
});
