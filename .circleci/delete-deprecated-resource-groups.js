const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function executeCommand(command) {
  const result = await exec(command);
  return result.stdout;
}

async function run() {
  console.info(await executeCommand("git ls-remote --heads --refs"));
  console.info(await executeCommand("az group list"));
}

run();
