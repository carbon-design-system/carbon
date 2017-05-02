import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

class FloatingMenu extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    menuPosition: PropTypes.object.isRequired,
    menuDirection: PropTypes.oneOf(['left', 'top', 'right', 'bottom'])
      .isRequired,
    menuOffset: PropTypes.object.isRequired,
    extraStyles: PropTypes.object,
  };

  static defaultProps = {
    menuPosition: { left: 0, top: 0, right: 0, bottom: 0 },
    menuDirection: 'bottom',
  };

  componentDidMount() {
    this.menu = document.createElement('div');
    this.menu.ownerDocument.body.appendChild(this.menu);
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.menu);
    this.menu.ownerDocument.body.removeChild(this.menu);
  }

  positionFloatingMenu = () => {
    const menuOffset = this.props.menuOffset;

    const scroll = window.scrollY; // eslint-disable-line no-undef

    const {
      left: refLeft,
      top: refTop,
      right: refRight,
      bottom: refBottom,
    } = this.props.menuPosition;

    const {
      width: menuWidth,
      height: menuHeight,
    } = this.menu.getBoundingClientRect();

    const refCenterHorizontal = (refLeft + refRight) / 2;
    const refCenterVertical = (refTop + refBottom) / 2;

    return {
      left: () => ({
        left: refLeft - menuWidth - menuOffset.left,
        top: refCenterVertical - menuHeight / 2 + scroll + menuOffset.top,
      }),
      top: () => ({
        left: refCenterHorizontal - menuWidth / 2 + menuOffset.left,
        top: refTop - menuHeight + scroll - menuOffset.top,
      }),
      right: () => ({
        left: refRight + menuOffset.left,
        top: refCenterVertical - menuHeight / 2 + scroll + menuOffset.top,
      }),
      bottom: () => ({
        left: refCenterHorizontal - menuWidth / 2 + menuOffset.left,
        top: refBottom + scroll + menuOffset.top,
      }),
    }[this.props.menuDirection]();
  };

  renderLayer = () => {
    const pos = this.positionFloatingMenu();

    const coreStyles = {
      left: `${pos.left}px`,
      top: `${pos.top}px`,
      position: 'absolute',
      right: 'auto',
      margin: 0,
    };

    const style = Object.assign(coreStyles, this.props.extraStyles);
    Object.assign(this.menu.style, style);

    ReactDOM.render(this.props.children, this.menu);
  };

  render() {
    return null;
  }
}

export default FloatingMenu;
