import { getExecOutput } from "@actions/exec";
import * as process from "process";

interface ResourceInfo {
  name: string;
}

export class TestHelper {
  private static memoizedApiRootUrl: string;

  public static async getApiRootUrl(): Promise<string> {
    if (this.memoizedApiRootUrl === undefined) {
      this.memoizedApiRootUrl = await this.computeApiRootUrl();
    }

    return this.memoizedApiRootUrl;
  }

  private static async computeApiRootUrl(): Promise<string> {
    const rawBranchName = (
      await this.runShellCommand("git symbolic-ref --short HEAD")
    ).trim();
    console.info(`rawBranchName: ${rawBranchName}`);
    const fixedBranchName = rawBranchName.replace(/[\.\/_]/g, "-");
    console.info(`fixedBranchName: ${fixedBranchName}`);
    const resourceGroupName = `azure-functions-typescript-${fixedBranchName}`;
    console.info(`resourceGroupName: ${resourceGroupName}`);
    const resourcesInfo = await this.runShellCommand(
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

  private static async runShellCommand(
    commandAndArguments: string
  ): Promise<string> {
    console.info(`Running the command '${commandAndArguments}'.`);

    const [command, ...args] = commandAndArguments.split(" ");
    const response = await getExecOutput(command, args);

    if (response.exitCode !== 0) {
      let errorMessage = `Error running '${command}', exited with code ${response.exitCode}.`;
      if (response.stderr !== "") {
        errorMessage += ` Error: ${response.stderr}`;
      }

      throw new Error(errorMessage);
    }

    return response.stdout;
  }

  private static get azCommand(): string {
    if (process.platform === "win32") {
      return "az.cmd";
    }

    return "az";
  }
}
