module.exports = {
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    moduleDirectories: ["node_modules", "lib"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverageFrom: ['app/react/**/*.{ts,tsx}', '!app/react/__tests__/api/api-test-helpers.ts'],
    coverageDirectory: "./coverage",
    coverageReporters: ["json", "html", "text"],
    testEnvironment: 'node',
    notify: true,
    verbose: true,
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig.json",
      }
    },
    preset: 'ts-jest',
  };