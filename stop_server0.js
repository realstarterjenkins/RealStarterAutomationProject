var selenium = require('selenium-standalone');


module.exports = function(done) {

  if(selenium && selenium.child) {
    process.kill(selenium.child.pid);
  }

  const unhandledRejections = new Map();
  process.on('unhandledRejection', (reason, p) => {
    unhandledRejections.set(p, reason);
  });

  process.on("rejectionHandled", (p) => {
    unhandledRejections.delete(p);
  })
}
