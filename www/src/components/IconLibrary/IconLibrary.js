import React from 'react';
import { Search, Loading } from 'carbon-components-react';
import ClickableTile from './ClickableTile';
import githubIcon from '../../images/github-icon.png';

const sizes = ['16', '20', '24', '32'];

/**
 * Provides support for our experimental icon library, `@carbon/icons-react`,
 * at the /experimental/iconography/library route
 */
export default class IconLibrary extends React.Component {
  state = {
    /**
     * The error if an error occurs while loading icons
     */
    errorLoadingIcons: null,

    /**
     * Icon data that we load from `@carbon/icons-react`
     */
    icons: null,

    /**
     * Initialize as loading by default since we need to fetch all the icons
     */
    isLoading: true,

    /**
     * Initialize with empty string value for search
     */
    searchValue: '',
  };

  /**
   * Filter the current icon set by the given search value. Will shortcircuit if
   * searchValue is an empty string as all icons will be visible with that
   * query.
   */
  filterIcons = () => {
    this.setState(state => {
      const { icons, searchValue } = state;
      const filteredIcons = Object.keys(icons).filter(icon => {
        return (
          searchValue === '' || icon.toLowerCase().indexOf(searchValue) !== -1
        );
      });
      return {
        filteredIcons,
        sections: createIconSections(icons, filteredIcons),
      };
    });
  };

  /**
   * Handle the `onChange` event from the Search component. We take the value of
   * the event and set it as the searchValue, we then defer an update with
   * `filterIcons` after the state has changed.
   */
  handleOnChange = event => {
    const searchValue = event.target.value.trim().toLowerCase();
    this.setState(
      {
        searchValue,
      },
      () => {
        this.filterIcons();
      }
    );
  };

  /**
   * clear search state to reset view to default
   */
  handleClearSearch = event => {
    event.preventDefault();
    this.setState(
      {
        searchValue: '',
      },
      () => {
        this.filterIcons();
      }
    );
  };

  /**
   * When our component mounts, we need to fetch the icon data from
   * `@carbon/react`
   */
  componentDidMount() {
    import('@carbon/icons-react')
      .then(result => {
        const icons = Object.keys(result)
          .filter(name => name !== 'Icon')
          .reduce(
            (acc, name) => ({
              ...acc,
              [name]: result[name],
            }),
            {}
          );
        const filteredIcons = Object.keys(icons);
        this.setState({
          icons,
          filteredIcons,
          sections: createIconSections(icons, filteredIcons),
          isLoading: false,
          error: null,
        });
      })
      .catch(error => {
        this.setState({
          errorLoadingIcons: error,
          isLoading: false,
          icons: null,
        });
      });
  }

  render() {
    const {
      errorLoadingIcons,
      filteredIcons,
      isLoading,
      sections,
    } = this.state;

    const search = (
      <Search
        light
        className="icon-search bx--search--light" // search updated to support `light` prop in https://github.com/carbon-design-system/carbon/pull/3230
        onChange={this.handleOnChange}
        placeHolderText="Search by icon name"
        aria-label="Icon library search"
        value={this.state.searchValue}
        labelText="Icon library search"
      />
    );

    if (isLoading) {
      return (
        <div className="page">
          {search}
          {isLoading && <Loading />}
        </div>
      );
    }

    if (errorLoadingIcons) {
      console.error(errorLoadingIcons); // eslint-disable-line no-console
      return (
        <div className="page bx--row">
          <div className="bx--col-lg-12 bx--offset-lg-4">
            <h3>Yikes! Looks like something went wrong.</h3>
            <p>
              We're still working out some problems in our experimental website.
              If you can, we'd appreciate it if you could make an issue on{' '}
              <a
                href="https://github.com/carbon-design-system/carbon-website-gatsby"
                rel="noopener noreferrer"
                target="_blank">
                our repo
              </a>{' '}
              to make sure that this gets fixed!
            </p>
          </div>
        </div>
      );
    }

    if (filteredIcons.length === 0) {
      return (
        <div className="page bx--row">
          <div className="bx--col-lg-8 bx--offset-lg-4 bx--no-gutter-md bx--no-gutter-lg">
            {search}
          </div>
          <div className="icon-search--message bx--col-lg-12 bx--offset-lg-4">
            <p className="icon-search--message__no-results">
              It appears we don’t have an icon that matches your search. Try
              different search terms or give us a hand—submit your own design to
              the library!
            </p>
          </div>
          <div className="bx--offset-lg-4 bx--col-lg-4 bx--col-md-3 bx--col-sm-4 bx--no-gutter-sm bx--no-gutter-md bx--no-gutter-lg">
            <ClickableTile
              title="Submit an icon design."
              href="https://github.com/carbon-design-system/carbon/tree/master/packages/icons"
              type="resource">
              <img alt="github icon" src={githubIcon} />
            </ClickableTile>
          </div>
        </div>
      );
    }

    return (
      <div className="page bx--row">
        <div className="icon-search--wrapper bx--col-lg-8 bx--offset-lg-4 bx--no-gutter-md bx--no-gutter-lg">
          {search}
          {this.state.searchValue || this.state.searchValue !== '' ? (
            <p className="icon-search--status">
              {filteredIcons.length} matches found! Or clear to{' '}
              <button onClick={this.handleClearSearch}>view all</button> icons.
            </p>
          ) : (
            ''
          )}
        </div>
        <div className="bx--col-lg-12 bx--offset-lg-4 bx--no-gutter-sm bx--no-gutter-md bx--no-gutter-lg">
          {sections}
        </div>
      </div>
    );
  }
}

