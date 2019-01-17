module.exports = {
  moduleNameMapper: {
    '\\.(css|jpg|png)$': '<rootDir>/__tests__/empty-module.js',
  },
  verbose: true,
  setupTestFrameworkScriptFile: '<rootDir>__tests__/setup/setupEnzyme.js',
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/setup/',
  ],
};
