    module.exports = {
        pwa: {
          name: 'MyApp',
          short_name:'MyApp',
          themeColor: '#4DBA87',
          msTileColor: '#000000',
          appleMobileWebAppCapable: 'yes',
          appleMobileWebAppStatusBarStyle: 'black',
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'service-worker.js',
            // ...other Workbox options...
          }
        }
      };