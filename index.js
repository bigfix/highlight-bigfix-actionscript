'use strict';

var escapeHtml = require('escape-html');

function isWhiteSpace(c) {
  return (c === 0x20) || // space
    (c === 0x09) || // tab
    (c === 0x0a) || // lf
    (c === 0x0d); // cr
}

var commands = [
  'delete'
];

module.exports = function(script) {
  var command;
  var pos = 0;
  var result = '';

  function add(text) {
    result += escapeHtml(text);
  }

  function addCommand(text) {
    result += '<span class="bf-command">' + escapeHtml(text) + '</span>';
  }

  function findCommand() {
    for (var i = 0; i < commands.length; i++) {
      if (script.indexOf(commands[i], pos) === pos) {
        return commands[i];
      }
    }

    return undefined;
  }

  function skipWhiteSpace() {
    var start = pos;

    while (isWhiteSpace(script.charCodeAt(pos))) {
      pos++;
    }

    if (start !== pos) {
      add(script.substring(start, pos));
    }
  }

  function skipToNextLine() {
    var c;
    var start = pos;

    while (pos !== script.length) {
      c = script.charCodeAt(pos);

      if (c === 0x0d || c === 0x0a) {
        break;
      }

      pos++;
    }

    if (start !== pos) {
      add(script.substring(start, pos));
    }
  }

  while (pos !== script.length) {
    skipWhiteSpace();

    command = findCommand();

    if (command !== undefined) {
      addCommand(script.substring(pos, pos + command.length));
      pos += command.length;
    }

    skipToNextLine();
  }

  return result;
};
