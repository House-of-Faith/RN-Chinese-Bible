export default {
  theme: (state) => state.theme || 'light',
  language: (state) => state.language || 'english',
  currentScripture: (state) => state.currentScripture || { testament: 'old', book: 0, chapter: 0 },
  storeRehydrated: (state) => state.storeRehydrated || false,
}