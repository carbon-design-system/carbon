const translationKeys = {
  itemPosition: 'carbon.listbox.item.position',
  noResult: 'carbon.listbox.item.none',
  resultCount: 'carbon.listbox.item.count',
  resultCountPlural: 'carbon.listbox.item.count_plural',
};

const defaultTranslations = {
  [translationKeys.itemPosition]: '{{highlightedIndex}} of {{resultCount}}',
  [translationKeys.noResult]: 'No results are available.',
  [translationKeys.resultCount]:
    '{{count}} result is available, use up and down arrow keys to navigate. Press Enter key to select.',
  [translationKeys.resultCountPlural]:
    '{{count}} results are available, use up and down arrow keys to navigate. Press Enter key to select.',
};

const defaultTranslateWithId = (id, state) =>
  defaultTranslations[id].replace(/{{(\w+?)}}/g, (_, token) => state[token]);

/**
 * @param {object} props The React props for a component using Downshift.
 * @param {Function} [props.translateWithId]
 *   A custom translation function that takes in a message identifier and returns the localized string for the message.
 * @returns {Function} A function to be used as Downshift `getA11yStatusMessage` prop.
 */
function getA11yStatusMessageProp({
  translateWithId = defaultTranslateWithId,
}) {
  return ({
    highlightedIndex,
    highlightedItem,
    isOpen,
    selectedItem,
    resultCount,
    previousResultCount,
    itemToString,
  }) => {
    if (!isOpen) {
      return selectedItem ? itemToString(selectedItem) : '';
    }
    if (!resultCount) {
      return translateWithId(translationKeys.noResult);
    }
    if (resultCount !== previousResultCount) {
      return translateWithId(translationKeys.resultCount, {
        count: resultCount,
      });
    }
    return [
      itemToString(highlightedItem),
      translateWithId(translationKeys.itemPosition, {
        highlightedIndex: highlightedIndex + 1,
        resultCount,
      }),
    ].join('\n');
  };
}

export default getA11yStatusMessageProp;
