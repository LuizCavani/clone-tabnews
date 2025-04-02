import { resolve } from "node:path";
import database from "infra/database.js";
import migrationRunner from "node-pg-migrate";

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  log: () => {},
  migrationsTable: "pgmigrations",
};

async function executeMigrations(params) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      ...params,
      dbClient,
    });

    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function listPendingMigrations() {
  return executeMigrations({});
}

async function runPendingMigrations() {
  return executeMigrations({ dryRun: false });
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
