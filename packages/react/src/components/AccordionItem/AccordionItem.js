/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import ChevronRight16 from '@carbon/icons-react/lib/chevron--right/16';
import { match, keys } from '../../tools/key';

const { prefix } = settings;

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
    const { prevOpen } = state;
    return prevOpen === open
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

  handleKeyDown = evt => {
    if (
      match(evt.which, keys.ESC) &&
      this.state.open &&
      evt.target.classList.contains(`${prefix}--accordion__heading`)
    ) {
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
        [`${prefix}--accordion__item--active`]: this.state.open,
      },
      `${prefix}--accordion__item`,
      className
    );
    return (
      <li
        className={classNames}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        {...other}>
        <Expando
          type="button"
          aria-expanded={this.state.open}
          className={`${prefix}--accordion__heading`}
          onClick={this.handleHeadingClick}
          title={iconDescription}>
          <ChevronRight16
            className={`${prefix}--accordion__arrow`}
            aria-label={iconDescription}
          />
          <div className={`${prefix}--accordion__title`}>{title}</div>
        </Expando>
        <div className={`${prefix}--accordion__content`}>{children}</div>
      </li>
    );
  }
}
