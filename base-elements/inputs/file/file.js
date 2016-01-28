const FileUploader = () => {
  const fileInput = [...document.querySelectorAll('input.file__input')];

  fileInput.forEach((input) => {
    const label = input.nextElementSibling;

    input.addEventListener('change', (e) => {
      let fileName = '';

      if (input.files && input.files.length > 1) {
        fileName = (input.getAttribute('data-multiple-caption') || '').replace('{count}', input.files.length);
      } else {
        fileName = e.target.value.split('\\').pop();
      }

      if (fileName) {
        label.innerHTML = fileName;
      }
    });
  });
};

export default FileUploader;
