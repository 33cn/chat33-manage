module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/manage': {
        target: 'http://mydomain',
        pathRewrite: {
          '^/manage': '/',
        },
      },
    },
  },
};
