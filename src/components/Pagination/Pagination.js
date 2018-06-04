import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import warning from 'warning';
import Icon from '../Icon';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import { equals } from '../../tools/array';

let didWarnAboutDeprecation = false;

export default class Pagination extends Component {
  static propTypes = {
    backwardText: PropTypes.string,
    className: PropTypes.string,
    itemRangeText: PropTypes.func,
    forwardText: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    itemsPerPageText: PropTypes.string,
    itemText: PropTypes.func,
    onChange: PropTypes.func,
    pageNumberText: PropTypes.string,
    pageRangeText: PropTypes.func,
    pageText: PropTypes.func,
    pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    totalItems: PropTypes.number,
    disabled: PropTypes.bool,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    pagesUnknown: PropTypes.bool,
    isLastPage: PropTypes.bool,
    pageInputDisabled: PropTypes.bool,
    onChangeInterval: PropTypes.number,
    defaultPageText: PropTypes.func,
    defaultItemText: PropTypes.func,
  };

  static defaultProps = {
    backwardText: 'Backward',
    itemRangeText: (min, max, total) => `${min}-${max} of ${total} items`,
    forwardText: 'Forward',
    itemsPerPageText: 'items per page',
    onChange: () => {},
    pageNumberText: 'Page Number',
    pageRangeText: (current, total) => `${current} of ${total} pages`,
    disabled: false,
    page: 1,
    pagesUnknown: false,
    isLastPage: false,
    pageInputDisabled: false,
    itemText: (min, max) => `${min}-${max} items`,
    pageText: page => `page ${page}`,
    defaultPageText: totalPages => `${totalPages} pages`,
    defaultItemText: totalItems => `${totalItems} items`,
    onChangeInterval: 250,
  };

  constructor(props) {
    super(props);
    if (__DEV__) {
      warning(
        didWarnAboutDeprecation,
        'The `Pagination` component is being updated in the next release of ' +
          '`carbon-components-react`. Please use `PaginationV2` instead.'
      );
      didWarnAboutDeprecation = true;
    }
  }

  state = {
    page: this.props.page,
    pageSize:
      this.props.pageSize && this.props.pageSizes.includes(this.props.pageSize)
        ? this.props.pageSize
        : this.props.pageSizes[0],
  };

  UNSAFE_componentWillMount() {
    this.uniqueId = `${Math.floor(Math.random() * 0xffff)}`;
  }

  componentDidMount() {
    this.pageInputDebouncer = debounce(
      page =>
        page > 0 &&
        this.props.onChange({ page, pageSize: this.state.pageSize }),
      this.props.onChangeInterval
    );
  }

  componentWillUnmount() {
    this.pageInputDebouncer.cancel();
  }

  UNSAFE_componentWillReceiveProps({ pageSizes, page, pageSize }) {
    if (!equals(pageSizes, this.props.pageSizes)) {
      this.setState({ pageSize: pageSizes[0], page: 1 });
    }
    if (page !== this.props.page) {
      this.setState({
        page,
      });
    }
    if (pageSize !== this.props.pageSize) {
      this.setState({ pageSize });
    }
  }

  handleSizeChange = evt => {
    const pageSize = Number(evt.target.value);
    this.setState({ pageSize, page: 1 });
    this.props.onChange({ page: 1, pageSize });
  };

  handlePageInputChange = evt => {
    const page = Number(evt.target.value);
    if (
      // Added props for defaultPageText and defaultItemText to be
      // used for case when page # is 0 or empty. For other cases
      // existing props will be used.
      page >= 0 &&
      page <=
        Math.max(Math.ceil(this.props.totalItems / this.state.pageSize), 1)
    ) {
      this.setState({ page }, () => this.pageInputDebouncer(this.state.page));
    }
  };

  incrementPage = () => {
    const page = this.state.page + 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  };

  decrementPage = () => {
    const page = this.state.page - 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  };

  getItemsText = () => {
    const {
      pagesUnknown,
      totalItems,
      itemRangeText,
      itemText,
      defaultItemText,
    } = this.props;
    const { pageSize, page } = this.state;

    if (pagesUnknown) {
      return itemText(pageSize * (page - 1) + 1, page * pageSize);
    } else if (page > 0) {
      return itemRangeText(
        Math.min(pageSize * (page - 1) + 1, totalItems),
        Math.min(page * pageSize, totalItems),
        totalItems
      );
    }
    return defaultItemText(totalItems);
  };

  getPagesText = () => {
    const {
      pagesUnknown,
      totalItems,
      pageRangeText,
      pageText,
      defaultPageText,
    } = this.props;
    const { pageSize, page } = this.state;

    if (pagesUnknown) {
      return pageText(page);
    } else if (page > 0) {
      return pageRangeText(page, Math.max(Math.ceil(totalItems / pageSize), 1));
    }
    return defaultPageText(Math.ceil(totalItems / pageSize));
  };

  render() {
    const {
      backwardText,
      className,
      defaultItemText, // eslint-disable-line no-unused-vars
      defaultPageText, // eslint-disable-line no-unused-vars
      forwardText,
      id,
      itemsPerPageText,
      itemRangeText, // eslint-disable-line no-unused-vars
      pageNumberText, // eslint-disable-line no-unused-vars
      pageRangeText, // eslint-disable-line no-unused-vars
      pageSize, // eslint-disable-line no-unused-vars
      pageSizes,
      itemText, // eslint-disable-line no-unused-vars
      pageText, // eslint-disable-line no-unused-vars
      pagesUnknown, // eslint-disable-line no-unused-vars
      isLastPage,
      pageInputDisabled,
      totalItems,
      onChange, // eslint-disable-line no-unused-vars
      onChangeInterval, // eslint-disable-line no-unused-vars
      page: pageNumber, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const statePage = this.state.page;
    const statePageSize = this.state.pageSize;
    const totalPages = Math.max(Math.ceil(totalItems / statePageSize), 1);
    const classNames = classnames('bx--pagination', className);
    const inputId = id || this.uniqueId;

    return (
      <div className={classNames} {...other}>
        <div className="bx--pagination__left">
          <Select
            id={`bx-pagination-select-${inputId}`}
            labelText={itemsPerPageText}
            hideLabel
            onChange={this.handleSizeChange}
            value={statePageSize}>
            {pageSizes.map(size => (
              <SelectItem key={size} value={size} text={String(size)} />
            ))}
          </Select>
          <span className="bx--pagination__text">
            {itemsPerPageText}&nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
          <span className="bx--pagination__text">{this.getItemsText()}</span>
        </div>
        <div className="bx--pagination__right">
          <span className="bx--pagination__text">{this.getPagesText()}</span>
          <button
            className="bx--pagination__button bx--pagination__button--backward"
            onClick={this.decrementPage}
            disabled={this.props.disabled || statePage === 1}>
            <Icon
              className="bx--pagination__button-icon"
              name="chevron--left"
              description={backwardText}
            />
          </button>
          {pageInputDisabled ? (
            <span className="bx--pagination__text">|</span>
          ) : (
            <TextInput
              id={`bx-pagination-input-${inputId}`}
              value={statePage > 0 ? statePage : ''}
              onChange={this.handlePageInputChange}
              labelText={pageNumberText}
              hideLabel
            />
          )}
          <button
            className="bx--pagination__button bx--pagination__button--forward"
            onClick={this.incrementPage}
            disabled={
              this.props.disabled || statePage === totalPages || isLastPage
            }>
            <Icon
              className="bx--pagination__button-icon"
              name="chevron--right"
              description={forwardText}
            />
          </button>
        </div>
      </div>
    );
  }
}
