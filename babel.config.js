module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          'root': ['./App'],
          'alias': {
            'assets': './assets',
            'test': './test',
            'translations': './assets/translations',
          }
        },
      ],
    ],
  };
};
