import { copy, paste } from "./mod.ts";
import { assert } from "./deps.ts";

Deno.test({
  name: "copy and paste",
  fn: async () => {
    const text = crypto.randomUUID();
    await copy(text);
    assert(await paste() === text);
  },
});
