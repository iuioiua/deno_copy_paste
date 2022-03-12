import { writeAll } from "./deps.ts";

function encode(text?: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function decode(data: Uint8Array): string {
  return new TextDecoder().decode(data);
}

async function run(
  cmd: string[],
  data?: Uint8Array,
): Promise<Uint8Array> {
  const process = await Deno.run({
    cmd,
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });
  if (data) {
    await writeAll(process.stdin, data);
  }
  process.stdin.close();
  const { code } = await process.status();
  const rawOutput = await process.output();
  const rawError = await process.stderrOutput();
  if (code !== 0) {
    console.error(decode(rawError));
  }
  process.close();
  return rawOutput;
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
  await run(cmd, encode(text));
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
  const { os } = Deno.build;
  const cmd = {
    "darwin": ["pbpaste"],
    "linux": ["xclip", "-o"],
    "windows": ["powershell", "-noprofile", "-command", "Get-Clipboard"],
  }[os];
  const rawOutput = await run(cmd);
  return os === "windows"
    ? decode(rawOutput).replace(/\r/g, "").replace(/\n$/, "")
    : decode(rawOutput);
}
