import '../../../../global/js/array-from';

import FileUploader from '../../../../base-elements/inputs/file/file';

document.addEventListener('DOMContentLoaded', () => {
  [... document.querySelectorAll('[data-file-input]')]
    .forEach((element) => new FileUploader(element));
});
