# study Node.js

## 課題

* `express-validator`のrequireはこれでいいのか？

```{ check, validationResult } = require('express-validator');```

* `models/user.js` L12 sanitizeBodyメソッドについて、これは非推奨ということなので`body`を使ったが`not found`の`error`になる。