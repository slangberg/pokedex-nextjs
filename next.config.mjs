/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/**",
      },
    ],
  },
  // Pokémon pages used to live under /pokedex. Keep old links and bookmarks
  // working by permanently redirecting them to the new root-level routes.
  async redirects() {
    return [
      { source: "/pokedex", destination: "/", permanent: true },
      { source: "/pokedex/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
