import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { iconChevronRight } from 'carbon-icons';
import Icon from '../Icon';

const defaultRenderExpando = props => <button {...props} />;

export default class AccordionItem extends Component {
  state = {};

  static propTypes = {
    /**
     * Provide the contents of your AccordionItem
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * The accordion title.
     */
    title: PropTypes.node,

    /**
     * The callback function to render the expando button.
     * Can be a React component class.
     */
    renderExpando: PropTypes.func,

    /**
     * The description of the expando icon.
     */
    iconDescription: PropTypes.string,

    /**
     * `true` to open the expando.
     */
    open: PropTypes.bool,

    /**
     * The handler of the massaged `click` event.
     */
    onClick: PropTypes.func,

    /**
     * The handler of the massaged `click` event on the heading.
     */
    onHeadingClick: PropTypes.func,
  };

  static defaultProps = {
    title: 'title',
    renderExpando: defaultRenderExpando,
    iconDescription: 'Expand/Collapse',
    open: false,
    onClick: () => {},
    onHeadingClick: () => {},
  };

  static getDerivedStateFromProps({ open }, state) {
    const { prevOpen } = state || {};
    return state && prevOpen === open
      ? null
      : {
          open,
          prevOpen: open,
        };
  }

  handleClick = evt => {
    this.props.onClick(evt);
  };

  handleHeadingClick = evt => {
    const open = !this.state.open;
    this.setState({ open });
    this.props.onHeadingClick({ isOpen: open, event: evt });
  };

  handleKeyPress = evt => {
    const isKeyPressTarget = evt.target === evt.currentTarget;
    const isValidKeyPress = [13, 32].indexOf(evt.which) !== -1;

    if (isKeyPressTarget && isValidKeyPress) {
      this.handleHeadingClick(evt);
    }
  };

  render() {
    const {
      className,
      title,
      renderExpando: Expando,
      iconDescription,
      children,
      onClick, // eslint-disable-line no-unused-vars
      onHeadingClick, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classNames = classnames(
      {
        'bx--accordion__item--active': this.state.open,
      },
      'bx--accordion__item',
      className
    );
    return (
      <li
        className={classNames}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        role="presentation"
        {...other}>
        <Expando
          type="button"
          className="bx--accordion__heading"
          role="tab"
          onClick={this.handleHeadingClick}>
          <Icon
            className="bx--accordion__arrow"
            icon={iconChevronRight}
            description={iconDescription}
          />
          <div className="bx--accordion__title">{title}</div>
        </Expando>
        <div className="bx--accordion__content">{children}</div>
      </li>
    );
  }
}
