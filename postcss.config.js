/**
 * @file postcss config
 * @author atom-yang
 */

module.exports = {
  plugins: {
    cssnano: {},
    'postcss-preset-env': {},
    'postcss-px-to-viewport': {
      viewportWidth:'414',
      exclude: [
        /node_modules/,
        /src\/pages\/Repairing/,
        /src\/components\/CopyRight/
      ]
    }
  }
};
