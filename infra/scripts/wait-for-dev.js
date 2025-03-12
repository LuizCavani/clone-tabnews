const { spawn } = require("node:child_process");

spawn("next dev", { stdio: "inherit", shell: true });

function gracefulShutdown() {
  console.log("\nTentando desligar de forma graciosa...");

  spawn("npm run services:stop", {
    detached: true,
    shell: true,
    windowsHide: true,
    stdio: "ignore",
  });
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
