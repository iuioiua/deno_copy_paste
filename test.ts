import { copy, paste } from "./mod.ts";
import { assertStrictEquals } from "./deps.ts";

Deno.test({
  name: "copy and paste",
  fn: async () => {
    const text = crypto.randomUUID();
    await copy(text);
    assertStrictEquals(text, await paste());
  },
});
