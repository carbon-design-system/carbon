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

  constructor() {
    super();
    this.state = {};
  }

  onNewMenuRef = menu => {
    if (!menu) {
      return;
    }
    const doc = menu.ownerDocument;
    if (typeof ReactDOM.createPortal === 'function') {
      this.setState({ doc });
      if (menu.firstChild) {
        this.menu = menu;
        this.getMenuPosition();
      }
    } else {
      this.menu = doc.createElement('div');
      doc.body.appendChild(this.menu);

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
  };

  componentDidUpdate() {
    if (typeof ReactDOM.createPortal !== 'function') {
      this.renderLayer();
    }
  }

  componentWillReceiveProps(props) {
    if (typeof ReactDOM.createPortal === 'function') {
      const hasChange = props.menuPosition !== this.props.menuPosition || props.menuDirection !== this.props.menuDirection || props.menuOffset !== this.props.menuOffset;
      if (hasChange) {
        requestAnimationFrame(() => {
          if (this.menuWidth !== undefined && this.menuHeight !== undefined) {
            this.setState({ floatingPosition: this.positionFloatingMenu() });
          }
        });
      }
    }
  }

  componentWillUnmount() {
    if (typeof ReactDOM.createPortal !== 'function') {
      ReactDOM.unmountComponentAtNode(this.menu);
      if (this.menu && this.menu.parentNode) {
        this.menu.parentNode.removeChild(this.menu);
      }
    }
    this.menuWidth = undefined;
    this.menuHeight = undefined;
    this.menu = null;
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

  getChildrenWithProps = (transientStyles = {}) => {
    const pos = this.state.floatingPosition || this.positionFloatingMenu();

    const coreStyles = {
      left: `${pos.left}px`,
      top: `${pos.top}px`,
      position: 'absolute',
      right: 'auto',
      margin: 0,
      opacity: 1,
    };

    const style = Object.assign(coreStyles, this.props.styles, transientStyles);
    return React.cloneElement(this.props.children, {
      style,
    });
  };

  renderLayer = () => {
    ReactDOM.render(this.getChildrenWithProps(), this.menu);
  };

  render() {
    if (this.state.doc && typeof ReactDOM.createPortal === 'function') {
      const childrenWithProps = this.getChildrenWithProps(this.menuWidth !== undefined && this.menuHeight !== undefined ? {} : {
        display: 'block',
        opacity: 1,
      });
      return ReactDOM.createPortal((
        <div ref={this.onNewMenuRef}>{childrenWithProps}</div> // Add wrapper `<div>` to align to React15 version
      ), this.state.doc.body);
    }

    return (
      <div ref={this.onNewMenuRef} hidden />
    );
  }
}

export default FloatingMenu;
