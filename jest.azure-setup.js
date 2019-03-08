const { spawnSync } = require("child_process")

function getApiRootUrl() {
  const currentBranchName = spawnSync("git", [
    "symbolic-ref",
    "--short",
    "HEAD"
  ])
    .stdout.toString()
    .trim()

  const resourceGroupName = `azure-functions-typescript-${currentBranchName}`

  const resourcesInfo = spawnSync("az", [
    "resource",
    "list",
    "--resource-group",
    resourceGroupName
  ])
    .stdout.toString()
    .trim()

  const functionsResourceName = JSON.parse(resourcesInfo)
    .map(resource => resource.name)
    .find(resourceName => resourceName.match(/^aft-(.*)-functions$/))

  return `https://${functionsResourceName}.azurewebsites.net/api`
}

global.apiRootUrl = getApiRootUrl()

// Increase the timeout to allow the Azure functions to spin up.
jest.setTimeout(40 * 1000)
