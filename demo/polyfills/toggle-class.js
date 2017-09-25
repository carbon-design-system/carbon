const missingNativeDOMTokenListToggleForce = (() => {
  const elem = document.createElement('div');
  const randomClass = `_random_class_${Math.random()
    .toString(36)
    .slice(2)}`;
  elem.classList.toggle(randomClass, false);
  return elem.classList.contains(randomClass);
})();
if (missingNativeDOMTokenListToggleForce) {
  (() => {
    const origToggle = DOMTokenList.prototype.toggle;
    DOMTokenList.prototype.toggle = function toggleDOMTokenList(name, add) {
      return arguments.length < 2 || this.contains(name) === !add
        ? origToggle.call(this, name)
        : add;
    };
  })();
}
