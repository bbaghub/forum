/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        // Add appropriate server actions configuration here
        allowedOrigins: ["*"], // Example property
      },
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.clerk.com",
        },
        {
          protocol: "https",
          hostname: "images.clerk.dev",
        },
        {
          protocol: "https",
          hostname: "uploadthing.com",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
        },
      ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  export default nextConfig;