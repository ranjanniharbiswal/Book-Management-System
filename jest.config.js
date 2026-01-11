require('dotenv').config();

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        esModuleInterop: true,
      }
    }]
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',
    '!src/**/*.d.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
  testTimeout: 10000,
  setupFiles: ['<rootDir>/tests/setup.ts'],
};