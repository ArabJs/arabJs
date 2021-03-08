# ArabJs

The ArabJs transpiler

https://arabjs.github.io/arabJs/

# Installation

```bash
npm install arabjs
```

# APIs

```javascript
import arabJs from "arabjs";

const code = `
 داله جمع(س,ص) {
   الجواب س + ص
}
لنفرض النتيجة = جمع(2,3)
اطبع.نص(النتيجة)
`;

arabjs.run(code);
```

## result
```javascript
5
```
# Credit:
This work is built on top of amazing open source projects:
- [Chavascript](https://github.com/ChavaScript/chavascript)
- [CodeMirror](https://github.com/codemirror/codemirror.next)
