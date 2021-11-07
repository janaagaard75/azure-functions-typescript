import { spawnSync } from "child_process";
import * as process from "process";

interface ResourceInfo {
  name: string;
}

export class TestHelper {
  private static memoizedApiRootUrl: string;

  public static get apiRootUrl(): string {
    if (this.memoizedApiRootUrl === undefined) {
      this.memoizedApiRootUrl = this.getApiRootUrl();
    }

    return this.memoizedApiRootUrl;
  }

  private static getApiRootUrl(): string {
    const rawBranchName = this.runShellCommand(
      "git symbolic-ref --short HEAD"
    ).trim();
    console.info(`rawBranchName: ${rawBranchName}`);
    const fixedBranchName = rawBranchName.replace(/[\.\/_]/g, "-");
    console.info(`fixedBranchName: ${fixedBranchName}`);
    const resourceGroupName = `azure-functions-typescript-${fixedBranchName}`;
    console.info(`resourceGroupName: ${resourceGroupName}`);
    const resourcesInfo = this.runShellCommand(
      `${this.azCommand} resource list --resource-group ${resourceGroupName}`
    );
    const resourceInfos = JSON.parse(resourcesInfo) as Array<ResourceInfo>;
    const functionsResourceName = resourceInfos
      .map((resourceInfo) => resourceInfo.name)
      .find(
        (resourceName) => resourceName.match(/^aft-(.*)-functions$/) !== null
      );

    if (functionsResourceName === undefined) {
      throw new Error(
        `Could not a functions resources in the resource group '${resourceGroupName}'.`
      );
    }

    return `https://${functionsResourceName}.azurewebsites.net/api`;
  }

  private static runShellCommand(commandAndArguments: string): string {
    console.info(`Running the command '${commandAndArguments}'.`);

    const [command, ...args] = commandAndArguments.split(" ");
    const response = spawnSync(command, args);

    if (response.stdout === null) {
      let errorMessage = `Error running '${command}'`;
      if (response.stderr !== null) {
        errorMessage += `: ${response.stderr}`;
      }
      errorMessage += ".";

      throw new Error(errorMessage);
    }

    return response.stdout.toString();
  }

  private static get azCommand(): string {
    if (process.platform === "win32") {
      return "az.cmd";
    }

    return "az";
  }
}
