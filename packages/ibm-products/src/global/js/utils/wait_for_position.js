/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { act } from 'react';

/**
 * Flushes microtasks to ensure element position state is settled
 * From https://floating-ui.com/docs/react#testing
 * More context here: https://github.com/floating-ui/react-popper/issues/368#issuecomment-1340413010
 */
export const waitForPosition = () => act(async () => {});
