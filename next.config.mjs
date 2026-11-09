const nextConfig = {
    cacheComponents: true,
    partialPrefetching: true,
    poweredByHeader: false,
    images: {
        formats: ["image/avif", "image/webp"],
    },
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
};
export default nextConfig;
