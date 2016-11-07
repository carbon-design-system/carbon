import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import '@console/bluemix-components/consumables/scss/base-elements/search/search.scss';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  placeHolderText: React.PropTypes.string,
  labelText: React.PropTypes.string,
  id: React.PropTypes.string,
  onBlur: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  onKeyUp: React.PropTypes.func,
  onKeyboardFocus: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onMouseEnter: React.PropTypes.func,
  onMouseLeave: React.PropTypes.func,
  onMouseUp: React.PropTypes.func,
};

const defaultProps = {
  className: 'bx--search',
  type: 'search',
  placeHolderText: '',
};

const Search = ({ className, type, id, placeHolderText, labelText, ...other }) => {
  const searchClasses = classNames({
    'bx--search': true,
    [className]: className,
  });

  return (
    <div className={searchClasses} role="search">
      <Icon
        name="search"
        description="search"
        className="bx--search__icon--magnifier"
        width="22px"
        height="22px"
      />
      <label htmlFor={id} className="bx--search__label">{labelText}</label>
      <input
        {...other}
        type={type}
        className="bx--search__input"
        id={id}
        placeholder={placeHolderText}
      />
      <button
        className="bx--search__filter"
        type="button"

      >
        <Icon
          name="filter"
          description="search"
          className="bx--search__icon--filter"
          width="16px"
          height="16px"
        />
        <span className="filter__text">Filter</span>
      </button>
    </div>
  );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
