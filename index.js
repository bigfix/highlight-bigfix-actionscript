'use strict';

var escapeHtml = require('escape-html');

function isWhiteSpace(c) {
  return (c === 0x20) || // space
    (c === 0x09) || // tab
    (c === 0x0a) || // lf
    (c === 0x0d); // cr
}

var commands = [
  'delete',
  'copy',
  'move',
  'folder create',
  'folder delete',
  'regset64',
  'regdelete64',
  'script64',
  'regset',
  'regdelete',
  'fixlet delete',
  'pause while',
  'enable gathering',
  'fixlet close',
  'fixlet restore',
  'browse to',
  'dos',
  'runhidden',
  'waithidden',
  'rundetached',
  'waitdetached',
  'run',
  'wait',
  'override',
  'script',
  'open',
  'download now as',
  'download as',
  'download open',
  'download now',
  'download',
  'appendfile',
  'unsubscribe',
  '//',
  'site force evaluation',
  'site gather schedule publisher',
  'site gather schedule manual',
  'site gather schedule disable',
  'site gather schedule seconds',
  'continue if',
  'set clock',
  'restart',
  'shutdown',
  'action lock until',
  'action lock indefinite',
  'action log command',
  'action log all',
  'action unlock',
  'action requires restart',
  'action may require restart',
  'action requires login',
  'action parameter query',
  'setting delete',
  'setting',
  'administrator add',
  'administrator delete',
  'administrative rights enable',
  'administrative rights disable',
  'subscribe',
  'relay select',
  'archive now',
  'extract',
  'utility',
  'if',
  'elseif',
  'else',
  'endif',
  'parameter',
  'createfile until',
  'prefetch',
  'custom site subscribe',
  'custom site unsubscribe',
  'action uses wow64 redirection',
  'action launch preference low-priority',
  'action launch preference normal-priority',
  'notify client',
  'client restart',
  'begin prefetch block',
  'add nohash prefetch item',
  'add prefetch item',
  'collect prefetch items',
  'execute prefetch plug-in',
  'end prefetch block',
  'exit'
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
