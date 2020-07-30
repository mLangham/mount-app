module.exports = {
  productionSourceMap: false,
  pwa: {
    workboxOptions: {
      skipWaiting: true
    },
    name: "MountLocks"
  },
  transpileDependencies: ["vuetify"]
};
