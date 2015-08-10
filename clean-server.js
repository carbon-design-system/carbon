#! /usr/local/bin/node
// ^-- Tell the terminal which interpreter to use for the execution

// Controls shutdown of nodemon
// https://github.com/remy/nodemon#controlling-shutdown-of-your-script
process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});
