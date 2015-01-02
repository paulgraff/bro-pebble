/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');

Pebble.addEventListener('ready', function(e) {
    // ready logic
    console.log('Pebble is ready!');
});

Pebble.addEventListener('showConfiguration', function(e) {
    // Show config page
    Pebble.openURL('http://webjam.org/pebble-bro-settings/settings.html');
});

Pebble.addEventListener('webviewclosed', function(e) {
    console.log('Configuration window returned: ' + e.response);
});

function loadConfiguration() {
    var username = localStorage.getItem('username');
    if (typeof username === 'undefined') {
        username = 'alexpgates';
    }

    var friends = localStorage.getItem('friends');
    if (typeof friends === 'undefined') {
        friends = ['jmhobbs', 'megan'];
    }

    return {
        username: username,
        friends: friends
    }
}

var main = new UI.Card({
  title: 'Bro',
  // icon: 'images/menu_icon.png',
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
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

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
