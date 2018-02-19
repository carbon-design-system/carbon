export default settings => {
  const { prefix } = settings;
  return {
    selectorInit: '[data-overflow-menu]',
    selectorOptionMenu: `.${prefix}--overflow-menu-options`,
    classShown: `${prefix}--overflow-menu--open`,
    classMenuShown: `${prefix}--overflow-menu-options--open`,
    classMenuFlip: `${prefix}--overflow-menu--flip`,
    objMenuOffset: { top: 3, left: 61 },
    objMenuOffsetFlip: { top: 3, left: -61 },
  };
};
