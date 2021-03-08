# ArabJs

The ArabJs transpiler

https://arabjs.github.io/arabjs

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
لنفرض النتيحة = جمع(2,3)
اطبع.نص(النتيح
`;
arabjs.run(code);

result
```
5
```