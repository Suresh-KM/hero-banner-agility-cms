/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "standalone", //this is only for next.js on Azure Static Web Apps...
  reactStrictMode: true,
  // swcMinify: true, //deprecated
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.aglty.io",
      },
      {
        protocol: "https",
        hostname: "*.agilitycms.com",
      },
    ],
  },
};

module.exports = nextConfig;
