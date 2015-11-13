'use strict';

var fs = require('fs'),
  path = require('path'),
  tape = require('tape'),
  highlight = require('..');

function getTestCases() {
  var testCases = {};
  var testCasesFolder = path.join(__dirname, 'cases');

  fs.readdirSync(testCasesFolder).forEach(function(name) {
    var contents = fs.readFileSync(path.join(testCasesFolder, name)).toString();

    var match = /^(.*)\.expect\.txt$/.exec(name);
    if (match) {
      if (testCases[match[1]] === undefined) {
        testCases[match[1]] = {};
      }

      testCases[match[1]].expect = contents;
      return;
    }

    match = /^(.*)\.txt$/.exec(name);
    if (match) {
      if (testCases[match[1]] === undefined) {
        testCases[match[1]] = {};
      }

      testCases[match[1]].input = contents;
    }
  });

  var result = [];

  Object.keys(testCases).forEach(function(name) {
    result.push({
      name: name,
      input: testCases[name].input,
      expect: testCases[name].expect
    });
  });

  return result;
}

getTestCases().forEach(function(testCase) {
  tape(testCase.name + ' test', function(t) {
    t.plan(1);
    t.equal(highlight(testCase.input), testCase.expect);
  });
});
