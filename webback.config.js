// webpack.config.js
module.exports = {
    // other webpack configuration options
    resolve: {
      fallback: {
        "buffer": require.resolve("buffer/")
      }
    }
  };
  