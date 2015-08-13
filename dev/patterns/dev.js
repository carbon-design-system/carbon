$(document).ready(function() {
  var patterns = {
    'buttons': [
      'buttons/html/close-button.html',
      'buttons/html/danger-button.html',
      'buttons/html/primary-button.html',
      'buttons/html/secondary-button.html',
      'buttons/html/tertiary-button.html',
      'buttons/html/warning-button.html'
    ],
    'cards': [
      'cards/html/card.html'
    ],
    'forms': [
      'forms/html/form.html'
    ],
    'links': [
      'links/html/content-link.html'
    ],
    'lists': [
      'lists/html/card-list.html',
      'lists/html/nested-list.html',
      'lists/html/ordered-list.html',
      'lists/html/unordered-list.html'
    ],
    'modals': [
      'modals/html/modal.html'
    ],
    'nav': [
      'nav/html/global-nav.html',
      'nav/html/secondary-nav.html'
    ],
    'radio': [
      'radio/html/radio.html'
    ],
    'tables': [
      'tables/html/table.html'
    ],
    'tooltips': [
      'tooltips/html/tooltip.html'
    ]
  };

  // Loop over each property in patterns object
  for (var prop in patterns) {

    // Handle the nav patterns differently
    if (prop === 'nav') {
      var navArray = patterns[prop];

      for (var i = 0; i < navArray.length; i++ ) {
        $.get(navArray[i], function (data) {

          // Append nav patterns to #nav because bluemix nav needs to be at the top of the viewport in order for the styles to work responsively.
          $('#nav').append(data);
        })
      }
    }
    // For all other patterns, append them to #patterns.
    else {
      var patternArray = patterns[prop];

      for (var i = 0; i < patternArray.length; i++) {
        $.get(patternArray[i], function (data) {
          $('#patterns').append('<div>' + data + '</div>');
        });
      }
    }
  };
});
