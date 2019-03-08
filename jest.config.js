module.exports = {
  moduleFileExtensions: ["js", "json", "node", "ts"],
  roots: ["<rootDir>/src"],
  testRegex: "\\.local-test\\.ts$",
  transform: {
    "\\.ts$": "ts-jest"
  }
}
