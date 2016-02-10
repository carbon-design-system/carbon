export default function promiseTryCatcher(fn) {
  const hasResolveCallback = typeof arguments[2] === 'function';
  const resolve = hasResolveCallback ? arguments[1] : null;
  const reject = hasResolveCallback ? arguments[2] : arguments[1];

  return function promiseTryCatcherFunc() {
    try {
      fn.apply(this, arguments);
    } catch (error) {
      reject(error);
      return;
    }
    if (resolve) {
      resolve();
    }
  };
}
