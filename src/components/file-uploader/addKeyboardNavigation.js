/**
 * We're using a pattern where we style an input's label to look like a button.
 * Consequently we need to add proper keyboard accessibility to the label in
 * order to mimic if it were an input button -- also worth noting is we hide the
 * actual input from tab order in the markup.
 */
function addKeyboardNavigation() {
  const uploadLabel = document.getElementById('input-button');
  const uploadInput = document.getElementById('your-file-importer-id-here');
  if (uploadLabel != null) {
    uploadLabel.addEventListener('keydown', event => {
      // Stop propagation of the event so we don't throw open the dialog more than once.
      event.stopPropagation();
      // if the user presses the enter key or the spacebar click the upload button.
      if (event.keyCode === 32 || event.keyCode === 13) {
        uploadInput.click();
      }
    });
  }
}

export default addKeyboardNavigation;
