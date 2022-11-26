// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  rootDir: "src",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/**/*.{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: ["<rootDir>/pages/_app.tsx", "<rootDir>/tests/*", "<rootDir>/mocks/*"],
  coverageDirectory: "../coverage",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: ["node_modules/(?!(react-kakao-maps-sdk)/)"],
});
