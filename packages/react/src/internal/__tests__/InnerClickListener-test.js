/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
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

  describe('renders as expected - Component API', () => {
    it('should render', () => {
      const { container } = render(
        <InnerClickListener refKey="innerRef" onClickOutside={onClickOutside}>
          <InnerChild />
        </InnerClickListener>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('behaves as expected', () => {
    it('should call `handleRef` when render', () => {
      render(
        <InnerClickListener refKey="innerRef" onClickOutside={onClickOutside}>
          <InnerChild />
        </InnerClickListener>
      );

      expect(handleRefSpy).toHaveBeenCalledTimes(1);
    });

    it('should call `onClickOutside` when clicked outside the node that has the ref', async () => {
      const rootNode = document.createElement('div');
      rootNode.setAttribute('id', 'root');

      document.body.appendChild(rootNode);

      render(
        <InnerClickListener refKey="innerRef" onClickOutside={onClickOutside}>
          <InnerChild />
        </InnerClickListener>,
        {
          attachTo: rootNode,
        }
      );

      await userEvent.click(screen.getByText('2'));
      expect(onClickOutside).not.toHaveBeenCalled();

      await userEvent.click(screen.getByText('1'));
      expect(onClickOutside).toHaveBeenCalledTimes(1);

      await userEvent.click(screen.getByText('1'));
      expect(onClickOutside).toHaveBeenCalledTimes(2);
    });

    it('should not call `onClickOutside` if click target disappears', async () => {
      const rootNode2 = document.createElement('div');
      rootNode2.setAttribute('id', 'root2');

      document.body.appendChild(rootNode2);

      render(
        <InnerClickListener refKey="innerRef" onClickOutside={onClickOutside}>
          <InnerChild />
        </InnerClickListener>,
        {
          attachTo: rootNode2,
        }
      );

      screen.getByText('1').addEventListener('click', function () {
        this.parentNode.removeChild(this);
      });
      await userEvent.click(screen.getByText('1'));
      expect(onClickOutside).not.toHaveBeenCalled();
    });
  });
});
