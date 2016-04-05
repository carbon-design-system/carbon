Array.from = Array.from || function fromArray(a) {
  return Array.prototype.slice.call(a);
};
