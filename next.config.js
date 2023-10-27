/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (dev) {
      config.watchOptions = {
        followSymlinks: true,
      };

      config.snapshot.managedPaths = [];
    }

    config.module.rules.push({
      test: /\.rivet-project$/,
      type: 'asset/source',
    });

    config.module.rules.push({
      test: /\.rivet-data$/,
      type: 'asset/source',
    });

    return config;
  },
};
