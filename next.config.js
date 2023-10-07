/** @type {import('next').NextConfig} */


const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
        serverActions: true,
    },
    // Enable Cross
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin", // "same-origin-allow-popups"
                    },
                ],
            },
        ];
    },
};
module.exports = nextConfig;
