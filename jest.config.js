module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.ts'],
  // transform: {
  //   '^.+.tsx?$': 'ts-jest',
  // },

  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Correct regex for transforming TypeScript files
  },
  moduleNameMapper: {
    'configs/(.*)': '<rootDir>/src/configs/$1',
    'utils/(.*)': '<rootDir>/src/utils/$1',
    'core/(.*)': '<rootDir>/src/core/$1',
    'modules/(.*)': '<rootDir>/src/modules/$1',
    'middlewares/(.*)': '<rootDir>/src/middlewares/$1',
  },
};
