function AlphabeticSort(a, b) {
  return a[0].localeCompare(b[0]);
}

export const groupedByCategory = (items, customCategorySorting) => {
  const result = items.reduce((groupedArray, currentItem) => {
    groupedArray[currentItem.category] =
      groupedArray[currentItem.category] || [];
    groupedArray[currentItem.category].push(currentItem);
    return groupedArray;
  }, Object.create(null));

  const finalResult = Object.keys(result).reduce((array, key) => {
    const elementArr = [key, result[key]];
    array.push(elementArr);
    return array;
  }, []);
  const comparator = customCategorySorting
    ? customCategorySorting
    : AlphabeticSort;
  finalResult.sort(comparator);

  return finalResult;
};
