const Lists = () => {

  // ======================
  // SLIDE OUT SEARCH
  // ======================
  const searchIcon = document.querySelector("[data-id='search-action']");
  const searchField = document.querySelector("[data-id='search-field']");

  searchIcon.addEventListener('click', (e) => {
    e.preventDefault();

    if (searchIcon.style.borderLeft == 'none') {
      searchIcon.style.borderLeft = '1px solid #0F212E';
    }
    else {
      searchIcon.style.borderLeft = 'none';
    }

    searchField.classList.toggle('show-search');
    searchField.value = "";
  });
  // ======================
  // ======================

};

export default Lists;
