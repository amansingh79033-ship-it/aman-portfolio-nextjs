#!/usr/bin/env node

const net = require("net");
const { spawn } = require("child_process");
const path = require("path");

function testBind(port, host) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    if (host) {
      server.listen(port, host);
    } else {
      server.listen(port);
    }
  });
}

async function isPortAvailable(port) {
  const defaultAvail = await testBind(port);
  if (!defaultAvail) return false;
  const ipv4Avail = await testBind(port, "127.0.0.1");
  if (!ipv4Avail) return false;
  return true;
}

async function findAvailablePort(startPort = 3000, maxPort = 3999) {
  const desiredPort = parseInt(process.env.PORT || `${startPort}`, 10);
  for (let port = desiredPort; port <= maxPort; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  return desiredPort;
}

async function run() {
  const port = await findAvailablePort(3000);
  const isCustomPort = port !== 3000;

  console.log("\n========================================================");
  console.log(`🚀 Starting Aman Portfolio (Next.js Dev Server)`);
  if (isCustomPort) {
    console.log(`⚡ Port 3000 is occupied. Automatically bound to free port: ${port}`);
  } else {
    console.log(`⚡ Port: ${port}`);
  }
  console.log(`🔗 Local URL: http://localhost:${port}`);
  console.log("========================================================\n");

  const projectDir = path.resolve(__dirname, "..");
  const isWindows = process.platform === "win32";

  const nextBin = path.join(
    projectDir,
    "node_modules",
    ".bin",
    isWindows ? "next.cmd" : "next"
  );

  const spawnCmd = isWindows ? "cmd.exe" : nextBin;
  const spawnArgs = isWindows
    ? ["/c", `"${nextBin}" dev -p ${port}`]
    : ["dev", "-p", String(port)];

  const nextProcess = spawn(spawnCmd, spawnArgs, {
    cwd: projectDir,
    stdio: "inherit",
    shell: false,
    windowsVerbatimArguments: isWindows,
    env: {
      ...process.env,
      PORT: String(port),
    },
  });

  nextProcess.on("error", (err) => {
    console.error("Failed to start development server:", err);
    process.exit(1);
  });

  nextProcess.on("exit", (code) => {
    process.exit(code || 0);
  });

  const cleanup = () => {
    if (nextProcess && !nextProcess.killed) {
      if (isWindows) {
        try {
          spawn("taskkill", ["/pid", String(nextProcess.pid), "/f", "/t"]);
        } catch (e) {}
      } else {
        nextProcess.kill("SIGINT");
      }
    }
    process.exit();
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
}

run();
