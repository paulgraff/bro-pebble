/**
* Bro-Pebble
* Alex P. Gates & Paul Graff
*/

var Accel = require('ui/accel');
var ajax = require('ajax');
var Settings = require('settings');
var Vector2 = require('vector2');
var UI = require('ui');

var config = require('./config');

Settings.config(
  { url: 'http://webjam.org/pebble-bro-settings/settings.html' },
  function (e) {
    // Set defaults
    Settings.option({
      'username': 'alexpgates',
      'bros': ['wootbro','jmhobbs','megancasey']
    });
  },
  function (e) {}
);

var menu = new UI.Menu({
  sections: [{
    items: (function () {
      var bros = Settings.option('bros');
      var result = [];

      for (var i = 0; i < bros.length; i++) {
        result.push({
          title: bros[i]
        });
      }
      return result;
    })()
  }]
});

menu.on('select', function(e) {
  Accel.init();

  var targetUsername = Settings.option('bros')[e.itemIndex];

  var browindow = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Bro',
    textAlign: 'center'
  });
  browindow.add(textfield);
  browindow.show();

  Accel.on('tap', function(e) {
    var currentText = textfield.text();
    textfield.text(currentText + 'o');
    console.log('tap');
  });

  browindow.on('click', 'up', function(e) {
    var currentText = textfield.text();
    textfield.text(currentText + 'o');
  });

  browindow.on('click', 'down', function(e) {
    var currentText = textfield.text();
    if ( currentText != 'Bro' ) {
      var newText = currentText.substring(0, currentText.length - 1);
      textfield.text(newText);
    }
  });

  browindow.on('click', 'select', function(e) {
    var data = {
      "where": {
        "user": {
          "$inQuery": {
            "className": "_User",
            "where": { "username": targetUsername }
          }
        }
      },
      "data": {
        "alert": textfield.text() + " - " + Settings.option('username')
      }
    };

    var credentials = config.credentials;

    var headers = {
      'X-Parse-Application-Id': credentials.appId,
      'X-Parse-REST-API-Key': credentials.appKey
    };

    var splashCard = new UI.Card({
      title: "Sending Bro!"
    });

    splashCard.show();

    ajax({url: 'https://api.parse.com/1/push', method: 'POST', type: 'json', data: data, headers: headers},
      function (result) {
        var resultsCard = new UI.Card({
          title: 'Success!'
        });

        browindow.hide();
        splashCard.hide();
        resultsCard.show();

        setTimeout(function () {
          resultsCard.hide();
        }, 500);
      },
      function (error) {
        splashCard.hide();
        displayErrorCard('Failed to send Bro. Please try again!');
      }
    );
  });
});

menu.show();

function displayErrorCard(message) {
    var errorCard = new UI.Card({
      title: 'Error',
      subtitle: message
    });

    errorCard.show();
}

Pebble.addEventListener('ready', function(e) {
  // ready logic
});
