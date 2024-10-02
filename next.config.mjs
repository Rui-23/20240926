/** @type {import('next').NextConfig} */

const nextConfig = {
  // webpack: (config) => {
  //   config.resolve.alias.canvas = false;
  //     return config;
  //   },
  experimental: {
    // You may not need this, it's just to support moduleResolution: 'node16'
    extensionAlias: {
      '.js': ['.tsx', '.ts', '.jsx', '.js'],
    },
    turbo: {
      resolveAlias: {
        // Turbopack does not support standard ESM import paths yet
        './Sample.js': './app/Sample.tsx',
        canvas: './empty-module.ts',
      },
    },
  },
  swcMinify: false,
};

export default nextConfig;

