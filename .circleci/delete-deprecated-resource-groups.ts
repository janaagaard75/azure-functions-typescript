import util = require("util");
const exec = util.promisify(require("child_process").exec);

async function executeCommand(command: string): Promise<string> {
  const result = await exec(command);
  return result.stdout.trim();
}

async function getRemoteBranchNames(): Promise<Array<string>> {
  const prefixLength = "f47884521bf37f59bf0de7298989215ea4670311\trefs/heads/"
    .length;
  const rawResponse = await executeCommand("git ls-remote --heads --refs");
  const fullArray = rawResponse.split("\n");
  const branchNames = fullArray.map(rawName => rawName.substring(prefixLength));
  return branchNames;
}

interface ResourceGroup {
  name: string;
}

async function getGroupNames(): Promise<Array<string>> {
  const rawGroups = await executeCommand("az group list");
  const jsonGroups = JSON.parse(rawGroups) as Array<ResourceGroup>;
  const groupNames = jsonGroups.map(groupInfo => groupInfo.name);
  return groupNames;
}

async function run() {
  console.info(JSON.stringify(await getRemoteBranchNames(), undefined, 2));
  console.info(JSON.stringify(await getGroupNames(), undefined, 2));
}

run();
