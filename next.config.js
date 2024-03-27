/* CONTENT LAYER */
const { withContentlayer } = require("next-contentlayer"); 

/* ENV */
/* import("./src/env/client.mjs");
import("./src/env/server.mjs"); */

/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "**.cloudfront.net"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      }
     ]
  },
};


module.exports = withContentlayer(nextConfig);