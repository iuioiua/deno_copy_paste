import { writeAll } from "./deps.ts";

async function execute(cmd: string[], input?: string): Promise<string> {
  const process = await Deno.run({ cmd, stdin: "piped", stdout: "piped" });
  await writeAll(process.stdin, new TextEncoder().encode(input));
  process.stdin.close();
  const [output] = await Promise.all([
    process.output(),
    process.status(),
  ]);
  process.close();
  return new TextDecoder().decode(output).trim();
}

/**
 * Copies the text to the system clipboard
 * @param {string} text Text to copy to the clipboard
 */
export async function copy(text: string): Promise<void> {
  const cmd = {
    "darwin": ["pbcopy"],
    "linux": ["xclip", "-selection", "clipboard", "-i"],
    "windows": ["powershell", "-Command", "Set-Clipboard"],
  }[Deno.build.os];
  await execute(cmd, text);
}

/**
 * Pastes the text from the system clipboard
 * @returns {Promise<string>} Pasted text from the clipboard
 */
export function paste(): Promise<string> {
  const cmd = {
    "darwin": ["pbpaste"],
    "linux": ["xclip", "-selection", "clipboard", "-o"],
    "windows": ["powershell", "-Command", "Get-Clipboard"],
  }[Deno.build.os];
  return execute(cmd);
}
