/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

const VisuallyHidden = React.forwardRef((props, ref) => {
  return <span ref={ref} className="bx--visually-hidden" {...props} />;
});

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;
