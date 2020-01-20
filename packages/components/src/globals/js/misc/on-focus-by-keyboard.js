/**
 * Differentiate between keyboard and mouse-triggered focusout/blur events
 * @param {Element} node  The element to attach event listeners to
 * @param {string} name The event name to listen to
 * @param {Function} callback The callback function to invoke
 * @returns {Handle} The handle to release the attached event handler
 */
export default function onFocusByKeyboard(node, name, callback) {
  const hasFocusout = 'onfocusout' in window;
  const focusinEventName = hasFocusout ? 'focusin' : 'focus';
  const focusoutEventName = hasFocusout ? 'focusout' : 'blur';
  /**
   * Event types supported by this function
   * @type {object<string, string>}
   */
  const supportedEvents = {
    focus: focusinEventName,
    blur: focusoutEventName,
  };
  const eventName = supportedEvents[name];
  if (!eventName) {
    throw new Error('Unsupported event!');
  }
  let clicked;
  let handleMousedown = () => {
    clicked = true;
    requestAnimationFrame(() => {
      clicked = false;
    });
  };
  let handleFocusin = evt => {
    if (!clicked) {
      callback(evt);
    }
  };
  node.ownerDocument.addEventListener('mousedown', handleMousedown);
  node.addEventListener(eventName, handleFocusin, !hasFocusout);
  return {
    release() {
      if (handleFocusin) {
        node.removeEventListener(eventName, handleFocusin, !hasFocusout);
        handleFocusin = null;
      }
      if (handleMousedown) {
        node.ownerDocument.removeEventListener('mousedown', handleMousedown);
        handleMousedown = null;
      }
      return null;
    },
  };
}
