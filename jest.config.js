module.exports = {
  bail: true,
  clearMocks: true,
  coverageDirectory: "__tests__/coverage",
  collectCoverageFrom: ["src/**"],
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.test.js?(x)"
  ],
  preset: "jest-expo"
}
