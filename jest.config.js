module.exports = {
  bail: true,
  clearMocks: true,
  coverageDirectory: "__tests__/coverage",
  collectCoverageFrom: ["src/**"],
  coverageProvider: "v8",
  testEnvironment: "node",
  // testMatch: [
  //   "**/__tests__/**/*.test.js?(x)"
  // ],
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)"
  ]
}
