import util = require("util");
const exec = util.promisify(require("child_process").exec);

const productionGroup = "azure-functions-typescript-master";

async function executeCommand(command: string): Promise<string> {
  const result = await exec(command);
  return result.stdout.trim();
}

async function getBranchNames(): Promise<Array<string>> {
  const prefixLength = "f47884521bf37f59bf0de7298989215ea4670311\trefs/heads/"
    .length;
  const rawResponse = await executeCommand("git ls-remote --heads --refs");
  const fullArray = rawResponse.split("\n");
  const branchNames = fullArray.map(rawName => rawName.substring(prefixLength));
  return branchNames;
}

function toResourceGroupName(branchName: string): string {
  return `azure-functions-typescript-${branchName}`;
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
  const expectedGroups = (await getBranchNames()).map(branchName =>
    toResourceGroupName(branchName)
  );
  const actualGroups = await getGroupNames();
  const groupsToDelete = actualGroups.filter(
    group => !expectedGroups.includes(group) && group !== productionGroup
  );

  if (groupsToDelete.length >= 1) {
    groupsToDelete.forEach(async group => {
      console.info(`Deleting deprecated resource group ${group}.`);
      await executeCommand(`az group delete --name ${group} --yes`);
    });

    console.info("This takes a few minutes...");
  }
}

run();
