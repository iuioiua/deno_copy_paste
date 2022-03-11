import { writeAll } from "./deps.ts";

/**
 * Copies the text to the system clipboard
 * @param {string} text Text to copy to the clipboard
 * @example
 * ```ts
 * await copy("Hello, world!"); // Copies "Hello, world!" to system clipboard
 * ```
 */
export async function copy(text: string): Promise<void> {
  const cmd = {
    "darwin": ["pbcopy"],
    "linux": ["xclip", "-selection", "clipboard", "-i"],
    "windows": ["powershell", "-Command", "Set-Clipboard"],
  }[Deno.build.os];
  const process = await Deno.run({ cmd, stdin: "piped" });
  await writeAll(process.stdin, new TextEncoder().encode(text));
  process.stdin.close();
  await process.status();
  process.close();
}

/**
 * Pastes the text from the system clipboard
 * @returns {Promise<string>} Pasted text from the clipboard
 * @example
 * ```ts
 * await paste(); // Returns text from clipboard
 * ```
 */
export async function paste(): Promise<string> {
  const cmd = {
    "darwin": ["pbpaste"],
    "linux": ["xclip", "-selection", "clipboard", "-o"],
    "windows": ["powershell", "-Command", "Get-Clipboard"],
  }[Deno.build.os];
  const process = await Deno.run({ cmd, stdout: "piped" });
  const output = await process.output();
  process.close();
  return new TextDecoder().decode(output);
}
