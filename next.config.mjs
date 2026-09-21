/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No ESLint config ships with this repo; linting is not part of the deploy gate.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
