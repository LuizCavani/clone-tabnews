import database from "infra/database.js";
import { InternalServerError } from "infra/errors";

async function status(request, response) {
  try {
    const databaseName = process.env.POSTGRES_DB;
    const databaseVersionResult = await database.query("SHOW server_version;");
    const maxConnectionsResult = await database.query("SHOW max_connections;");
    const databaseOpenedConnectionsResult = await database.query({
      text: "SELECT count(*)::Int FROM pg_stat_activity WHERE datname = $1",
      values: [databaseName],
    });
    const updatedAt = new Date().toISOString();
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;
    const databaseMaxConnectionsValue =
      maxConnectionsResult.rows[0].max_connections;
    const databaseOpenedConnectionsValue =
      databaseOpenedConnectionsResult.rows[0].count;

    const responseData = {
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: parseInt(databaseMaxConnectionsValue),
          opened_connections: databaseOpenedConnectionsValue,
        },
      },
    };

    response.status(200).json(responseData);
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });
    console.error(publicErrorObject);
    response.status(500).json(publicErrorObject);
  }
}

export default status;
