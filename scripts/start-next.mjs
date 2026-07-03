import { spawn } from "node:child_process";
import path from "node:path";

const forwardedArgs = process.argv.slice(2);
const explicitPortIndex = forwardedArgs.findIndex(
  (arg) => arg === "-p" || arg === "--port"
);
const hasPortArgument =
  explicitPortIndex >= 0 ||
  forwardedArgs.some((arg) => arg.startsWith("-p=") || arg.startsWith("--port="));

const port = process.env.PORT ?? "3000";
const nextBin = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);
const args = [nextBin, "start", ...forwardedArgs];

if (!hasPortArgument) {
  args.push("-p", port);
}

const child = spawn(process.execPath, args, {
  stdio: "inherit",
  env: process.env
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
