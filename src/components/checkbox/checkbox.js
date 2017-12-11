function listener(event) {
  const element = event.target;
  if (element.tagName === 'INPUT' && element.type === 'checkbox' && element.hasAttribute('checked') !== element.checked) {
    if (element.checked) {
      element.setAttribute('checked', '');
    } else {
      element.removeAttribute('checked');
    }
  }
}

/**
 * Watches for change in checkbox in the given document and force changing `checked` attribute
 * so that DOM mutation observer in {@link https://www.npmjs.com/package/svgxuse svgxuse} is triggered.
 * @param {Document} [doc=document] The document object to watch for.
 * @returns {Handle} The handle to release the event listener.
 */
function initCheckbox(doc = document) {
  doc.removeEventListener('change', listener); // In case this function has been called earlier
  doc.addEventListener('change', listener);
  return {
    release() {
      doc.removeEventListener('change', listener);
      return null;
    },
  };
}


  //sets indeterminate state 
  const intdeterminateCheckbox = [...document.querySelectorAll('[aria-checked=mixed]')];
  for (let value of intdeterminateCheckbox) {
    value.indeterminate = true;
  }
  

  //checkboxes with input nested inside label
  const nestedCheckbox = [...document.querySelectorAll('.bx--checkbox-label > .bx--checkbox')];
  for (let checkbox of nestedCheckbox) {
    if (checkbox.checked) {
      checkbox.parentElement.classList.add('bx--checkbox-label__checked');
    }
    if (checkbox.indeterminate) {
      checkbox.parentElement.classList.add('bx--checkbox-label__indeterminate');
    }

    checkbox.onclick=function(){
      this.parentElement.classList.remove('bx--checkbox-label__indeterminate');
      if (this.checked) {
        this.parentElement.classList.add('bx--checkbox-label__checked');
      }
      else {
        this.parentElement.classList.remove('bx--checkbox-label__checked');
      }
    }

  }

export default initCheckbox;
