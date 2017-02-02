import React, { PropTypes } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/content-switcher/content-switcher.scss';

class ContentSwitcher extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    selectedIndex: 0,
  }

  getChildren(children) {
    return React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        index,
        onClick: this.handleChildChange,
        onKeyDown: this.handleChildChange,
        selected: index === this.state.selectedIndex,
      })
    );
  }

  handleChildChange = (data) => {
    const { selectedIndex } = this.state;
    const { index } = data;

    if (selectedIndex !== index) {
      this.setState({ selectedIndex: index });
      this.props.onChange(data);
    }
  }

  render() {
    const {
      children,
      className,
      ...other,
    } = this.props;

    const classes = classNames(
      'bx--content-switcher',
      className,
    );

    return (
      <div
        {...other}
        className={classes}
      >
        {this.getChildren(children)}
      </div>
    );
  }
}

export default ContentSwitcher;
