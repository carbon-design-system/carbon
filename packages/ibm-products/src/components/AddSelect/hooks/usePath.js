//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { useState, useEffect } from 'react';

const usePath = (itemsLabel = '') => {
  const [path, setPath] = useState([
    {
      id: 'base_of_path',
      title: itemsLabel,
    },
  ]);

  useEffect(() => {
    setPath([
      {
        id: 'base_of_path',
        title: itemsLabel,
      },
    ]);
  }, [itemsLabel]);

  const handler = (id, title, parentId) => {
    if (path.find((entry) => entry.id === id)) {
      return;
    }

    const pathEntry = {
      id,
      title,
      ...(parentId && { parentId }),
    };

    if (path.find((entry) => entry.parentId === parentId)) {
      const parentIdx = path.findIndex((entry) => entry.id === parentId);
      const pathCopy = [...path];
      pathCopy.length = parentIdx + 1;
      setPath([...pathCopy, pathEntry]);
    } else {
      setPath([...path, pathEntry]);
    }
  };

  const pathClickHandler = (idx) => {
    const pathCopy = [...path];
    pathCopy.length = idx + 1;
    setPath([...pathCopy]);
  };

  const resetPath = () => {
    setPath([
      {
        id: 'base_of_path',
        title: itemsLabel,
      },
    ]);
  };

  return {
    path,
    setPath: handler,
    pathOnclick: pathClickHandler,
    resetPath,
  };
};

export default usePath;
