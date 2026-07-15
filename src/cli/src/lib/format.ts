export function formatOutput(data: any, asJson: boolean): string {
  if (asJson) {
    return JSON.stringify(data, null, 2);
  }

  if (Array.isArray(data)) {
    return formatServerList(data);
  }

  if (data?.name && data?.description) {
    return formatServerDetail(data);
  }

  if (data?.success !== undefined) {
    return formatInstallResult(data);
  }

  return JSON.stringify(data, null, 2);
}

function formatServerList(servers: any[]): string {
  if (servers.length === 0) return "No servers found.";
  
  return servers.map((s, i) => {
    const verified = s.verified ? " ✓" : "";
    const featured = s.featured ? " ★" : "";
    const stars = s.stars.toLocaleString();
    return `${i + 1}. ${s.name}${verified}${featured} - ${stars} ⭐ | ${s.description.substring(0, 80)}...`;
  }).join("\n");
}

function formatServerDetail(server: any): string {
  const lines = [
    `Name: ${server.name}${server.verified ? " ✓" : ""}`,
    `Description: ${server.description}`,
    `Author: ${server.author}`,
    `Repository: ${server.repository}`,
    `Stars: ${server.stars.toLocaleString()} | Forks: ${server.forks.toLocaleString()}`,
    `License: ${server.license}`,
    `Last Updated: ${new Date(server.lastUpdated).toLocaleDateString()}`,
    `Version: ${server.version}`,
    `MCP Version: ${server.mcpVersion}`,
    `Tags: ${server.tags.join(", ")}`,
    `Capabilities: ${server.capabilities.join(", ")}`,
    `Install: ${server.installCommand || "npm install " + server.name}`
  ];
  return lines.join("\n");
}

function formatInstallResult(result: any): string {
  if (result.success) {
    return `✓ Installed ${result.server.name} to ${result.installedPath}`;
  }
  return `✗ Failed: ${result.error}`;
}
