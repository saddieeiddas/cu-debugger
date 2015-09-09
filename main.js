'use strict'

var Chrome = require('chrome-remote-interface');
var Promise = require('es6-promise').Promise;

var baseConfig = {
  host: 'localhost',
  port: 8088,
  chooseTab: function(tabs) {
    var index = 0;
    var perfhud = tabs.forEach(function(tab, i) {
      if (tab.title === 'Perfhud') {
        index = i;
      }
    });
    return index;
  }
};

Chrome(baseConfig, function(chrome) {
  setInterval(function() {
    chrome.Runtime.evaluate({
      expression: 'cuAPI.fps'
    }, function(err, response) {
      if (!err) {
        console.log(response.result.value);
      }
    });
  }, 1000);
});
