module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "node",
  testRegex: "\\.(test|e2e-test)\\.ts$"
};
