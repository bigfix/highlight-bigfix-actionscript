[![Build Status](https://travis-ci.org/bigfix/highlight-bigfix-actionscript.svg?branch=master)](https://travis-ci.org/bigfix/highlight-bigfix-actionscript) [![Coverage Status](https://coveralls.io/repos/bigfix/highlight-bigfix-actionscript/badge.svg?branch=master&service=github)](https://coveralls.io/github/bigfix/highlight-bigfix-actionscript?branch=master)

highlight-bigfix-actionscript
===

An HTML syntax highlighter for BigFix ActionScript.

### Usage

To highlight some script:

```javascript
var highlightActionScript = require('highlight-bigfix-actionscript');
var html = highlightActionScript('run patch.exe');
```

The above command will result in:

```html
<span class="bf-actionscript-command">run</span> patch.exe
```

Relevance substitutions are also colored. This is done using [highlight.js](https://www.npmjs.com/package/highlight.js) with [hljs-bigfix-relevance](https://www.npmjs.com/package/hljs-bigfix-relevance). For example:

```javascript
highlightActionScript('appendfile {1+1}');
```

This will result in:

```html
<span class="bf-actionscript-command">appendfile</span> {<span class="bf-actionscript-substitution"><span class="hljs-number">1</span>+<span class="hljs-number">1</span></span>}
```
