/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.g2a.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
