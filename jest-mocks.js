// window = typeof window !== 'undefined' ? window : {};

// Mocking scrollTo method, which is not implemented in jsdom
Object.defineProperty(window, 'scrollTo', {
  value: () => undefined,
});

// Mocking createObjectURL method, which is not implemented in jsdom
Object.defineProperty(window, 'URL', {
  value: {
    createObjectURL: () => undefined,
  },
});

// Mocking location.reload method, to prevent reload
// location = typeof location !== 'undefined' ? location : {};
Object.defineProperty(location, 'reload', {
  value: () => undefined,
});
