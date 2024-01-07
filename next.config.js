const { resolve } = require('path');
/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = resolve(process.cwd(), './src');
    return config;
  },
};

module.exports = nextConfig;
