import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

/**
 * `ListBoxSelection` is used to provide controls for clearing a selection, in
 * addition to conditionally rendering a badge if the control has more than one
 * selection.
 */
const ListBoxSelection = ({
  clearSelection,
  selectionCount,
  translateWithId: t,
}) => {
  const className = cx({
    'bx--list-box__selection': true,
    'bx--list-box__selection--multi': selectionCount,
  });
  const handleOnClick = event => {
    // If we have a mult-select badge, clicking it shouldn't open the menu back
    // up. However, if we have a clear badge then we want the click to have this
    // behavior.
    if (selectionCount) {
      event.stopPropagation();
    }
    clearSelection(event);
  };
  const handleOnKeyDown = event => {
    // When a user hits ENTER, we'll clear the selection
    if (event.keyCode === 13) {
      clearSelection(event);
    }
  };
  const description = selectionCount ? t('clear.all') : t('clear.selection');
  return (
    <div
      role="button"
      className={className}
      tabIndex="0"
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      title={description}>
      {selectionCount}
      <Icon name="close" description={description} focusable="false" />
    </div>
  );
};

export const translationIds = {
  'clear.all': 'clear.all',
  'clear.selection': 'clear.selection',
};

const defaultTranslations = {
  [translationIds['clear.all']]: 'Clear all selected items',
  [translationIds['clear.selection']]: 'Clear selected item',
};

ListBoxSelection.propTypes = {
  /**
   * Specify a function to be invoked when a user interacts with the clear
   * selection element.
   */
  clearSelection: PropTypes.func.isRequired,

  /**
   * Specify an optional `selectionCount` value that will be used to determine
   * whether the selection should display a badge or a single clear icon.
   */
  selectionCount: PropTypes.number,

  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes in an id defined in `translationIds` and should
   * return a string message for that given message id.
   */
  translateWithId: PropTypes.func.isRequired,
};

ListBoxSelection.defaultProps = {
  translateWithId: id => defaultTranslations[id],
};

export default ListBoxSelection;
