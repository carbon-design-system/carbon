$(document).ready(function() {
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
      'patterns/cards/html/card.html'
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
      'patterns/nav/html/secondary-nav.html'
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
      for (var i = 0; i < patternArray.length; i++ ) {
        $.get(patternArray[i], function (data) {

          // Append nav patterns to #nav because bluemix nav needs to be at the top of the viewport in order for the styles to work responsively.
          $('#nav').append(data);
        });
      }
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
