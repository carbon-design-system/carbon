import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { iconCheckmarkSolid, iconChevronDown } from 'carbon-icons';
import Icon from '../Icon';

export class Tile extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;
    const tileClasses = classNames('bx--tile', className);

    return (
      <div className={tileClasses} {...other}>
        {children}
      </div>
    );
  }
}

export class ClickableTile extends Component {
  static propTypes = {
    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The href for the link.
     */
    href: PropTypes.string,

    /**
     * The rel property for the link.
     */
    rel: PropTypes.string,
  };

  static defaultProps = {
    clicked: false,
    handleClick: () => {},
    handleKeyDown: () => {},
  };

  handleClick = evt => {
    this.setState(
      {
        clicked: !this.state.clicked,
      },
      () => {
        this.props.handleClick(evt);
      }
    );
  };

  handleKeyDown = evt => {
    if (evt.which === 13 || evt.which === 32) {
      this.setState(
        {
          clicked: !this.state.clicked,
        },
        () => {
          this.props.handleKeyDown(evt);
        }
      );
    } else {
      this.props.handleKeyDown(evt);
    }
  };

  static getDerivedStateFromProps({ clicked }, state) {
    const { prevClicked } = state || {};
    return state && prevClicked === clicked
      ? null
      : {
          clicked,
          prevClicked: clicked,
        };
  }

  render() {
    const {
      children,
      href,
      className,
      handleClick, // eslint-disable-line
      handleKeyDown, // eslint-disable-line
      clicked, // eslint-disable-line
      ...other
    } = this.props;

    const classes = classNames(
      'bx--tile',
      'bx--tile--clickable',
      {
        'bx--tile--is-clicked': this.state.clicked,
      },
      className
    );

    return (
      <a
        href={href}
        className={classes}
        {...other}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}>
        {children}
      </a>
    );
  }
}

export class SelectableTile extends Component {
  state = {
    selected: this.props.selected,
  };

  static propTypes = {
    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * `true` to select this tile.
     */
    selected: PropTypes.bool,

    /**
     * The ID of the `<input>`.
     */
    id: PropTypes.string,

    /**
     * The value of the `<input>`.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

    /**
     * The `name` of the `<input>`.
     */
    name: PropTypes.string,

    /**
     * The `title` of the `<input>`.
     */
    title: PropTypes.string,

    /**
     * The description of the checkmark icon.
     */
    iconDescription: PropTypes.string,
  };

  static defaultProps = {
    value: 'value',
    title: 'title',
    iconDescription: 'Tile checkmark',
    selected: false,
    handleClick: () => {},
    handleKeyDown: () => {},
  };

  handleClick = evt => {
    evt.preventDefault();
    const isInput = evt.target === this.input;
    if (!isInput) {
      this.setState(
        {
          selected: !this.state.selected,
        },
        () => {
          this.props.handleClick(evt);
        }
      );
    } else {
      this.props.handleClick(evt);
    }
  };

  handleKeyDown = evt => {
    evt.preventDefault();
    if (evt.which === 13 || evt.which === 32) {
      this.setState(
        {
          selected: !this.state.selected,
        },
        () => {
          this.props.handleKeyDown(evt);
        }
      );
    } else {
      this.props.handleKeyDown(evt);
    }
  };

  static getDerivedStateFromProps({ selected }, state) {
    const { prevSelected } = state || {};
    return state && prevSelected === selected
      ? null
      : {
          selected,
          prevSelected: selected,
        };
  }

  render() {
    const {
      children,
      id,
      tabIndex,
      value,
      name,
      title,
      iconDescription,
      className,
      handleClick, // eslint-disable-line
      handleKeyDown, // eslint-disable-line
      ...other
    } = this.props;

    const classes = classNames('bx--tile', 'bx--tile--selectable', className);

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <label
        htmlFor={id}
        className={classes}
        tabIndex={tabIndex}
        {...other}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}>
        <input
          ref={input => {
            this.input = input;
          }}
          tabIndex={-1}
          id={id}
          className="bx--tile-input"
          value={value}
          type="checkbox"
          name={name}
          title={title}
          checked={this.state.selected}
        />
        <div className="bx--tile__checkmark">
          <Icon icon={iconCheckmarkSolid} description={iconDescription} />
        </div>
        <div className="bx--tile-content">{children}</div>
      </label>
    );
  }
}

