/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var Settings = require('settings');

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
            'bros': ['paulgraff','jmhobbs','megancasey']
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
});
