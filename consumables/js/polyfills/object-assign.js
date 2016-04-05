Object.assign = Object.assign || function assignObject(inDst) {
  if (inDst == null) { // eslint-disable-line eqeqeq
    // Throw if the given destination is null or undefined
    throw new TypeError('Can\'t convert to object: ${dst}');
  }

  const dst = Object(inDst);

  [... arguments].slice(1).forEach((src) => {
    Object.keys(src).forEach((prop) => {
      dst[prop] = src[prop];
    });
  });

  return dst;
};
