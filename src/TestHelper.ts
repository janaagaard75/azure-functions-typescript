import { getExecOutput } from "@actions/exec";
import * as process from "process";

interface ResourceInfo {
  name: string;
}

export class TestHelper {
  private static memoizedApiRootUrl: string | undefined;

  public static async getApiRootUrl(): Promise<string> {
    if (this.memoizedApiRootUrl === undefined) {
      this.memoizedApiRootUrl = await this.computeApiRootUrl();
    }

    return this.memoizedApiRootUrl;
  }

  private static async computeApiRootUrl(): Promise<string> {
    const rawBranchName = await this.getCurrentBranchName();
    if (rawBranchName === "") {
      throw new Error("Could not determine the name of the current branch.");
    }

    const fixedBranchName = rawBranchName.replace(/[./_]/g, "-");
    const resourceGroupName = `azure-functions-typescript-${fixedBranchName}`;
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

  private static async getCurrentBranchName(): Promise<string> {
    if (process.env.BRANCH_NAME !== undefined) {
      return process.env.BRANCH_NAME;
    }

    return (await this.runShellCommand("git branch --show-current")).trim();
  }

  private static async runShellCommand(
    commandAndArguments: string
  ): Promise<string> {
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
