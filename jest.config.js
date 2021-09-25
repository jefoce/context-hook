module.exports = {
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  }