module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.ts'],
  transform: {
    '^.+.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    'configs/(.*)': '<rootDir>/src/configs/$1',
  },
};
