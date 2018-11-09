async function flatMapAsync(source, mapFn) {
  const results = await Promise.all(source.map(mapFn));
  return results.reduce((acc, result) => acc.concat(result), []);
}

module.exports = {
  flatMapAsync,
};
