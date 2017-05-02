import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import ClickListener from '../internal/ClickListener';

class ToolbarSearch extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    small: React.PropTypes.bool,
    placeHolderText: React.PropTypes.string,
    labelText: React.PropTypes.string,
    id: React.PropTypes.string,
  };

  static defaultProps = {
    type: 'search',
    id: 'search__input',
  };

  state = {
    expanded: false,
  };

  expandSearch = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
    this.input.focus();
  };

  handleClickOutside = () => {
    this.setState({
      expanded: false,
    });
  };

  render() {
    const {
      className,
      type,
      id,
      placeHolderText,
      labelText,
      ...other
    } = this.props;

    const searchClasses = classNames({
      'bx--search bx--search--sm bx--toolbar-search': true,
      'bx--toolbar-search--active': this.state.expanded,
      [className]: className,
    });

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div className={searchClasses} role="search">
          <label htmlFor={id} className="bx--label">{labelText}</label>
          <input
            {...other}
            type={type}
            className="bx--search-input"
            id={id}
            placeholder={placeHolderText}
            ref={input => {
              this.input = input;
            }}
          />
          <button
            className="bx--toolbar-search__btn"
            onClick={this.expandSearch}
          >
            <Icon
              name="search--glyph"
              description="search"
              className="bx--search-magnifier"
            />
          </button>
        </div>
      </ClickListener>
    );
  }
}

export default ToolbarSearch;
