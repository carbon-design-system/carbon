import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Icon from './Icon';

export default class CopyButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    feedback: PropTypes.string,
    feedbackTimeout: PropTypes.number,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    feedback: 'Copied!',
    feedbackTimeout: 2000,
    onClick: () => {},
  };
  state = {
    showFeedback: false,
  };
  /* istanbul ignore next */
  componentWillUnmount() {
    if (typeof this.timeoutId !== 'undefined') {
      clearTimeout(this.timeoutId);
      delete this.timeoutId;
    }
  }
  handleClick = evt => {
    this.setState({ showFeedback: true });
    this.timeoutId = setTimeout(
      () => {
        this.setState({ showFeedback: false });
      },
      this.props.feedbackTimeout,
    );

    this.props.onClick(evt);
  }; // eslint-disable-line no-unused-vars
  render() {
    const {
      className,
      feedback,
      feedbackTimeout, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;
    const classNames = classnames('bx--snippet-button', className);
    const feedbackClassNames = classnames('bx--btn--copy__feedback', {
      'bx--btn--copy__feedback--displayed': this.state.showFeedback,
    });
    return (
      <button
        type="button"
        className={classNames}
        onClick={this.handleClick}
        {...other}
      >
        <Icon className="bx--snippet__icon" name="copy" description="" />
        <div className={feedbackClassNames} data-feedback={feedback} />
      </button>
    );
  }
}
