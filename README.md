# deno_copy_paste

[![Docs](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://deno.land/x/copy_paste/mod.ts)
[![Tests](https://github.com/isyouaint/deno_copy_paste/actions/workflows/ci.yml/badge.svg)](https://github.com/isyouaint/deno_copy_paste/actions/workflows/ci.yml)

Clipboard API-like functionality.

```ts
import { copy, paste } from "https://deno.land/x/copy_paste/mod.ts";

await copy("Is you is or is you ain't?"); // Copies text to the system clipboard

await paste(); // Returns text from the system clipboard
```
