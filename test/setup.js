jest.mock('@react-native-community/async-storage', () => {
  return {};
});

jest.mock('@bugsnag/expo', () => ({
  start: jest.fn(),
  leaveBreadcrumb: jest.fn(),
  setUser: jest.fn(),
  notify: jest.fn(),
}));