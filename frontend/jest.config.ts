export default {
  testEnvironment: 'jsdom',
  preset: 'ts-jest/presets/js-with-ts',
  moduleNameMapper: {
    '\\.(mov|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/__mocks__/fileMock.ts',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.ts',
  },
  coveragePathIgnorePatterns: [
    'src/apps/Dipstik',
    'src/apps/ParalysisAnalysis',
    'src/apps/SkinScan',
    'src/apps/TonsillitisDetector',
  ],
};
