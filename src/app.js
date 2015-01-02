/**
* Welcome to Pebble.js!
*
* This is where you write your app.
*/

var UI = require('ui');
var Vector2 = require('vector2');
var Settings = require('settings');
var ajax = require('ajax');
var config = require('./config');

Pebble.addEventListener('ready', function(e) {
  // ready logic
  console.log('Pebble is ready!');
});

Settings.config(
{ url: 'http://webjam.org/pebble-bro-settings/settings.html', autoSave: true },
function (e) {
  console.log('opening configurable');

  // defaults
  Settings.option({
    'username': 'alexpgates',
    'bros': ['wootbro','jmhobbs','megancasey']
  });
},
function (e) {
  console.log('closed configurable');
}
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

menu.show();

menu.on('select', function(e) {
  var targetUsername = Settings.option('bros')[e.itemIndex];
  console.log(targetUsername);

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

  browindow.on('click', 'up', function(e) {
    var currentText = textfield.text();
    textfield.text(currentText + 'o');
  });

  browindow.on('click', 'down', function(e) {
    var currentText = textfield.text();
    if(currentText != 'Bro'){
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
        "alert": textfield.text() + " - " + targetUsername
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
    function (json) {

      var resultsCard = new UI.Card({
        title: 'Success!'
      });

      splashCard.hide();
      resultsCard.show();
    },
    function (error) {
      console.log('Something broke');
    }
  );

});
});
