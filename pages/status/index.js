import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1> Status </h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function DatabaseStatus() {
  const loadingText = "Carregando...";
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  const database = data?.dependencies?.database;

  let version, maxConnections, openedConnections;

  if (!isLoading && database) {
    version = database.version;
    maxConnections = database.max_connections;
    openedConnections = database.opened_connections;
  }

  return (
    <div>
      <strong>Database:</strong> <br />
      <strong>Versão:</strong> {version || loadingText}
      <br />
      <strong>Máximo de conexões:</strong>
      {maxConnections || loadingText}
      <br />
      <strong>Conexões Abertas:</strong> {openedConnections || loadingText}
      <br />
    </div>
  );
}

function UpdatedAt() {
  const loadingText = "Carregando...";
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText;

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div>
      <strong>Última atualização:</strong> {updatedAtText || loadingText}
    </div>
  );
}
