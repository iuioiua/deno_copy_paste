# deno_copy_paste

[![Deno](https://github.com/isyouaint/deno_copy_paste/actions/workflows/deno.yml/badge.svg)](https://github.com/isyouaint/deno_copy_paste/actions/workflows/deno.yml)

Clipboard API-like functionality.

```ts
import { copy, paste } from "https://deno.land/x/copy_paste/mod.ts";

await copy("Is you is or is you ain't?"); // Copies text to the system clipboard

await paste(); // Returns text from the system clipboard
```

## Documentation

Check it out
[here](https://doc.deno.land/https://deno.land/x/copy_paste/mod.ts).
