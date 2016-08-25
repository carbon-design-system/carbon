import React from 'react';
import classNames from 'classnames';
import Icon from '../elements/Icon';
import '@console/bluemix-components/consumables/scss/components/card/card.scss';

class CardActionItem extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    ariaLabel: React.PropTypes.string,
    iconName: React.PropTypes.string.isRequired,
    restartApp: React.PropTypes.func,
  }

  static defaultProps = {
  }

  render() {
    const {
      id,
      ariaLabel,
      iconName,
      ...other,
    } = this.props;

    const cardActionItemClasses = classNames({
      'bx--app-actions__button': true,
      [this.props.className]: this.props.className,
    });

    return (
      <button
        {...other}
        className={cardActionItemClasses}
        id={id}
        aria-label={ariaLabel}
      >
        <Icon
          className="bx--app-actions__button--icon"
          name={iconName}
        />
      </button>
    );
  }
}

export default CardActionItem;
