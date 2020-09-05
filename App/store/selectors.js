export default {
  theme: (state) => state.theme || 'light',
  language: (state) => state.language || 'traditional',
  fontSize: (state) => state.fontSize,
  showDropdown: (state) => state.showDropdown || false,
  currentScripture: (state) => state.currentScripture || { testament: 'old', book: 0, chapter: 0 },
  storeRehydrated: (state) => state.storeRehydrated || false,
};
