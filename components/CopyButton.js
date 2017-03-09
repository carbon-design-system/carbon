import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Icon from './Icon';

export default class CopyButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    feedback: PropTypes.string,
    feedbackTimeout: PropTypes.number,
    onClick: PropTypes.func,
  }
  static defaultProps = {
    disabled: false,
    feedbackTimeout: 2000,
    onClick: () => {},
  }
  state = {
    showFeedback: false,
  }
  /* istanbul ignore next */
  componentWillUnmount() {
    if (typeof this.timeoutId !== 'undefined') {
      clearTimeout(this.timeoutId);
      delete this.timeoutId;
    }
  }
  handleClick = (evt) => {
    this.setState({ showFeedback: true });
    this.timeoutId = setTimeout(() => {
      this.setState({ showFeedback: false });
    }, this.props.feedbackTimeout);

    this.props.onClick(evt);
  }
  render() {
    const {
      children,
      className,
      disabled,
      feedback,
      feedbackTimeout, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;
    const classNames = classnames('bx--btn--copy', className);
    const feedbackClassNames = classnames('bx--btn--copy__feedback', {
      'bx--btn--copy__feedback--displayed': this.state.showFeedback,
    });
    return (
      <button type="button" className={classNames} onClick={this.handleClick} disabled={disabled} {...other}>
        {children}
        <Icon className="bx--btn--right-icon__icon bx--btn--right-icon__use" name="add--glyph" description="" />
        <div className={feedbackClassNames} data-feedback={feedback} />
      </button>
    );
  }
}
