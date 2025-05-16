/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/jsx-runtime.js': new URL('react/jsx-runtime', import.meta.url).pathname,
    };
    return config;
  }
};

export default nextConfig;