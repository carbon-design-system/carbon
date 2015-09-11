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

  var patterns = {
    'buttons': [
      'patterns/buttons/html/close-button.html',
      'patterns/buttons/html/danger-button.html',
      'patterns/buttons/html/primary-button.html',
      'patterns/buttons/html/secondary-button.html',
      'patterns/buttons/html/tertiary-button.html',
      'patterns/buttons/html/warning-button.html'
    ],
    'cards': [
      'patterns/cards/html/atlas-card.html',
      'patterns/cards/html/card.html'
    ],
    'dropdown': [
      'patterns/dropdown/html/dropdown.html'
    ],
    'forms': [
      'patterns/forms/html/form.html'
    ],
    'links': [
      'patterns/links/html/content-link.html'
    ],
    'lists': [
      'patterns/lists/html/card-list.html',
      'patterns/lists/html/nested-list.html',
      'patterns/lists/html/ordered-list.html',
      'patterns/lists/html/unordered-list.html'
    ],
    'modals': [
      'patterns/modals/html/modal.html'
    ],
    'nav': [
      'patterns/nav/html/global-nav.html',
      'patterns/nav/html/atlas-global-header.html'
    ],
    'radio': [
      'patterns/radio/html/radio.html'
    ],
    'tables': [
      'patterns/tables/html/table.html'
    ],
    'tooltips': [
      'patterns/tooltips/html/tooltip.html'
    ]
  };

  // Loop over each property in patterns object
  for (var prop in patterns) {
    var patternArray = patterns[prop];

    // Handle the nav patterns differently
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
      var cardArray = patterns[prop];

      for (var i=0; i < cardArray.length; i++) {
        $.get(cardArray[i], function (data) {
          $('#cards').append(data);
        });
      }
    }

    // For all other patterns, append them to #patterns.
    else {
      for (var i = 0; i < patternArray.length; i++) {
        $.get(patternArray[i], function (data) {
          $('#patterns').append('<div>' + data + '</div>');
        });
      }
    }
  };
});
