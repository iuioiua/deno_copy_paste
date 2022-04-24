import { writeAll } from "./deps.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function close(process: Deno.Process): Promise<void> {
  const [{ success }, rawError] = await Promise.all([
    process.status(),
    process.stderrOutput(),
  ]);
  process.close();
  console.assert(success, decoder.decode(rawError));
}

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
    "linux": ["xclip", "-selection", "clipboard"],
    "windows": ["powershell", "-noprofile", "-command", "$input|Set-Clipboard"],
  }[Deno.build.os];
  const process = await Deno.run({ cmd, stdin: "piped", stderr: "piped" });
  await writeAll(process.stdin, encoder.encode(text));
  process.stdin.close();
  await close(process);
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
    "linux": ["xclip", "-o"],
    "windows": ["powershell", "-noprofile", "-command", "Get-Clipboard"],
  }[Deno.build.os];
  const process = await Deno.run({ cmd, stdout: "piped", stderr: "piped" });
  const rawOutput = await process.output();
  await close(process);
  return decoder.decode(rawOutput).replace(/\r/g, "").replace(/\n$/, "");
}
