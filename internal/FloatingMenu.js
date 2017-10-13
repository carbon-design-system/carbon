import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import window from 'window-or-global';

class FloatingMenu extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    menuPosition: PropTypes.object.isRequired,
    menuDirection: PropTypes.oneOf(['left', 'top', 'right', 'bottom'])
      .isRequired,
    menuOffset: PropTypes.object.isRequired,
    styles: PropTypes.object,
  };

  static defaultProps = {
    menuPosition: { left: 0, top: 0, right: 0, bottom: 0 },
    menuDirection: 'bottom',
  };

  componentDidMount() {
    if (this.doc) {
      this.menu = this.doc.createElement('div');
      this.menu.ownerDocument.body.appendChild(this.menu);

      const style = {
        display: 'block',
        opacity: 0,
      };
      const childrenWithProps = React.cloneElement(this.props.children, {
        style,
      });
      ReactDOM.render(childrenWithProps, this.menu);

      this.getMenuPosition();
      this.renderLayer();
    }
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.menu);
    this.menu.ownerDocument.body.removeChild(this.menu);
  }

  getMenuPosition = () => {
    const {
      width: menuWidth,
      height: menuHeight,
    } = this.menu.firstChild.getBoundingClientRect();

    this.menuWidth = menuWidth;
    this.menuHeight = menuHeight;
  };

  positionFloatingMenu = () => {
    const menuOffset = this.props.menuOffset;

    const scroll = window.scrollY || 0;

    const {
      left: refLeft,
      top: refTop,
      right: refRight,
      bottom: refBottom,
    } = this.props.menuPosition;

    const refCenterHorizontal = (refLeft + refRight) / 2;
    const refCenterVertical = (refTop + refBottom) / 2;

    return {
      left: () => ({
        left: refLeft - this.menuWidth - menuOffset.left,
        top: refCenterVertical - this.menuHeight / 2 + scroll + menuOffset.top,
      }),
      top: () => ({
        left: refCenterHorizontal - this.menuWidth / 2 + menuOffset.left,
        top: refTop - this.menuHeight + scroll - menuOffset.top,
      }),
      right: () => ({
        left: refRight + menuOffset.left,
        top: refCenterVertical - this.menuHeight / 2 + scroll + menuOffset.top,
      }),
      bottom: () => ({
        left: refCenterHorizontal - this.menuWidth / 2 + menuOffset.left,
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
      opacity: 1,
    };

    const style = Object.assign(coreStyles, this.props.styles);
    const childrenWithProps = React.cloneElement(this.props.children, {
      style,
    });

    ReactDOM.render(childrenWithProps, this.menu);
  };

  render() {
    return (
      <div
        ref={node => {
          this.doc = node && node.ownerDocument;
        }}
        hidden
      />
    );
  }
}

export default FloatingMenu;
