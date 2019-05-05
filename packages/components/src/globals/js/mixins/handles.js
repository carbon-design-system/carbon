/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function(ToMix) {
  /**
   * Mix-in class to manage handles in component.
   * Managed handles are automatically released when the component with this class mixed in is released.
   * @class Handles
   * @implements Handle
   */
  class Handles extends ToMix {
    /**
     * The handled managed by this component.
     * Releasing this component releases the handles.
     * @type {Set<Handle>}
     */
    handles = new Set();

    /**
     * Manages the given handle.
     * @param {Handle} handle The handle to manage.
     * @returns {Handle} The given handle.
     */
    manage(handle) {
      this.handles.add(handle);
      return handle;
    }

    /**
     * Stop managing the given handle.
     * @param {Handle} handle The handle to stop managing.
     * @returns {Handle} The given handle.
     */
    unmanage(handle) {
      this.handles.delete(handle);
      return handle;
    }

    release() {
      this.handles.forEach(handle => {
        handle.release();
        this.handles.delete(handle);
      });
      return super.release();
    }
  }
  return Handles;
}
