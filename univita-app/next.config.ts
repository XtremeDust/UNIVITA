 import type { NextConfig } from "next";

const nextConfig: NextConfig = { //
  /* config options here */
  reactStrictMode:true,
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'res.cloudinary.com',
        port:'',
        pathname:'dnfvfft3w'
      },
    ],
  },
};

//module.exports = nextConfig;

export default nextConfig;
