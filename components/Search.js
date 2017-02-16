import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';
if (process.env.importSASS || process.env.importSASS === undefined) {
  require('@console/bluemix-components/consumables/scss/base-elements/search/search.scss');
}

class Search extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    small: React.PropTypes.bool,
    placeHolderText: React.PropTypes.string,
    labelText: React.PropTypes.string,
    id: React.PropTypes.string,
    searchButtonLabelText: React.PropTypes.string,
    layoutButtonLabelText: React.PropTypes.string,
  };

  static defaultProps = {
    className: 'bx--search bx--search-with-options',
    type: 'search',
    small: false,
    placeHolderText: '',
  };

  state = {
    format: 'list',
  }

  toggle = () => {
    if (this.state.format === 'list') {
      this.setState({
        format: 'grid',
      });
    } else {
      this.setState({
        format: 'list',
      });
    }
  }

  render() {
    const { className, type, id, placeHolderText, labelText, small,
            searchButtonLabelText, layoutButtonLabelText, ...other } = this.props;

    const searchClasses = classNames({
      'bx--search bx--search-with-options': true,
      'bx--search--sm': small,
      [className]: className,
    });

    return (
      <div className={searchClasses} role="search">
        <Icon
          name="search--glyph"
          description="search"
          className="bx--search__icon--magnifier"
        />
        <label htmlFor={id} className="bx--search__label">{labelText}</label>
        <input
          {...other}
          type={type}
          className="bx--search__input"
          id={id}
          placeholder={placeHolderText}
        />
        {!small ? (
          <div>
            <button className="bx--search__sort" type="button" aria-label={searchButtonLabelText}>
              <Icon
                name="filter--glyph"
                description="search"
                className="bx--search__icon"
              />
            </button>
            <button
              className="bx--search__toggle-layout"
              type="button"
              onClick={this.toggle}
              data-search-toggle-btn
              aria-label={layoutButtonLabelText}
            >
              {this.state.format === 'list' ? (
                <div className="bx--search__toggle-layout__container" data-search-toggle-layout="list">
                  <Icon
                    name="list"
                    description="list"
                    className="bx--search__icon"
                  />
                </div>
              ) : (
                <div
                  className="bx--search__toggle-layout__container"
                  data-search-toggle-layout="grid"
                >
                  <Icon
                    name="grid"
                    description="toggle-layout"
                    className="bx--search__icon"
                  />
                </div>
              )}
            </button>
          </div>
        ) : ''}
      </div>
    );
  }
}

export default Search;
