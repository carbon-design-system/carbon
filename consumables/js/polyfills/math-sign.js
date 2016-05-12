Math.sign = Math.sign || function sign(x) {
  const n = +x;
  return n === 0 ? n : n / Math.abs(n);
};
