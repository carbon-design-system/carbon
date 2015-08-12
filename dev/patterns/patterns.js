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
    ]
  };

  for (var prop in patterns) {
    var patternArray = patterns[prop];

    for (var i = 0; i < patternArray.length; i++) {
      $.get(patternArray[i], function (data) {
        $('body').append('<div>' + data + '</div>');
      });
    }
  };
});