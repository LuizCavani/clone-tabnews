const dotEnv = require("dotenv");
dotEnv.config({ path: ".env.development" });

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFiles: ["dotenv/config"],
  testTimeout: 60000,
});

module.exports = jestConfig;
