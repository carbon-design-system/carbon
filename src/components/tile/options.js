export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-tile]',
    selectorAboveTheFold: '[data-tile-atf]',
    selectorTileInput: '[data-tile-input]',
    classExpandedTile: `${prefix}--tile--is-expanded`,
    classClickableTile: `${prefix}--tile--is-clicked`,
    classSelectableTile: `${prefix}--tile--is-selected`,
  };
};
