baseConfig = require("./jest.config")

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ["<rootDir>/jest.azure-setup.js"],
  testRegex: "\\.azure-test\\.ts$"
}
