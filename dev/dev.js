$(document).ready(function() {
  /////////////////////////
  // Nav Theme Switcher
  /////////////////////////

  var bluemixButton = $('#bluemix-theme');
  var atlasButton = $('#atlas-theme');

  bluemixButton.on('click', function (event) {
    console.log(event);
    $('#nav').css('display', 'block');
    $('#atlas-nav').css('display', 'none');
  });

  atlasButton.on('click', function (event) {
    $('#nav').css('display', 'none');
    $('#atlas-nav').css('display', 'block');
  });

  /////////////////////////////////
  // AJAX Patterns on to index.html
  /////////////////////////////////

  var components = {
    'buttons': [
      'components/buttons/html/close-button.html',
      'components/buttons/html/danger-button.html',
      'components/buttons/html/primary-button.html',
      'components/buttons/html/secondary-button.html',
      'components/buttons/html/tertiary-button.html',
      'components/buttons/html/warning-button.html'
    ],
    'cards': [
      'components/cards/html/atlas-card.html',
      'components/cards/html/card.html'
    ],
    'dropdown': [
      'components/dropdown/html/dropdown.html'
    ],
    'forms': [
      'components/forms/html/form.html'
    ],
    'links': [
      'components/links/html/content-link.html'
    ],
    'lists': [
      'components/lists/html/card-list.html',
      'components/lists/html/nested-list.html',
      'components/lists/html/ordered-list.html',
      'components/lists/html/unordered-list.html'
    ],
    'modals': [
      'components/modals/html/modal.html'
    ],
    'nav': [
      'components/nav/html/global-nav.html',
      'components/nav/html/atlas-global-header.html'
    ],
    'radio': [
      'components/radio/html/radio.html'
    ],
    'tables': [
      'components/tables/html/table.html'
    ],
    'tooltips': [
      'components/tooltips/html/tooltip.html'
    ]
  };

  // Loop over each property in components object
  for (var prop in components) {
    var patternArray = components[prop];

    // Handle the nav components differently
    if (prop === 'nav') {
      $.get(patternArray[0], function (data) {
        $('#nav').append(data);
      });

      $.get(patternArray[1], function (data) {
        $('#atlas-nav').append(data);
      });
    }

    else if (prop === 'modals') {
      for (var i = 0; i < patternArray.length; i++ ) {
        $.get(patternArray[i], function (data) {

          // Append modal pattern to #modal so that it can display with margins specifc for modals
          $('#modal').append(data);
        });
      }
    }

    else if (prop === 'cards') {
      var cardArray = components[prop];

      for (var i=0; i < cardArray.length; i++) {
        $.get(cardArray[i], function (data) {
          $('#cards').append(data);
        });
      }
    }

    // For all other components, append them to #components.
    else {
      for (var i = 0; i < patternArray.length; i++) {
        $.get(patternArray[i], function (data) {
          $('#components').append('<div>' + data + '</div>');
        });
      }
    }
  };
});
