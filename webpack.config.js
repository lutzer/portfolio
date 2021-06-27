const path = require('path');
module.exports = {
  entry: './site/_scripts/index.js',
  output: {
    path: path.resolve(__dirname, './site/assets'),
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'Bundle'
  }
};