/**
 * Takes a flat object where the keys are icon names and transforms them into an
 * object where each key is a size and the value is an array of icons at that
 * size.
 */
function groupIconsBySize(icons) {
  return Object.keys(icons).reduce((acc, iconName) => {
    const [group] = sizes.filter(size => iconName.indexOf(size) !== -1);
    const friendlyName = iconName.replace(group, '');
    if (!group) {
      return acc;
    }

    const details = {
      name: iconName,
      friendlyName,
      group,
      Component: icons[iconName],
    };

    if (acc[group]) {
      return {
        ...acc,
        [group]: acc[group].concat(details),
      };
    }

    return {
      ...acc,
      [group]: [details],
    };
  }, {});
}

/**
 * Creates all the sections for the icons but filters by what icons are
 * available in filteredIcons. We use this method as part of our state
 * transformations above, instead of in the render method, because including
 * this in render causes noticeable jank in the UI. If we instead perform work
 * after the state transition for the search bar, then we get less noticeable
 * lag on the input.
 */
function createIconSections(icons, filteredIcons) {
  const groups = groupIconsBySize(icons);

  return Object.keys(groups)
    .filter(size => {
      if (!Array.isArray(groups[size])) {
        return false;
      }
      return groups[size].length !== 0;
    })
    .map(size => {
      return (
        <section key={size} className="icon-size" aria-labelledby={`icon-h2`}>
          <header>
            <h2 className={`icon-h2`}>
              {isNaN(size) ? size : `${size}x${size}`}
            </h2>
          </header>
          <ul className="icons-list">
            {renderIconList(groups[size], filteredIcons)}
          </ul>
        </section>
      );
    });
}

/**
 * render list of available icons for this category.
 * if none are available, return a blank block
 */

function renderIconList(categoryArray, filteredList) {
  const displayedIconsList = categoryArray.filter(
    icon => filteredList.indexOf(icon.name) !== -1
  );

  const displayedIcons = displayedIconsList.map(renderIcon);

  if (displayedIcons.length > 0) {
    return displayedIcons;
  }

  return (
    <li className="icon__container">
      <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
        <div className="icon__card bx--aspect-ratio--object" />
        <p className="icon__card-no__results">
          No results in this size.
          <br />
          <br />
          Scale the closest size to use this icon.
        </p>
      </div>
    </li>
  );
}

/**
 * Renders an individual icon
 * passing `null` renders no-results icon block
 */
function renderIcon(icon) {
  return (
    <li key={icon.name} className="icon__container">
      <div className="bx--aspect-ratio bx--aspect-ratio--1x1">
        <div className="icon__card bx--aspect-ratio--object">
          <icon.Component />
        </div>
        <h5 className="icon__card-title" title={icon.name}>
          {icon.name}
        </h5>
        <span className="icon__card-details" title={icon.name} />
      </div>
    </li>
  );
}
