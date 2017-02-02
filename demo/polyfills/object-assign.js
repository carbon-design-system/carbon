Object.assign = Object.assign || function assignObject(inDst, ...inSrcs) {
  if (inDst == null) { // eslint-disable-line eqeqeq
    // Throw if the given destination is null or undefined
    throw new TypeError(`Can't convert to object: ${inDst}`);
  }

  const dst = Object(inDst);

  inSrcs.forEach((inSrc) => {
    const src = Object(inSrc);
    Object.keys(src).forEach((prop) => {
      dst[prop] = src[prop];
    });
  });

  return dst;
};
