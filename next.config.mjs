/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      {
        source: "/work/1-Nextsight-inspection-system",
        destination: "/work/nextsight",
        permanent: true,
      },
      {
        source: "/work/2-CCTV-ReID-system",
        destination: "/work/multi-camera-reid",
        permanent: true,
      },
      {
        source: "/work/3-Crystalsound-noise-cancellation",
        destination: "/work/crystalsound",
        permanent: true,
      },
      { source: "/gallery", destination: "/#playground", permanent: true },
      { source: "/blog/:path*", destination: "/#playground", permanent: true },
    ];
  },
};
export default nextConfig;
