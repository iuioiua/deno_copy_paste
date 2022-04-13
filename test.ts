import { copy, paste } from "./mod.ts";
import { assert } from "./deps.ts";

Deno.test({
  name: "copy and paste",
  fn: async () => {
    const text = `
      hello world
      single line data
      multi\nline\ndata
      \n\n\nmulti\n\n\n\n\n\nline\ndata\n\n\n\n\n
      ~!@#$%^&*()_+-=[]{};\':",./<>?\t\n
      Rafał
    `;
    await copy(text);
    assert(text === await paste());
  },
});
