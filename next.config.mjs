/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages typically serves from a repo name subdirectory
  // If your repo is named "ghibli-image-transformer", uncomment the following:
  // basePath: '/ghibli-image-transformer',
  // assetPrefix: '/ghibli-image-transformer',
  trailingSlash: true,
};

export default nextConfig;

