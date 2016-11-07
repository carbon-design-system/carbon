import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import '@console/bluemix-components/consumables/scss/components/notifications/notifications.scss';

class Notification extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    caption: PropTypes.string,
    onCloseButtonClick: PropTypes.func,
    iconDescription: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onCloseButtonClick: () => {},
    iconDescription: 'closes notification',
  }

  state = {
    open: true,
  };

  handleCloseButtonClick = (evt) => {
    this.setState({ open: false });
    this.props.onCloseButtonClick(evt);
  }

  render() {
    if (!this.state.open) {
      return null;
    }

    const {
      onCloseButtonClick, // eslint-disable-line
      iconDescription, // eslint-disable-line
      className,
      caption,
      subtitle,
      title,
      kind,
      ...other,
    } = this.props;

    const notificationClasses = {
      toast: classNames(
        'bx--notification--new',
        { [`bx--notification--${this.props.kind}`]: this.props.kind },
        className,
      ),
      inline: classNames({
        [`bx--notification-inline--${this.props.kind}`]: this.props.kind,
        [this.props.className]: this.props.className,
      }),
    };

    const commonProps = {
      alert: {
        role: 'alert',
        kind,
      },
      button: {
        type: 'button',
        onClick: this.handleCloseButtonClick,
      },
    };

    const toastHTML = (
      <div
        {...other}
        {...commonProps.alert}
        className={notificationClasses.toast}
      >
        <div className="bx--notification__details">
          <h3 className="bx--notification__title">{title}</h3>
          <p className="bx--notification__subtitle">{subtitle}</p>
          <p className="bx--notification__caption">{caption}</p>
        </div>
        <button {...commonProps.button} className="bx--notification__close-button">
          <Icon
            description={this.props.iconDescription}
            className="bx--notification__icon"
            aria-label="close"
            name="close"
          />
        </button>
      </div>
    );

    const inlineHTML = (
      <div
        {...other}
        {...commonProps.alert}
        className={notificationClasses.inline}
      >
        <div className="bx--notification-inline__details">
          <Icon
            description={this.props.iconDescription}
            className="bx--notification-inline__icon--left"
            aria-label="close"
            name={kind}
          />
          <div className="bx--notification-inline__text">
            <p className="bx--notification-inline__title">{title}</p>
            <p className="bx--notification-inline__subtitle">{subtitle}</p>
          </div>
        </div>
        <button {...commonProps.button} className="bx--notification-inline__close-button">
          <Icon
            description={this.props.iconDescription}
            className="bx--notification-inline__icon--right"
            aria-label="close"
            name="close"
          />
        </button>
      </div>
    );

    return (caption) ? toastHTML : inlineHTML;
  }
}

export default Notification;
