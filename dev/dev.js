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
  // AJAX Components on to index.html
  /////////////////////////////////

  var components = {
    'buttons': [
      'components/buttons/close-button.html',
      'components/buttons/danger-button.html',
      'components/buttons/primary-button.html',
      'components/buttons/secondary-button.html',
      'components/buttons/tertiary-button.html',
      'components/buttons/warning-button.html'
    ],
    'cards': [
      'components/cards/atlas-card.html',
      'components/cards/card.html'
    ],
    'forms': [
      'components/forms/form.html',
      'components/forms/form-group.html'
    ],
    'links': [
      'components/links/link.html'
    ],
    'lists': [
      'components/lists/card-list.html',
      'components/lists/nested-list.html',
      'components/lists/ordered-list.html',
      'components/lists/unordered-list.html'
    ],
    'modals': [
      'components/modals/modal.html'
    ],
    'navigation': [
      'components/navigation/nav.html'
    ],
    'search': [
      'components/search/search.html'
    ],
    'selects': [
      'components/selects/select.html'
    ],
    'tables': [
      'components/tables/table.html'
    ],
    'textfields': [
      'components/textfields/text-field.html',
      'components/textfields/text-area.html'
    ],
    'toggles': [
      'components/toggles/checkbox.html',
      'components/toggles/radio.html'
    ],
    'tooltips': [
      'components/tooltips/tooltip.html'
    ]
  };

  // Loop over each property in components object
  for (var prop in components) {
    var componentArray = components[prop];

    // Handle the nav components differently
    if (prop === 'navigation') {
      $.get(componentArray[0], function (data) {
        $('#nav').append(data);
      });
    }

    else if (prop === 'modals') {
      for (var i = 0; i < componentArray.length; i++ ) {
        $.get(componentArray[i], function (data) {
          $('#modal').append(data);
        });
      }
    }

    else if (prop === 'search') {
      for (var i = 0; i < componentArray.length; i++) {
        $.get(componentArray[i], function (data) {
          $('#search').append(data);
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
      for (var i = 0; i < componentArray.length; i++) {
        $.get(componentArray[i], function (data) {
          $('#components').append('<div>' + data + '</div>');
        });
      }
    }
  }
});
