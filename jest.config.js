module.exports = {
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    testMatch: [
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    moduleDirectories: ["node_modules", "lib"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}','!<rootDir>/node_modules/'],
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