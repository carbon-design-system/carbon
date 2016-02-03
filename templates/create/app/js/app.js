import '../../../../global/js/array-from';

import FileUploader from '../../../../base-elements/inputs/file/file';
import ContentSwitcher from '../../../../components/content-switcher/content-switcher';

document.addEventListener('DOMContentLoaded', () => {
  [... document.querySelectorAll('[data-file-input]')]
    .forEach((element) => new FileUploader(element));
  [... document.querySelectorAll('[data-content-switcher]')]
    .forEach((element) => new ContentSwitcher(element));
});
