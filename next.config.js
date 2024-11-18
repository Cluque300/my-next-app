const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.plugins.push(
        new BrowserSyncPlugin(
          {
            host: '26.219.101.55', // Aceptar conexiones de cualquier IP
            port: 3003, // Puerto para BrowserSync (diferente al puerto de Next.js)
            proxy: 'http://localhost:3000', // Proxear el servidor de Next.js
            open: false, // No abrir automáticamente el navegador
          },
          {
            reload: false, // No recargar Webpack
          }
        )
      );
    }
    return config;
  },
};