export class ExpandableTile extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    expanded: PropTypes.bool,
    tabIndex: PropTypes.number,
    tileCollapsedIconText: PropTypes.string,
    tileExpandedIconText: PropTypes.string,
  };

  static defaultProps = {
    tabIndex: 0,
    expanded: false,
    tileMaxHeight: '0',
    handleClick: () => {},
    tileCollapsedIconText: 'Expand',
    tileExpandedIconText: 'Collapse',
  };

  static getDerivedStateFromProps(
    { expanded, tileMaxHeight, tilePadding },
    state
  ) {
    const {
      prevExpanded,
      prevTileMaxHeight,
      prevTilePadding,
      expanded: currentExpanded,
      tileMaxHeight: currentTileMaxHeight,
      tilePadding: currentTilePadding,
    } =
      state || {};
    const expandedChanged = prevExpanded !== expanded;
    const tileMaxHeightChanged = prevTileMaxHeight !== tileMaxHeight;
    const tilePaddingChanged = prevTilePadding !== tilePadding;
    return state &&
      !expandedChanged &&
      !tileMaxHeightChanged &&
      !tilePaddingChanged
      ? null
      : {
          expanded: !expandedChanged ? currentExpanded : expanded,
          tileMaxHeight: !tileMaxHeightChanged
            ? currentTileMaxHeight
            : tileMaxHeight,
          tilePadding: !tilePaddingChanged ? currentTilePadding : tilePadding,
          prevExpanded: expanded,
          prevTileMaxHeight: tileMaxHeight,
          prevTilePadding: tilePadding,
        };
  }

  componentDidMount = () => {
    if (this.refs[0]) {
      this.aboveTheFold = ReactDOM.findDOMNode(this.refs[0]); // eslint-disable-line
    }
    const getStyle = window.getComputedStyle(this.tile, null);
    this.setState({
      tileMaxHeight: this.aboveTheFold.getBoundingClientRect().height,
      tilePadding:
        parseInt(getStyle.getPropertyValue('padding-top'), 10) +
        parseInt(getStyle.getPropertyValue('padding-bottom'), 10),
    });
  };

  setMaxHeight = () => {
    if (this.state.expanded) {
      this.setState({
        tileMaxHeight: this.tileContent.getBoundingClientRect().height,
      });
    } else {
      this.setState({
        tileMaxHeight: this.aboveTheFold.getBoundingClientRect().height,
      });
    }
  };

  handleClick = evt => {
    this.setState(
      {
        expanded: !this.state.expanded,
      },
      () => {
        this.setMaxHeight();
        this.props.handleClick(evt);
      }
    );
  };

  getChildren = () => {
    return React.Children.map(this.props.children, child => child);
  };

  render() {
    const {
      tabIndex,
      className,
      tileMaxHeight, // eslint-disable-line
      tilePadding, // eslint-disable-line
      handleClick, // eslint-disable-line
      expanded, // eslint-disable-line
      tileCollapsedIconText, // eslint-disable-line
      tileExpandedIconText, // eslint-disable-line
      ...other
    } = this.props;

    const classes = classNames(
      'bx--tile',
      'bx--tile--expandable',
      {
        'bx--tile--is-expanded': this.state.expanded,
      },
      className
    );

    const tileStyle = {
      maxHeight: this.state.tileMaxHeight + this.state.tilePadding,
    };
    const content = this.getChildren().map((child, index) => {
      return React.cloneElement(child, { ref: index });
    });
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        ref={tile => {
          this.tile = tile;
        }}
        style={tileStyle}
        className={classes}
        {...other}
        role="button"
        onClick={this.handleClick}
        tabIndex={tabIndex}>
        <button className="bx--tile__chevron">
          <Icon
            icon={iconChevronDown}
            description={
              this.state.expanded ? tileExpandedIconText : tileCollapsedIconText
            }
          />
        </button>
        <div
          ref={tileContent => {
            this.tileContent = tileContent;
          }}
          className="bx--tile-content">
          {content}
        </div>
      </div>
    );
  }
}

export class TileAboveTheFoldContent extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return <span className="bx--tile-content__above-the-fold">{children}</span>;
  }
}

export class TileBelowTheFoldContent extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return <span className="bx--tile-content__below-the-fold">{children}</span>;
  }
}
