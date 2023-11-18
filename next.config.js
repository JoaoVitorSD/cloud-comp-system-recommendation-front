/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = {
  ...nextConfig,
  env:{
    API_URL: process.env.API_URL
  }
}
