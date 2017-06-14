var selenium = require('selenium-standalone');
var config   = require('./system_config');

module.exports = function(done) {
  selenium.start({
    basePath : config.system,
    drivers : {
      chrome : {
        version   : config.chrome.version,
        arch      : process.arch,
        basePath  : config.chrome.basePath,
      },
      // ie : {
      //   version   : config.ie.version,
      //   arch      : process.arch,
      //   basePath  : config.ie.basePath,
      // },
      // firefox : {
      //   version   : config.firefox.version,
      //   arch      : process.arch,
      //   basePath  :  config.firefox.basePath,
      // },

    },
  }, function(err, child) {
    console.log(err);
    selenium.child = child;
    done();
  });
}
