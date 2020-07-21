if (typeof Element.prototype.closest !== 'function') {
  Element.prototype.closest = function closestElement(selector) {
    const doc = this.ownerDocument;
    for (
      let traverse = this;
      traverse && traverse !== doc;
      traverse = traverse.parentNode
    ) {
      if (traverse.matches(selector)) {
        return traverse;
      }
    }
    return null;
  };
}
