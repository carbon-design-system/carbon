/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const useSkeletons = (hooks) => {
  const useInstance = (instance) => {
    const { isFetching, rows, skeletonRowCount } = instance;

    if (isFetching && skeletonRowCount === 0) {
      throw new Error(
        'skeletonRowCount cannot be set to 0, if isFetching is true'
      );
    }
    const skeletonRow = (id) => ({ isSkeleton: true, values: 'skeleton', id });

    const rowsWithSkeletons = [
      ...rows,
      ...Array.from({ length: skeletonRowCount || 3 }, (_, index) =>
        skeletonRow(`skeleton-row-${index + 1}`)
      ),
    ];
    Object.assign(instance, { rows: isFetching ? rowsWithSkeletons : rows });
  };
  hooks.useInstance.push(useInstance);
};

export default useSkeletons;
